'use client';

import React, { useState, useEffect } from 'react';
import CookieConsent from 'react-cookie-consent';
import { trackEvent } from '@/lib/analytics';

export default function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consentGiven = localStorage.getItem('cookie-consent');
    const consentDenied = localStorage.getItem('cookie-consent-denied');

    if (!consentGiven && !consentDenied) {
      // Show banner after a short delay to not interrupt initial page load
      const timer = setTimeout(() => setShowBanner(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'true');
    localStorage.removeItem('cookie-consent-denied');

    // Enable tracking
    if (typeof window !== 'undefined' && window.Countly) {
      // Re-initialize tracking if needed
      trackEvent('cookie_consent_given', {
        consent_type: 'accepted',
        timestamp: new Date().toISOString()
      });
    }

    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent-denied', 'true');
    localStorage.removeItem('cookie-consent');

    // Disable tracking
    if (typeof window !== 'undefined' && window.Countly) {
      trackEvent('cookie_consent_denied', {
        consent_type: 'declined',
        timestamp: new Date().toISOString()
      });
    }

    setShowBanner(false);
  };

  // Don't render if consent already given/denied or banner shouldn't show
  if (!showBanner) return null;

  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept"
      declineButtonText="Decline"
      cookieName="cookie-consent"
      style={{
        background: "#2B373B",
        color: "#ffffff",
        fontSize: "14px",
        padding: "20px",
        borderTop: "2px solid #ffffff",
      }}
      buttonStyle={{
        background: "#4CAF50",
        color: "white",
        fontSize: "14px",
        padding: "10px 20px",
        borderRadius: "4px",
        border: "none",
        cursor: "pointer",
        marginRight: "10px",
      }}
      declineButtonStyle={{
        background: "#f44336",
        color: "white",
        fontSize: "14px",
        padding: "10px 20px",
        borderRadius: "4px",
        border: "none",
        cursor: "pointer",
      }}
      expires={365}
      onAccept={handleAccept}
      onDecline={handleDecline}
      enableDeclineButton={true}
      flipButtons={false}
    >
      <div className="max-w-4xl mx-auto">
        <h3 className="font-semibold mb-2">🍪 Cookie Preferences</h3>
        <p className="mb-3">
          We use cookies to enhance your browsing experience, analyze site traffic, and personalize content.
          By clicking "Accept", you consent to our use of cookies for analytics.
        </p>
        <div className="text-sm opacity-90">
          <p className="mb-2">
            <strong>Analytics:</strong>
            This helps us improve the user experience.
          </p>
        </div>
        <p className="text-sm mt-3 opacity-75">
          You can change your preferences at any time by clearing your browser cookies.
        </p>
      </div>
    </CookieConsent>
  );
}