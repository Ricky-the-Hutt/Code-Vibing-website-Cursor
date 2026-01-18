'use client';

import React, { useState, useEffect } from 'react';
import { trackEvent, trackConversion } from './GoogleAnalytics';

export default function CountlyTest() {
  const [isCountlyLoaded, setIsCountlyLoaded] = useState(false);
  const [testResults, setTestResults] = useState<string[]>([]);

  useEffect(() => {
    let checkCount = 0;

    // Check if Countly is loaded
    const checkCountly = () => {
      checkCount++;
      const isLoaded = typeof window !== 'undefined' &&
                      typeof window.Countly !== 'undefined' &&
                      window.Countly &&
                      typeof window.Countly.add_event === 'function';

      if (isLoaded) {
        setIsCountlyLoaded(true);
        setTestResults(prev => [...prev, `✅ Countly SDK loaded successfully (attempt ${checkCount})`]);
        setTestResults(prev => [...prev, `ℹ️ Server URL: ${process.env.NEXT_PUBLIC_COUNTLY_SERVER_URL}`]);
        setTestResults(prev => [...prev, `ℹ️ App Key: ${process.env.NEXT_PUBLIC_COUNTLY_APP_KEY ? 'Set' : 'Not set'}`]);
      } else {
        setIsCountlyLoaded(false);
        setTestResults(prev => [...prev, `❌ Countly SDK not loaded (attempt ${checkCount})`]);
        setTestResults(prev => [...prev, `🔍 Checking window.Countly: ${typeof window.Countly}`]);
        setTestResults(prev => [...prev, `🔍 Checking add_event: ${typeof window.Countly?.add_event}`]);
      }
    };

    // Check multiple times with increasing delays
    checkCountly();
    const timers = [
      setTimeout(checkCountly, 1000),
      setTimeout(checkCountly, 3000),
      setTimeout(checkCountly, 6000),
      setTimeout(checkCountly, 10000)
    ];

    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  const testEvent = () => {
    try {
      trackEvent('test_event', {
        test_type: 'countly_integration',
        timestamp: new Date().toISOString(),
        page: window.location.pathname
      });
      setTestResults(prev => [...prev, '📤 Test event sent']);
    } catch (error) {
      setTestResults(prev => [...prev, `❌ Event error: ${error instanceof Error ? error.message : 'Unknown error'}`]);
    }
  };

  const testConversion = () => {
    try {
      trackConversion('test_conversion', 1);
      setTestResults(prev => [...prev, '🎯 Test conversion sent']);
    } catch (error) {
      setTestResults(prev => [...prev, `❌ Conversion error: ${error instanceof Error ? error.message : 'Unknown error'}`]);
    }
  };

  const manualInit = () => {
    try {
      if (typeof window.Countly !== 'undefined') {
        const appKey = process.env.NEXT_PUBLIC_COUNTLY_APP_KEY;
        const serverUrl = process.env.NEXT_PUBLIC_COUNTLY_SERVER_URL;

        window.Countly.init({
          app_key: appKey,
          url: serverUrl,
          debug: true
        });

        setTestResults(prev => [...prev, '🔧 Manual initialization attempted']);
        setTimeout(() => {
          if (window.Countly && typeof window.Countly.add_event === 'function') {
            setTestResults(prev => [...prev, '✅ Manual initialization successful']);
            setIsCountlyLoaded(true);
          } else {
            setTestResults(prev => [...prev, '❌ Manual initialization failed']);
          }
        }, 1000);
      } else {
        setTestResults(prev => [...prev, '❌ Countly object not available for manual init']);
      }
    } catch (error) {
      setTestResults(prev => [...prev, `❌ Manual init error: ${error instanceof Error ? error.message : 'Unknown error'}`]);
    }
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
        <div className="flex gap-2 mb-4 flex-wrap">
          <button
            onClick={manualInit}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Manual Init
          </button>
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