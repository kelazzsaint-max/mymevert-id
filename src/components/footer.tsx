"use client";

import { useState } from "react";
import { PrivacyModal } from "./privacy-modal";
import { TermsModal } from "./terms-modal";
import { CookiesModal } from "./cookies-modal";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.303-5.467-1.334-5.467-5.93 0-1.31.467-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.5 11.5 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
    </svg>
  );
}

function WhatsappIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413"/>
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

const socials = [
  {
    name: "GitHub",
    href: "https://github.com/kelazzsaint-max",
    icon: GithubIcon,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@ZAI_HD",
    icon: YoutubeIcon,
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/6283184280657?text=Halo%20saya%20mau%20tanya%20tentang%20MYMevert.id",
    icon: WhatsappIcon,
  },
];

export function Footer() {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showCookies, setShowCookies] = useState(false);

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
              {socials.map(({ name, href, icon: Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
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
                  <Icon className="h-4 w-4" />
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
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setShowTerms(true);
              }}
              className="text-text-muted transition-colors duration-200 hover:text-accent-cyan"
            >
              Terms
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setShowPrivacy(true);
              }}
              className="text-text-muted transition-colors duration-200 hover:text-accent-cyan"
            >
              Privacy
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setShowCookies(true);
              }}
              className="text-text-muted transition-colors duration-200 hover:text-accent-cyan"
            >
              Cookies
            </a>
          </div>
        </div>

        <PrivacyModal open={showPrivacy} onClose={() => setShowPrivacy(false)} />
        <TermsModal open={showTerms} onClose={() => setShowTerms(false)} />
        <CookiesModal open={showCookies} onClose={() => setShowCookies(false)} />
      </div>
    </footer>
  );
}