'use client';

import React, { useState, useEffect } from 'react';
import { trackEvent, trackConversion } from './GoogleAnalytics';

export default function CountlyTest() {
  const [isCountlyLoaded, setIsCountlyLoaded] = useState(false);
  const [testResults, setTestResults] = useState<string[]>([]);
  const [usingDemo, setUsingDemo] = useState(false);

  useEffect(() => {
    // Check if Countly is loaded
    const checkCountly = () => {
      if (typeof window !== 'undefined' && window.Countly) {
        setIsCountlyLoaded(true);
        setTestResults(prev => [...prev, '✅ Countly SDK loaded successfully']);
      } else {
        setIsCountlyLoaded(false);
        setTestResults(prev => [...prev, '❌ Countly SDK not loaded']);
      }
    };

    // Check immediately and after a delay
    checkCountly();
    const timer = setTimeout(checkCountly, 3000);

    return () => clearTimeout(timer);
  }, []);

  const enableDemoMode = () => {
    // Temporarily set demo credentials for testing
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('countly_demo_mode', 'true');
      setUsingDemo(true);
      setTestResults(prev => [...prev, '🎭 Demo mode enabled - refresh page to load Countly']);

      // Force reload to trigger Countly loading with demo credentials
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

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
          <div>Server URL: {process.env.NEXT_PUBLIC_COUNTLY_SERVER_URL || 'Using default: https://us-try.count.ly'}</div>
          <div>Convert Project ID: {process.env.NEXT_PUBLIC_CONVERT_PROJECT_ID ? '✅ Set' : '❌ Not set'}</div>
        </div>
        {!process.env.NEXT_PUBLIC_COUNTLY_APP_KEY && (
          <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-yellow-800 text-sm">
              <strong>⚠️ Action Required:</strong> Add <code>NEXT_PUBLIC_COUNTLY_APP_KEY</code> to Vercel environment variables to enable Countly analytics.
            </p>
          </div>
        )}
      </div>

      <div className="mb-4">
        <h3 className="font-medium mb-2">Test Actions:</h3>
        <div className="flex gap-2 mb-4 flex-wrap">
          <button
            onClick={testEvent}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            disabled={!isCountlyLoaded}
          >
            Send Test Event
          </button>
          <button
            onClick={testConversion}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            disabled={!isCountlyLoaded}
          >
            Send Test Conversion
          </button>
          {!process.env.NEXT_PUBLIC_COUNTLY_APP_KEY && !usingDemo && (
            <button
              onClick={enableDemoMode}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
            >
              Enable Demo Mode
            </button>
          )}
        </div>
        {usingDemo && (
          <div className="text-sm text-purple-600 mb-2">
            🎭 Demo mode active - using test Countly instance
          </div>
        )}
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