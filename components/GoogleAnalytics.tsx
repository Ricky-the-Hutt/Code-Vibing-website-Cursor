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

    // Load Countly SDK from the server
    const script = document.createElement('script');
    script.src = `${COUNTLY_SERVER_URL}/sdk/web/countly.min.js`;
    script.async = true;
    script.onload = () => {
      if (typeof window.Countly !== 'undefined') {
        window.Countly.init({
          app_key: COUNTLY_APP_KEY,
          url: COUNTLY_SERVER_URL,
          debug: process.env.NODE_ENV === 'development'
        });

        // Track initial page view
        window.Countly.track_pageview();

        // Track sessions
        window.Countly.track_sessions();
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
