import { trackEvent as trackCountlyEvent, trackConversion as trackCountlyConversion } from '@/components/CountlyAnalytics';
import { trackPostHogEvent, setPostHogUserProperty } from '@/components/PostHogAnalytics';

/**
 * Track a general event in both Countly and PostHog.
 */
export const trackEvent = (name: string, properties?: Record<string, any>) => {
    // Track in Countly
    trackCountlyEvent(name, properties);

    // Track in PostHog
    trackPostHogEvent(name, properties);

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
        console.log(`[Analytics] Tracked: ${name}`, properties);
    }
};

/**
 * Track a conversion event (often with a numerical value).
 */
export const trackConversion = (name: string, value?: number) => {
    // Countly specific conversion tracking
    trackCountlyConversion(name, value);

    // PostHog uses generic capture for conversions, often with a 'value' property
    trackPostHogEvent(name, { value });

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
        console.log(`[Analytics] Conversion: ${name}, value: ${value}`);
    }
};

/**
 * Set user properties for permanent segmentation.
 */
export const setUserProperty = (key: string, value: any) => {
    // Countly
    if (typeof window !== 'undefined' && window.Countly && window.Countly.userData) {
        window.Countly.userData.set(key, value);
        window.Countly.userData.save();
    }

    // PostHog
    setPostHogUserProperty(key, value);
};
