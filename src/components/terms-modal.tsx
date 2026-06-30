"use client";

import { X } from "lucide-react";

export function TermsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
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
          Terms of Service
        </h2>

        <div className="space-y-3 text-sm text-gray-300">
          <p>
            By accessing and using MYMevert.id (&quot;the Service&quot;), you agree to be bound by these
            Terms of Service. If you do not agree, please discontinue use of the Service.
          </p>

          <h3 className="font-semibold text-white mt-4">Use of Service</h3>
          <p>
            MYMevert.id is a free media conversion tool that allows users to download YouTube
            videos as MP4, extract MP3 audio from YouTube, or convert local video files to MP3.
            No registration or account is required to use the Service.
          </p>

          <h3 className="font-semibold text-white mt-4">User Responsibility</h3>
          <p>
            You are solely responsible for ensuring that your use of the Service complies with
            applicable copyright laws and the terms of service of any third-party platform
            (including YouTube). MYMevert.id does not host, store, or distribute any copyrighted
            content; it only facilitates format conversion of content you provide or link to.
          </p>

          <h3 className="font-semibold text-white mt-4">No Warranty</h3>
          <p>
            The Service is provided &quot;as is&quot; without warranties of any kind. We do not guarantee
            uninterrupted availability, conversion accuracy, or that the Service will be free of
            errors at all times.
          </p>

          <h3 className="font-semibold text-white mt-4">Limitation of Liability</h3>
          <p>
            MYMevert.id and its operators shall not be liable for any damages arising from the
            use or inability to use the Service, including but not limited to data loss or
            third-party claims related to content conversion.
          </p>

          <h3 className="font-semibold text-white mt-4">Changes to Terms</h3>
          <p>
            We may update these Terms from time to time. Continued use of the Service after
            changes are posted constitutes acceptance of the revised Terms.
          </p>

          <p className="mt-4 text-xs text-gray-400">&copy; 2026 MYMevert.id. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}