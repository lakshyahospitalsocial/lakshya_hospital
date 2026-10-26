"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X, ShieldCheck } from "lucide-react";

const COOKIE_CONSENT_KEY = "lakshya_cookie_consent";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check whether user already made a choice
    const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!savedConsent) {
      // Delay showing the banner slightly for smoother UX
      const timer = setTimeout(() => setShowBanner(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    // Also set a document cookie so server/middleware can detect it if needed
    document.cookie = `${COOKIE_CONSENT_KEY}=accepted; path=/; max-age=31536000; SameSite=Lax`;
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "declined");
    document.cookie = `${COOKIE_CONSENT_KEY}=declined; path=/; max-age=31536000; SameSite=Lax`;
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie Consent Banner"
      className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-500"
    >
      <div className="bg-white/95 backdrop-blur-md border border-gray-200/80 rounded-2xl shadow-2xl p-5 sm:p-6 text-gray-800">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
            <Cookie className="w-5 h-5" />
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-base font-bold text-gray-900 flex items-center gap-1.5">
                We value your privacy
              </h3>
              <button
                onClick={handleDecline}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg"
                aria-label="Close cookie banner"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-gray-600 mt-1.5 leading-relaxed">
              We use cookies to improve your browsing experience, analyze site traffic, and assist with appointments. Learn more in our{" "}
              <Link
                href="/privacy-policy#cookies"
                className="text-primary font-medium hover:underline inline-flex items-center gap-0.5"
              >
                Privacy Policy
              </Link>
              .
            </p>

            <div className="mt-4 flex items-center gap-2.5">
              <button
                onClick={handleAccept}
                className="flex-1 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-primary hover:bg-primary-hover rounded-xl shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4" />
                Accept All
              </button>

              <button
                onClick={handleDecline}
                className="px-3.5 py-2 text-xs sm:text-sm font-medium text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200/80 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
