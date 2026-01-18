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

  // Check for demo mode
  const isDemoMode = typeof window !== 'undefined' && window.localStorage?.getItem('countly_demo_mode') === 'true';
  const effectiveAppKey = COUNTLY_APP_KEY || (isDemoMode ? 'demo-app-key' : null);
  const effectiveServerUrl = COUNTLY_SERVER_URL || (isDemoMode ? 'https://us-try.count.ly' : null);

  useEffect(() => {
    if (!effectiveAppKey) return;

    // Load Countly SDK
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/countly-sdk-web@latest/lib/countly.min.js';
    script.async = true;
    script.onerror = () => {
      console.warn('Failed to load Countly SDK');
    };
    script.onload = () => {
      if (window.Countly) {
        window.Countly.init({
          app_key: effectiveAppKey,
          url: effectiveServerUrl,
          debug: process.env.NODE_ENV === 'development' || isDemoMode
        });

        // Track initial page view
        window.Countly.track_pageview();

        // Track sessions
        window.Countly.track_sessions();

        if (isDemoMode) {
          console.log('Countly Demo Mode: Analytics initialized');
        }
      }
    };
    document.head.appendChild(script);

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
  }, [router.events, effectiveAppKey, effectiveServerUrl, isDemoMode]);

  if (!effectiveAppKey) {
    return null;
  }

  return null;
}

// Utility functions for custom tracking
export const trackEvent = (key: string, segmentation?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.Countly) {
    window.Countly.add_event({
      key,
      segmentation
    });
  }
};

export const trackConversion = (key: string, value?: number) => {
  if (typeof window !== 'undefined' && window.Countly) {
    window.Countly.add_event({
      key,
      count: value || 1
    });
  }
};
