'use client';

import { useState, useEffect } from 'react';
import { trackEvent } from './CountlyAnalytics';

/**
 * A custom hook for manual A/B testing.
 * @param experimentId A unique ID for the experiment (e.g., 'hero_design_2024')
 * @param variants An array of variant names (e.g., ['control', 'variant_a', 'variant_b'])
 * @returns The assigned variant for the current user
 */
export function useABTest(experimentId: string, variants: string[]): string {
  const [variant, setVariant] = useState<string>('');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const storageKey = `ab_test_${experimentId}`;
    let assignedVariant = localStorage.getItem(storageKey);

    // If no variant assigned yet, pick one at random
    if (!assignedVariant || !variants.includes(assignedVariant)) {
      const randomIndex = Math.floor(Math.random() * variants.length);
      assignedVariant = variants[randomIndex];
      localStorage.setItem(storageKey, assignedVariant);
    }

    setVariant(assignedVariant);

    // Track the variant assignment in Countly
    // We send it as a user property so we can filter any event by this experiment variant
    if (window.Countly) {
      console.log(`[AB Test] Experiment "${experimentId}" assigned variant: ${assignedVariant}`);
      
      try {
        // Set as user property for long-term segmentation
        window.Countly.userData.set(`exp_${experimentId}`, assignedVariant);
        window.Countly.userData.save();

        // Also track as a one-time event for immediate conversion funnel analysis
        trackEvent('experiment_assignment', {
          experiment_id: experimentId,
          variant: assignedVariant
        });
      } catch (error) {
        console.error('Error tracking experiment in Countly:', error);
      }
    }
  }, [experimentId, variants]);

  return variant;
}
