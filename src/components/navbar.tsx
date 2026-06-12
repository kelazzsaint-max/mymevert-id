"use client";
import { useState, useEffect, useCallback, useSyncExternalStore } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
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
    const handleScroll = () => {
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
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    closeMenu();
    const el = document.getElementById(href.replace("#", ""));
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      suppressHydrationWarning
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-border-mid bg-nav-bg/90 backdrop-blur-2xl shadow-lg shadow-black/20"
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
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border-mid text-text-secondary transition-all hover:border-accent-blue hover:text-accent-blue"
                aria-label="Toggle theme"
                suppressHydrationWarning
              >
                {!mounted ? <span className="h-4 w-4" /> : resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
            </TooltipTrigger>
            <TooltipContent 
                side="bottom" 
                sideOffset={0}
                className="border-0 px-2 py-1"
                style={{
                  backgroundColor: resolvedTheme === "dark" ? "#1f2937" : "#f3f4f6",
                  color: resolvedTheme === "dark" ? "#ffffff" : "#111827"
                }}
              >
                {/* Hilangkan arrow dengan CSS */}
                <style>{`
                  [data-radix-popper-content-wrapper] [data-side="bottom"]::before {
                    display: none !important;
                  }
                `}</style>
                <p className="text-xs font-medium" style={{ margin: 0 }}>
                  {resolvedTheme === "dark" ? "Light" : "Dark"}
                </p>
              </TooltipContent>
          </Tooltip>

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
              style={{ background: "var(--nav-bg)", backdropFilter: "blur(24px)", borderLeft: "1px solid var(--border-mid)" }}
            >
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <nav className="flex flex-col gap-1 px-4 py-6 mt-6" aria-label="Mobile navigation">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => handleLinkClick(link.href)}
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
                    handleLinkClick("#converter");
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