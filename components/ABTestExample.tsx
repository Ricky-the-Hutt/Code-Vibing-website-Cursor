'use client';

import React, { useState, useEffect } from 'react';
import { getConvertVariant } from './ConvertExperiments';

// Example A/B test component for different button colors using Convert.com
export default function ABTestButton() {
  const [variant, setVariant] = useState<'control' | 'variant-a' | 'variant-b'>('control');

  useEffect(() => {
    // Get variant from Convert.com experiment
    const experimentId = '100000000'; // Replace with your actual experiment ID from Convert.com
    const convertVariant = getConvertVariant(experimentId);

    if (convertVariant === '100000001') { // Control variation
      setVariant('control');
    } else if (convertVariant === '100000002') { // Variant A
      setVariant('variant-a');
    } else if (convertVariant === '100000003') { // Variant B
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
        // Track conversion in Convert.com (automatic) and Countly
        if (typeof window !== 'undefined' && window.Countly) {
          window.Countly.add_event({
            key: 'button_click',
            segmentation: {
              variant: variant,
              experiment: 'button_color_test'
            }
          });
        }
      }}
    >
      Test Button (Variant: {variant})
    </button>
  );
}