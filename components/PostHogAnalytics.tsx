'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import posthog from 'posthog-js';

export default function PostHogAnalytics() {
  const router = useRouter();
  const [consentGiven, setConsentGiven] = useState(false);
  const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com';

  useEffect(() => {
    const checkConsent = () => {
      const consent = localStorage.getItem('cookie-consent');
      setConsentGiven(consent === 'true');
    };

    checkConsent();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'cookie-consent') {
        checkConsent();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('cookie_consent_updated', checkConsent);

    // Also check periodically in case consent is given in the same tab
    const interval = setInterval(checkConsent, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cookie_consent_updated', checkConsent);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (!POSTHOG_KEY) {
      console.log('PostHog Analytics: Missing POSTHOG_KEY');
      return;
    }
    if (!consentGiven) {
      console.log('PostHog Analytics: Consent not given yet');
      return;
    }

    if (typeof window !== 'undefined') {
      posthog.init(POSTHOG_KEY, {
        api_host: POSTHOG_HOST,
        capture_pageview: false, // We'll handle this manually on route changes
        persistence: 'localStorage',
        autocapture: true,
        // Disable features that require config.js to prevent Safari MIME errors
        disable_session_recording: true,
        disable_surveys: true,
        advanced_disable_decide: true,
        advanced_disable_feature_flags: true,
        loaded: (ph) => {
          if (process.env.NODE_ENV === 'development') console.log('PostHog loaded:', ph);
        },
      });

      if (process.env.NODE_ENV === 'development') {
        console.log('Initializing PostHog with:', { POSTHOG_KEY, POSTHOG_HOST });
      }

      // Track initial page view
      posthog.capture('$pageview');

      const handleRouteChange = () => {
        posthog.capture('$pageview');
      };

      router.events.on('routeChangeComplete', handleRouteChange);

      return () => {
        router.events.off('routeChangeComplete', handleRouteChange);
      };
    }
  }, [consentGiven, POSTHOG_KEY, POSTHOG_HOST, router.events]);

  return null;
}

// Utility functions for custom tracking
export const trackPostHogEvent = (event: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined' && posthog.__loaded) {
    posthog.capture(event, properties);
  }
};

export const setPostHogUserProperty = (key: string, value: any) => {
  if (typeof window !== 'undefined' && posthog.__loaded) {
    if (typeof posthog.setPersonProperties === 'function') {
      posthog.setPersonProperties({ [key]: value });
    } else if (typeof (posthog as any).people?.set === 'function') {
      (posthog as any).people.set({ [key]: value });
    }
  }
};
