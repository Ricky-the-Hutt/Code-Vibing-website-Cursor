'use client';

import React, { useEffect, useState } from 'react';
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
  const [consentGiven, setConsentGiven] = useState(false);
  const CONVERT_PROJECT_ID = process.env.NEXT_PUBLIC_CONVERT_PROJECT_ID;

  // Check for cookie consent
  useEffect(() => {
    const checkConsent = () => {
      const consent = localStorage.getItem('cookie-consent');
      setConsentGiven(consent === 'true');
    };

    checkConsent();

    // Listen for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'cookie-consent') {
        checkConsent();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Check periodically
    const interval = setInterval(checkConsent, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    // Only load Convert.com if consent is given and we have project ID
    if (!consentGiven || !CONVERT_PROJECT_ID) return;

    console.log('Loading Convert.com experiments with user consent...');

    // Load Convert.com tracking script
    const script = document.createElement('script');
    script.src = `//cdn-3.convertexperiments.com/js/${CONVERT_PROJECT_ID}.js`;
    script.async = true;

    script.onload = () => {
      console.log('Convert.com experiments loaded successfully');
    };

    script.onerror = () => {
      console.error('Failed to load Convert.com experiments');
    };

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
  }, [router.events, CONVERT_PROJECT_ID, consentGiven]);

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