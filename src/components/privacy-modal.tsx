"use client";

import { X } from "lucide-react";

export function PrivacyModal({ open, onClose }: { open: boolean; onClose: () => void }) {
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
          Privacy Policy
        </h2>

        <div className="space-y-3 text-sm text-gray-300">
          <p>
            MYMevert.id (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates the website https://mymevert.id.
            We do not collect personal information such as name, email, or address.
          </p>

          <h3 className="font-semibold text-white mt-4">Information Collection</h3>
          <p>
            We may collect non-personal information such as browser type, device type,
            and usage statistics through standard web analytics.
          </p>

          <h3 className="font-semibold text-white mt-4">Cookies</h3>
          <p>
            We use cookies to manage user preferences and improve experience.
            Necessary cookies are always enabled. You can manage preferences via the cookie banner.
          </p>

          <h3 className="font-semibold text-white mt-4">Third-Party Services</h3>
          <p>
            Our service may contain links to third-party sites (e.g., YouTube).
            We have no control over their content or privacy practices.
          </p>

          <p className="mt-4 text-xs text-gray-400">&copy; 2026 MYMevert.id. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}