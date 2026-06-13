"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { PrivacyModal } from "./privacy-modal";

export function Footer() {
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <footer
      className="relative"
      style={{ borderTop: "1px solid var(--border-mid)", background: "var(--bg-surface)" }}
    >
      <div
        className="absolute left-1/2 top-0 h-50 w-125 -translate-x-1/2 pointer-events-none"
        aria-hidden="true"
        style={{ background: "radial-gradient(ellipse at top, rgba(224,64,251,0.06) 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 md:gap-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="relative h-9 w-9">
                <div className="absolute inset-0 rounded-lg opacity-30 blur-sm" style={{ background: "var(--grad-primary)" }} />
                <div
                  className="relative flex h-full w-full items-center justify-center rounded-lg"
                  style={{ background: "var(--grad-primary)" }}
                >
                  <span className="text-base font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>M</span>
                </div>
              </div>
              <h3 className="text-lg font-bold gradient-text" style={{ fontFamily: "var(--font-display)" }}>
                MYMevert.id
              </h3>
            </div>

            <p className="mt-4 max-w-sm text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Download and convert media quickly, securely and without registration.
              Your trusted media companion.
            </p>

            <div className="mt-5 flex gap-2">
              {["Twitter", "GitHub", "Discord"].map((social) => (
                <a
                  key={social}
                  href="#"
                  aria-label={social}
                  className="
                    flex h-9 w-9 items-center justify-center rounded-lg
                    border border-border-mid
                    bg-bg-elevated
                    text-text-secondary
                    transition-all duration-200
                    hover:border-accent-blue
                    hover:text-accent-blue
                  "
                >
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-4 font-bold text-sm" style={{ color: "var(--text-primary)", fontFamily: "var(--font-display)", letterSpacing: "0.06em" }}>
              LINKS
            </h4>
            <ul className="space-y-2.5 text-sm" style={{ color: "var(--text-secondary)" }}>
              {["Features", "How It Works", "FAQ", "Privacy Policy"].map((link) => (
                <li key={link}>
                  <a
                    href={link === "Privacy Policy" ? "#" : `#${link.toLowerCase().replace(/ /g, "-")}`}
                    onClick={(e) => {
                      if (link === "Privacy Policy") {
                        e.preventDefault();
                        setShowPrivacy(true);
                      }
                    }}
                    className="
                      accent-line
                      transition-colors duration-200
                      text-text-secondary
                      hover:text-accent-cyan"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Platforms */}
          <div>
            <h4 className="mb-4 font-bold text-sm" style={{ color: "var(--text-primary)", fontFamily: "var(--font-display)", letterSpacing: "0.06em" }}>
              PLATFORMS
            </h4>
            <ul className="space-y-2.5 text-sm" style={{ color: "var(--text-secondary)" }}>
              {["YouTube → MP4", "YouTube → MP3", "Local → MP3", "1080p HD Support"].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="mt-12 flex flex-col items-center justify-between gap-4 pt-8 md:flex-row md:mt-16"
          style={{ borderTop: "1px solid var(--border-dim)" }}
        >
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            &copy; 2026 MYMevert.id. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs" style={{ color: "var(--text-muted)" }}>
            {["Terms", "Privacy", "Cookies"].map((item) => (
              <a
                key={item}
                href="#"
                className="
                  text-text-muted
                  transition-colors duration-200
                  hover:text-accent-cyan"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        <PrivacyModal open={showPrivacy} onClose={() => setShowPrivacy(false)} />
      </div>
    </footer>
  );
}