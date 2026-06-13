"use client";

import { useState, useEffect } from "react";
import { Cookie, X, Settings, Shield } from "lucide-react";

type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
};

function CookieSettingsModal({ onClose, onSave }: { onClose: () => void; onSave: (settings: CookiePreferences) => void }) {
  const [analytics, setAnalytics] = useState(false);

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative mx-4 w-full max-w-md rounded-2xl bg-gray-900 p-6 shadow-2xl border border-gray-700">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white transition"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20 border border-cyan-500/40">
            <Shield className="h-5 w-5 text-cyan-400" />
          </div>
          <h3 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
            Cookie Preferences
          </h3>
        </div>

        <p className="mb-6 text-sm text-gray-300">
          Customize your cookie preferences. Necessary cookies are always enabled.
        </p>

        <div className="space-y-4">
          {/* Necessary Cookies - Always enabled */}
          <div className="rounded-xl bg-gray-800/50 p-4 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-white">Necessary Cookies</p>
                <p className="text-xs text-gray-400">Required for basic site functionality</p>
              </div>
              <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs text-green-400">Always On</span>
            </div>
          </div>

          {/* Analytics Cookies - Optional */}
          <div className="rounded-xl bg-gray-800/50 p-4 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-white">Analytics Cookies</p>
                <p className="text-xs text-gray-400">Help us understand how visitors interact</p>
              </div>
              <button
                onClick={() => setAnalytics(!analytics)}
                className={`relative h-6 w-11 rounded-full transition ${analytics ? "bg-cyan-500" : "bg-gray-600"}`}
              >
                <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${analytics ? "left-5" : "left-0.5"}`} />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl bg-gray-700 py-2.5 text-sm font-semibold text-white hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSave({ necessary: true, analytics });
            }}
            className="flex-1 rounded-xl bg-linear-to-r from-cyan-500 to-blue-500 py-2.5 text-sm font-semibold text-white transition hover:shadow-lg"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [hiding, setHiding] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const consent = localStorage.getItem("cookie-consent");
      const lastAcceptDate = localStorage.getItem("cookie-last-accept");
      const oneMonth = 30 * 24 * 60 * 60 * 1000;
      const now = Date.now();

      if (consent === "accepted" || consent === "managed") {
        if (lastAcceptDate && (now - parseInt(lastAcceptDate)) < oneMonth) {
          setVisible(false);
          return;
        } else {
          localStorage.removeItem("cookie-consent");
          localStorage.removeItem("cookie-last-accept");
          setVisible(true);
          return;
        }
      }

      if (!consent || consent === "declined") {
        setVisible(true);
        return;
      }

      setVisible(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const dismiss = (value: "accepted" | "declined" | "managed") => {
    setHiding(true);
    setTimeout(() => {
      if (value === "accepted") {
        localStorage.setItem("cookie-consent", "accepted");
        localStorage.setItem("cookie-last-accept", Date.now().toString());
        setVisible(false);
      } else if (value === "declined") {
        localStorage.setItem("cookie-consent", "declined");
        localStorage.removeItem("cookie-last-accept");
        setVisible(false);
      } else if (value === "managed") {
        setShowModal(true);
        setHiding(false);
      }
      setHiding(false);
    }, 400);
  };

  const saveCookieSettings = (settings: CookiePreferences) => {
    localStorage.setItem("cookie-consent", "managed");
    localStorage.setItem("cookie-last-accept", Date.now().toString());
    localStorage.setItem("cookie-preferences", JSON.stringify(settings));
    setVisible(false);
    setShowModal(false);
  };

  if (!visible && !showModal) return null;

  return (
    <>
      <div
        className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 md:px-6 md:pb-6 lg:px-8 lg:pb-8"
        style={{
          opacity: hiding ? 0 : 1,
          transform: hiding ? "translateY(20px)" : "translateY(0)",
          transition: "opacity 0.4s ease, transform 0.4s ease",
        }}
      >
        <div
          className="grad-border glass-card corner-bracket rounded-2xl p-5 md:p-6 w-full"
          style={{ boxShadow: "var(--shadow-elevated)" }}
        >
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                style={{ background: "rgba(6,182,212,0.12)", border: "1px solid rgba(6,182,212,0.25)" }}
              >
                <Cookie className="h-4 w-4" style={{ color: "var(--accent-cyan)" }} />
              </div>
              <div>
                <p className="text-sm font-bold" style={{ color: "var(--text-primary)", fontFamily: "var(--font-display)" }}>
                  🍪 Cookie Notice
                </p>
                <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                  mymevert.id
                </p>
              </div>
            </div>
            <button
              onClick={() => dismiss("declined")}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-all hover:bg-bg-elevated"
              style={{ color: "var(--text-muted)" }}
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:gap-6">
            <p className="text-sm leading-relaxed mb-4 md:mb-0 md:flex-1 text-gray-300">
              We use cookies to manage user sessions and improve your browsing experience. No personal data is sold or shared with third parties.
            </p>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => dismiss("accepted")}
                className="glow-btn flex-1 md:flex-none rounded-xl py-2.5 px-6 text-sm font-semibold text-white"
                style={{ background: "var(--grad-primary)", fontFamily: "var(--font-display)" }}
              >
                Accept All
              </button>
              <button
                onClick={() => dismiss("managed")}
                className="flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-medium transition-all"
                style={{
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border-mid)",
                  color: "var(--text-secondary)",
                  fontFamily: "var(--font-display)",
                }}
              >
                <Settings className="h-3.5 w-3.5" />
                Manage
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <CookieSettingsModal
          onClose={() => setShowModal(false)}
          onSave={saveCookieSettings}
        />
      )}
    </>
  );
}