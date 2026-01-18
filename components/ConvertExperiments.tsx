'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

declare global {
  interface Window {
    convert?: {
      experiments?: Record<string, any>;
    };
  }
}

export default function ConvertExperiments() {
  const router = useRouter();
  const CONVERT_PROJECT_ID = process.env.NEXT_PUBLIC_CONVERT_PROJECT_ID;

  useEffect(() => {
    if (!CONVERT_PROJECT_ID) return;

    // Load Convert.com tracking script
    const script = document.createElement('script');
    script.src = `//cdn-3.convertexperiments.com/js/${CONVERT_PROJECT_ID}.js`;
    script.async = true;
    document.head.appendChild(script);

    // Track page views for experiments
    const handleRouteChange = () => {
      if (typeof window !== 'undefined' && window.convert) {
        // Convert.com automatically handles page tracking
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events, CONVERT_PROJECT_ID]);

  if (!CONVERT_PROJECT_ID) {
    return null;
  }

  return null;
}

// Utility function to get variant for A/B testing
export function getConvertVariant(experimentId: string): string | null {
  if (typeof window !== 'undefined' && window.convert?.experiments) {
    const experiment = window.convert.experiments[experimentId];
    return experiment?.variation || null;
  }
  return null;
}