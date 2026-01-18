'use client';

import React, { useState, useEffect } from 'react';
import { getOptimizeVariant } from './GoogleOptimize';

// Example A/B test component for different button colors
export default function ABTestButton() {
  const [variant, setVariant] = useState<'control' | 'variant-a' | 'variant-b'>('control');

  useEffect(() => {
    // Get variant from Google Optimize
    const experimentId = 'your-experiment-id'; // Replace with actual experiment ID
    const optimizeVariant = getOptimizeVariant(experimentId);

    if (optimizeVariant === '0') {
      setVariant('control');
    } else if (optimizeVariant === '1') {
      setVariant('variant-a');
    } else if (optimizeVariant === '2') {
      setVariant('variant-b');
    }
  }, []);

  const buttonStyles = {
    control: 'bg-blue-500 hover:bg-blue-600',
    'variant-a': 'bg-green-500 hover:bg-green-600',
    'variant-b': 'bg-red-500 hover:bg-red-600',
  };

  return (
    <button
      className={`px-6 py-3 text-white font-semibold rounded-lg transition-colors ${buttonStyles[variant]}`}
      onClick={() => {
        // Track conversion in Google Analytics
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'button_click', {
            event_category: 'engagement',
            event_label: variant,
          });
        }
      }}
    >
      Test Button (Variant: {variant})
    </button>
  );
}