"use client";
import { useState, useEffect, useCallback, useSyncExternalStore } from "react";
import { Menu, X, Sun, Moon, Sparkles } from "lucide-react";
import { useTheme } from "next-themes";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

const navLinks = [
  { href: "#hero", label: "Home" },
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#why-choose", label: "Why Us" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const mounted = useSyncExternalStore(
    (cb) => { window.addEventListener("mounted", cb); return () => window.removeEventListener("mounted", cb); },
    () => true,
    () => false
  );

  const { resolvedTheme, setTheme } = useTheme();

  const closeMenu = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    let ticking = false;

    const updateScrollState = () => {
      setScrolled(window.scrollY > 20);
      const ids = navLinks.map((l) => l.href.replace("#", ""));
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) {
          const { top, bottom } = el.getBoundingClientRect();
          if (top <= 100 && bottom >= 100) {
            setActiveSection(id);
            break;
          }
        }
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    closeMenu();
    const el = document.getElementById(href.replace("#", ""));
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const handleMobileLinkClick = (href: string) => {
    closeMenu();
    const el = document.getElementById(href.replace("#", ""));
    el?.scrollIntoView();
  };

  return (
    <header
      suppressHydrationWarning
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-border-mid bg-nav-bg/90 backdrop-blur-md shadow-lg shadow-black/20"
          : "border-transparent bg-nav-bg/60 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center px-2">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick("#hero");
            }}
            className="flex items-center gap-3"
            aria-label="MYMevert.id Home"
          >
            <div className="relative h-9 w-9">
              <div className="absolute inset-0 rounded-lg bg-linear-to-br from-accent-blue to-accent-magenta opacity-30 blur-sm" />
              <div className="relative flex h-full w-full items-center justify-center rounded-lg bg-linear-to-br from-accent-blue to-accent-magenta">
                <span className="font-display text-base font-800 text-white">M</span>
              </div>
            </div>
            <span className="text-xl font-bold gradient-text" style={{ fontFamily: "var(--font-display)" }}>MYMevert.id</span>
          </a>
        </div>

        {/* Center nav */}
        <nav className="hidden md:flex gap-1 mx-auto" aria-label="Main navigation">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <button
                key={link.href}
                onClick={() => handleLinkClick(link.href)}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${
                  isActive ? "text-text-primary bg-bg-elevated" : "text-text-secondary hover:text-text-primary hover:bg-bg-elevated"
                }`}
                aria-current={isActive ? "page" : undefined}
                style={{ fontFamily: "var(--font-display)", fontSize: "13px", letterSpacing: "0.02em" }}
              >
                {link.label}
                {isActive && <span className="nav-active-dot" />}
              </button>
            );
          })}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="relative flex h-10 w-20 items-center rounded-full p-1 transition-all duration-450 ease-in-out theme-toggle-pill"
            style={{
              background: resolvedTheme === "dark" ? "var(--bg-elevated)" : "var(--bg-elevated)",
              border: resolvedTheme === "dark" ? "1px solid rgba(255,255,255,0.15)" : "1px solid var(--border-mid)",
              boxShadow: resolvedTheme === "dark" ? "0 0 0 1px rgba(255,255,255,0.08) inset" : "none",
            }}
            aria-label="Toggle theme"
            suppressHydrationWarning
          >
            {/* Knob */}
            <div
              className="relative flex h-8 w-8 items-center justify-center rounded-full transition-all duration-450 ease-in-out theme-toggle-knob"
              style={{
                background: resolvedTheme === "dark" ? "#0f172a" : "#ffffff",
                transform: resolvedTheme === "dark" ? "translateX(40px)" : "translateX(0)",
                boxShadow: resolvedTheme === "dark" ? "0 0 10px rgba(255,255,255,0.2)" : "0 0 10px var(--accent-blue)",
              }}
            >
              {!mounted ? (
                <span className="h-4 w-4" />
              ) : (
                <>
                  {/* Sun icon - light mode */}
                  <div
                    className="absolute inset-0 flex items-center justify-center transition-all duration-350 ease-in-out theme-toggle-icon"
                    style={{
                      opacity: resolvedTheme === "light" ? 1 : 0,
                      transform: resolvedTheme === "light" ? "scale(1) rotate(0deg)" : "scale(0.5) rotate(-45deg)",
                      pointerEvents: resolvedTheme === "light" ? "auto" : "none",
                    }}
                  >
                    <Sun className="h-4 w-4" style={{ color: "var(--accent-blue)" }} />
                  </div>
                  {/* Moon + Sparkles - dark mode */}
                  <div
                    className="absolute inset-0 flex items-center justify-center transition-all duration-350 ease-in-out theme-toggle-icon"
                    style={{
                      opacity: resolvedTheme === "dark" ? 1 : 0,
                      transform: resolvedTheme === "dark" ? "scale(1) rotate(0deg)" : "scale(0.5) rotate(45deg)",
                      pointerEvents: resolvedTheme === "dark" ? "auto" : "none",
                    }}
                  >
                    <div className="relative flex items-center justify-center">
                      <Moon className="h-4 w-4 text-white" />
                      <Sparkles className="absolute -right-1 -top-1 h-2.5 w-2.5 text-white/80" />
                      <Sparkles className="absolute -left-1 -bottom-0.5 h-2 w-2 text-white/60" />
                    </div>
                  </div>
                </>
              )}
            </div>
          </button>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-border-mid text-text-secondary" aria-label={isOpen ? "Close menu" : "Open menu"}>
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-72 p-0"
              aria-describedby={undefined}
              style={{ background: "var(--nav-bg)", backdropFilter: "blur(12px)", borderLeft: "1px solid var(--border-mid)" }}
            >
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <nav className="flex flex-col gap-1 px-4 py-6 mt-6" aria-label="Mobile navigation">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => handleMobileLinkClick(link.href)}
                    className={`rounded-lg px-4 py-3 text-sm font-medium transition text-left ${
                      activeSection === link.href.replace("#", "") ? "bg-bg-elevated text-text-primary" : "text-text-secondary hover:bg-bg-elevated hover:text-text-primary"
                    }`}
                  >{link.label}</button>
                ))}
                <a
                  href="#converter"
                  onClick={(e) => {
                    e.preventDefault();
                    closeMenu();
                    handleMobileLinkClick("#converter");
                  }}
                  className="glow-btn mt-2 rounded-lg px-4 py-3 text-center text-sm font-semibold text-white"
                  style={{ background: "var(--grad-primary)", boxShadow: "var(--glow-blue)" }}
                >Start Converting</a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}