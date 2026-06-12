"use client";

import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/navbar").then(mod => mod.Navbar), {
  ssr: false,
  loading: () => (
    <header className="sticky top-0 z-50 h-16 bg-nav-bg/60 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center px-2">
        <div className="flex items-center gap-3">
          <div className="relative h-9 w-9">
            <div className="absolute inset-0 rounded-lg bg-linear-to-br from-accent-blue to-accent-magenta opacity-30 blur-sm" />
            <div className="relative flex h-full w-full items-center justify-center rounded-lg bg-linear-to-br from-accent-blue to-accent-magenta">
              <span className="font-display text-base font-800 text-white">M</span>
            </div>
          </div>
          <span className="text-xl font-bold gradient-text">MYMevert.id</span>
        </div>
      </div>
    </header>
  ),
});

export function ClientNavbar() {
  return <Navbar />;
}