"use client";
import { Download, Music, Video, FileUp, Sparkles } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
const features = [
  {
    title: "YouTube → MP4",
    desc: "Download YouTube videos directly in MP4 format with quality options up to 1080p.",
    icon: Download,
    accentColor: "var(--accent-pink)",
    gradStart: "#ff4d8f",
    gradEnd: "#e040fb",
  },
  {
    title: "Local → MP3",
    desc: "Upload local videos and convert to high-quality MP3 audio instantly.",
    icon: FileUp,
    accentColor: "var(--accent-cyan)",
    gradStart: "#00d4ff",
    gradEnd: "#3d8bff",
  },
  {
    title: "YouTube → MP3",
    desc: "Extract audio from YouTube videos and download as MP3 directly.",
    icon: Music,
    accentColor: "var(--accent-magenta)",
    gradStart: "#e040fb",
    gradEnd: "#3d8bff",
  },
  {
    title: "Multi Quality",
    desc: "Choose from 360p to 1080p Full HD for videos, or the best audio bitrate.",
    icon: Video,
    accentColor: "var(--accent-gold)",
    gradStart: "#ffd740",
    gradEnd: "#ff9100",
  },
];

export function Features() {
  useScrollReveal();
  return (
    <section id="features" className="relative py-20 md:py-24">
      <div
        className="absolute left-1/2 top-0 h-100 w-150 -translate-x-1/2 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse, rgba(224,64,251,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4">
        {/* Section header */}
        <div className="reveal text-center mb-12 md:mb-16">
          <span
            className="badge mb-4"
            style={{
              background: "rgba(224,64,251,0.10)",
              border: "1px solid rgba(224,64,251,0.25)",
              color: "var(--accent-magenta)",
            }}
          >
            <Sparkles className="h-3 w-3" />
            Features
          </span>

          <h2
            className="text-3xl font-bold md:text-4xl lg:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span style={{ color: "var(--text-primary)" }}>Main </span>
            <span className="gradient-text">Features</span>
          </h2>

          <p
            className="mx-auto mt-4 max-w-2xl text-sm md:text-base"
            style={{ color: "var(--text-secondary)" }}
          >
            Download YouTube videos, extract MP3 audio, and choose the quality
            you want.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="reveal glass-card group relative rounded-2xl p-5 md:p-6 hover-lift transition-transform duration-300"
                style={{
                  transitionDelay: `${index * 80}ms`,
                  boxShadow: "var(--shadow-card)",
                }}
              >
                {/* Icon */}
                <div
                  className="relative inline-flex h-12 w-12 items-center justify-center rounded-xl p-0.5"
                  style={{
                    background: `linear-gradient(135deg, ${feature.gradStart}, ${feature.gradEnd})`,
                  }}
                >
                  <div
                    className="flex h-full w-full items-center justify-center rounded-[10px]"
                    style={{ background: "var(--bg-elevated)" }}
                  >
                    <Icon
                      className="h-5 w-5"
                      style={{
                        color: "var(--text-primary)",
                      }}
                    />
                  </div>
                </div>

                {/* Content */}
                <h3
                  className="mt-4 font-bold text-base"
                  style={{
                    color: "var(--text-primary)",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {feature.title}
                </h3>

                <p
                  className="mt-2 text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {feature.desc}
                </p>

                {/* Bottom accent line */}
                <div
                  className="mt-4 h-0.5 w-0 rounded-full transition-all duration-500 group-hover:w-full"
                  style={{
                    background: `linear-gradient(135deg, ${feature.gradStart}, ${feature.gradEnd})`,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}