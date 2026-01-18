'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

declare global {
  interface Window {
    Countly?: any;
  }
}

export default function CountlyAnalytics() {
  const router = useRouter();
  const COUNTLY_APP_KEY = process.env.NEXT_PUBLIC_COUNTLY_APP_KEY;
  const COUNTLY_SERVER_URL = process.env.NEXT_PUBLIC_COUNTLY_SERVER_URL || 'https://us-try.count.ly';

  useEffect(() => {
    if (!COUNTLY_APP_KEY) return;

    // Load Countly SDK - try multiple sources
    const loadCountlySDK = () => {
      // First try the official Countly CDN
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/countly-sdk-web@latest/lib/countly.min.js';
      script.async = true;

      script.onload = () => {
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

            console.log('Countly initialized successfully');
          } catch (error) {
            console.error('Countly initialization error:', error);
          }
        } else {
          console.warn('Countly object not available after script load');
        }
      };

      script.onerror = () => {
        console.error('Failed to load Countly SDK from CDN');
      };

      document.head.appendChild(script);
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
  }, [router.events, COUNTLY_APP_KEY, COUNTLY_SERVER_URL]);

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
