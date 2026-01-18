'use client';

import React, { useState, useEffect } from 'react';
import { trackEvent, trackConversion } from './GoogleAnalytics';

export default function CountlyTest() {
  const [isCountlyLoaded, setIsCountlyLoaded] = useState(false);
  const [testResults, setTestResults] = useState<string[]>([]);

  useEffect(() => {
    // Check if Countly is loaded
    const checkCountly = () => {
      if (typeof window !== 'undefined' && typeof window.Countly !== 'undefined') {
        setIsCountlyLoaded(true);
        setTestResults(prev => [...prev, '✅ Countly SDK loaded successfully']);
      } else {
        setIsCountlyLoaded(false);
        setTestResults(prev => [...prev, '❌ Countly SDK not loaded']);
      }
    };

    // Check immediately and after delays
    checkCountly();
    const timer1 = setTimeout(checkCountly, 2000);
    const timer2 = setTimeout(checkCountly, 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const testEvent = () => {
    trackEvent('test_event', {
      test_type: 'countly_integration',
      timestamp: new Date().toISOString()
    });
    setTestResults(prev => [...prev, '📤 Test event sent']);
  };

  const testConversion = () => {
    trackConversion('test_conversion', 1);
    setTestResults(prev => [...prev, '🎯 Test conversion sent']);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 border border-gray-300 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Countly Analytics Test</h2>

      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <div className={`w-3 h-3 rounded-full ${isCountlyLoaded ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className="font-medium">
            Status: {isCountlyLoaded ? 'Connected' : 'Not Connected'}
          </span>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-medium mb-2">Environment Variables:</h3>
        <div className="text-sm text-gray-600 space-y-1">
          <div>App Key: {process.env.NEXT_PUBLIC_COUNTLY_APP_KEY ? '✅ Set' : '❌ Not set'}</div>
          <div>Server URL: {process.env.NEXT_PUBLIC_COUNTLY_SERVER_URL || 'Using default'}</div>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-medium mb-2">Test Actions:</h3>
        <div className="flex gap-2 mb-4">
          <button
            onClick={testEvent}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Send Test Event
          </button>
          <button
            onClick={testConversion}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Send Test Conversion
          </button>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">Test Results:</h3>
        <div className="bg-gray-50 p-4 rounded text-sm font-mono max-h-40 overflow-y-auto">
          {testResults.length === 0 ? (
            <div className="text-gray-500">No tests run yet...</div>
          ) : (
            testResults.map((result, index) => (
              <div key={index} className="mb-1">{result}</div>
            ))
          )}
        </div>
      </div>

      <div className="mt-4 text-xs text-gray-500">
        <p>💡 <strong>How to test:</strong></p>
        <ol className="list-decimal list-inside mt-1 space-y-1">
          <li>Add your real Countly credentials to Vercel environment variables</li>
          <li>Click test buttons to send events</li>
          <li>Check your Countly dashboard for real-time data</li>
          <li>Status should show "Connected" when working</li>
        </ol>
      </div>
    </div>
  );
}