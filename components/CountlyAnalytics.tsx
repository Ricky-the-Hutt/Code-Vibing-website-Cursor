'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

declare global {
  interface Window {
    Countly?: any;
  }
}

export default function CountlyAnalytics() {
  const router = useRouter();
  const [consentGiven, setConsentGiven] = useState(false);
  const COUNTLY_APP_KEY = process.env.NEXT_PUBLIC_COUNTLY_APP_KEY;
  const COUNTLY_SERVER_URL = process.env.NEXT_PUBLIC_COUNTLY_SERVER_URL || 'https://us-try.count.ly';

  // Check for cookie consent
  useEffect(() => {
    const checkConsent = () => {
      const consent = localStorage.getItem('cookie-consent');
      setConsentGiven(consent === 'true');
    };

    // Check immediately
    checkConsent();

    // Listen for storage changes (in case consent is given in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'cookie-consent') {
        checkConsent();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Also check periodically in case consent is given in the same tab
    const interval = setInterval(checkConsent, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    // Only load Countly if consent is given and we have the required config
    if (!consentGiven || !COUNTLY_APP_KEY) return;

    // Load Countly SDK - try direct from Countly server
    const loadCountlySDK = () => {
      console.log('Loading Countly SDK with user consent...');

      // Try loading from the Countly server first
      const script = document.createElement('script');
      script.src = `${COUNTLY_SERVER_URL}/sdk/web/countly.min.js`;
      script.async = true;

      script.onload = () => {
        console.log('Countly script loaded, initializing...');

        if (typeof window.Countly !== 'undefined') {
          try {
            window.Countly.init({
              app_key: COUNTLY_APP_KEY,
              url: COUNTLY_SERVER_URL,
              debug: process.env.NODE_ENV === 'development',
              app_version: '1.0.0'
            });

            // Track initial page view
            window.Countly.track_pageview();

            // Track sessions
            window.Countly.track_sessions();

            console.log('Countly initialized successfully with consent');
          } catch (error) {
            console.error('Countly initialization error:', error);
          }
        } else {
          console.warn('Countly object not available after script load');
          // Try fallback CDN
          loadFallbackSDK();
        }
      };

      script.onerror = () => {
        console.error('Failed to load Countly SDK from server, trying fallback...');
        loadFallbackSDK();
      };

      document.head.appendChild(script);
    };

    const loadFallbackSDK = () => {
      console.log('Loading fallback Countly SDK from CDN...');

      const fallbackScript = document.createElement('script');
      fallbackScript.src = 'https://cdn.jsdelivr.net/npm/countly-sdk-web@latest/lib/countly.min.js';
      fallbackScript.async = true;

      fallbackScript.onload = () => {
        console.log('Fallback script loaded, initializing Countly...');
        if (typeof window.Countly !== 'undefined') {
          try {
            window.Countly.init({
              app_key: COUNTLY_APP_KEY,
              url: COUNTLY_SERVER_URL,
              debug: process.env.NODE_ENV === 'development'
            });
            console.log('Countly fallback initialization successful');
          } catch (error) {
            console.error('Countly fallback initialization failed:', error);
          }
        }
      };

      fallbackScript.onerror = () => {
        console.error('Countly fallback SDK also failed to load');
      };

      document.head.appendChild(fallbackScript);
    };

    loadCountlySDK();

    // Track page views on route change
    const handleRouteChange = (url: string) => {
      if (window.Countly) {
        window.Countly.track_pageview(url);
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [consentGiven, router.events, COUNTLY_APP_KEY, COUNTLY_SERVER_URL]);

  if (!COUNTLY_APP_KEY) {
    return null;
  }

  return null;
}

// Utility functions for custom tracking
export const trackEvent = (key: string, segmentation?: Record<string, any>) => {
  if (typeof window !== 'undefined' && typeof window.Countly !== 'undefined') {
    window.Countly.add_event({
      key,
      segmentation
    });
  }
};

export const trackConversion = (key: string, value?: number) => {
  if (typeof window !== 'undefined' && typeof window.Countly !== 'undefined') {
    window.Countly.add_event({
      key,
      count: value || 1
    });
  }
};
