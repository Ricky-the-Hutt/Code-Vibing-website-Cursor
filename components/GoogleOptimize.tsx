'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      config?: Record<string, any>
    ) => void;
    google_optimize?: {
      get: (experimentId: string) => string | undefined;
    };
  }
}

export default function GoogleOptimize() {
  const router = useRouter();
  const GOOGLE_OPTIMIZE_ID = process.env.NEXT_PUBLIC_GOOGLE_OPTIMIZE_ID;

  useEffect(() => {
    if (!GOOGLE_OPTIMIZE_ID) return;

    // Load Google Optimize
    const script = document.createElement('script');
    script.src = `https://www.googleoptimize.com/optimize.js?id=${GOOGLE_OPTIMIZE_ID}`;
    script.async = true;
    document.head.appendChild(script);

    // Track page views for experiments
    const handleRouteChange = () => {
      if (window.gtag) {
        window.gtag('event', 'optimize.page_change');
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events, GOOGLE_OPTIMIZE_ID]);

  if (!GOOGLE_OPTIMIZE_ID) {
    return null;
  }

  return null;
}

// Utility function to get variant for A/B testing
export function getOptimizeVariant(experimentId: string): string | null {
  if (typeof window !== 'undefined' && window.google_optimize) {
    return window.google_optimize.get(experimentId) || null;
  }
  return null;
}