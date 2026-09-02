"use client";

import { useState, useEffect } from "react";
import { AlertTriangle, X } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/6283184280657?text=Halo%2C%20saya%20lihat%20fitur%20convert%20di%20MYMevert.id%20sedang%20tidak%20aktif%2C%20kapan%20bisa%20dipakai%20lagi%20ya%3F";

const DISMISS_KEY = "backend-status-dismissed";

export function BackendStatusBanner() {
  const [visible, setVisible] = useState(false);
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem(DISMISS_KEY);
    if (dismissed === "true") return;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      setVisible(true);
      return;
    }

    fetch(`${apiUrl}/health`, { signal: controller.signal })
      .then(async (res) => {
        if (!res.ok) throw new Error("not ok");
        const data = await res.json();
        if (data.status !== "healthy") throw new Error("not healthy");
        setVisible(false);
      })
      .catch(() => {
        setVisible(true);
      })
      .finally(() => clearTimeout(timeout));

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  const dismiss = () => {
    setHiding(true);
    setTimeout(() => {
      sessionStorage.setItem(DISMISS_KEY, "true");
      setVisible(false);
      setHiding(false);
    }, 400);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[60] px-4 pb-4 md:px-6 md:pb-6 lg:px-8 lg:pb-8"
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
              style={{
                background: "rgba(245,158,11,0.12)",
                border: "1px solid rgba(245,158,11,0.25)",
              }}
            >
              <AlertTriangle className="h-4 w-4 text-amber-400" />
            </div>
            <div>
              <p
                className="text-sm font-bold"
                style={{
                  color: "var(--text-primary)",
                  fontFamily: "var(--font-display)",
                }}
              >
                Layanan Convert Tidak Aktif
              </p>
              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                mymevert.id
              </p>
            </div>
          </div>
          <button
            onClick={dismiss}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-all hover:bg-bg-elevated"
            style={{ color: "var(--text-muted)" }}
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:gap-6">
          <p className="text-sm leading-relaxed mb-4 md:mb-0 md:flex-1 text-gray-300">
            Layanan convert sedang tidak aktif saat ini. Kamu tetap bisa
            lihat-lihat halaman ini, tapi fitur convert belum bisa dipakai.
            Hubungi kami di WhatsApp untuk info kapan aktif lagi.
          </p>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="glow-btn flex-1 md:flex-none rounded-xl py-2.5 px-6 text-sm font-semibold text-white"
              style={{
                background: "var(--grad-primary)",
                fontFamily: "var(--font-display)",
              }}
            >
              Chat WhatsApp
            </a>
            <button
              onClick={dismiss}
              className="flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-medium transition-all"
              style={{
                background: "var(--bg-elevated)",
                border: "1px solid var(--border-mid)",
                color: "var(--text-secondary)",
                fontFamily: "var(--font-display)",
              }}
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
