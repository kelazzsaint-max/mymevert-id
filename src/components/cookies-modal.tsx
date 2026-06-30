"use client";

import { X } from "lucide-react";

export function CookiesModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="relative mx-4 w-full max-w-2xl rounded-2xl bg-gray-900 p-6 shadow-2xl border border-gray-700 max-h-[80vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white transition"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>
          Cookie Policy
        </h2>

        <div className="space-y-3 text-sm text-gray-300">
          <p>
            This Cookie Policy explains how MYMevert.id uses cookies to manage your session and
            improve your browsing experience. No personal data is sold or shared with third parties.
          </p>

          <h3 className="font-semibold text-white mt-4">Necessary Cookies</h3>
          <p>
            These cookies are essential for basic site functionality, such as remembering your
            cookie consent choice. They are always enabled and cannot be disabled.
          </p>

          <h3 className="font-semibold text-white mt-4">Analytics Cookies</h3>
          <p>
            With your consent, we may use analytics cookies to understand how visitors interact
            with the Service, helping us improve performance and usability. These are optional
            and can be managed via the cookie banner at any time.
          </p>

          <h3 className="font-semibold text-white mt-4">Managing Your Preferences</h3>
          <p>
            You can accept, decline, or customize your cookie preferences at any time through
            the cookie banner that appears when you visit the site.
          </p>

          <p className="mt-4 text-xs text-gray-400">&copy; 2026 MYMevert.id. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}