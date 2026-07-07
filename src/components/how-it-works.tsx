"use client";
import { Link2, Settings2, Video, Download } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const steps = [
  {
    title: "Paste URL or Upload",
    desc: "Paste your YouTube link for MP4/MP3 or upload your local video file.",
    icon: Link2,
    step: "01",
    color: "var(--accent-cyan)",
  },
  {
    title: "Choose Mode",
    desc: "Select YouTube → MP4, File → MP3, or YouTube → MP3.",
    icon: Settings2,
    step: "02",
    color: "var(--accent-blue)",
  },
  {
    title: "Select Quality",
    desc: "Pick your preferred video resolution or audio bitrate.",
    icon: Video,
    step: "03",
    color: "var(--accent-magenta)",
  },
  {
    title: "Download",
    desc: "Click download and your file will be saved instantly.",
    icon: Download,
    step: "04",
    color: "var(--accent-pink)",
  },
];

export function HowItWorks() {
  useScrollReveal();
  return (
    <section id="how-it-works" className="relative py-20 md:py-24">
      <div
        className="absolute left-1/3 top-20 h-75 w-75 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
        style={{ background: "radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-6xl px-4">
        <div className="reveal text-center mb-12 md:mb-16">
          <span
            className="badge mb-4"
            style={{
              background: "rgba(61,139,255,0.10)",
              border: "1px solid rgba(61,139,255,0.25)",
              color: "var(--accent-blue)",
            }}
          >
            How It Works
          </span>

          <h2
            className="text-3xl font-bold md:text-4xl lg:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span style={{ color: "var(--text-primary)" }}>Simple </span>
            <span className="gradient-text">4 Steps</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm md:text-base" style={{ color: "var(--text-secondary)" }}>
            Get your media in seconds with our streamlined process.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="reveal relative"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                {index < steps.length - 1 && (
                  <div
                    className="absolute left-1/2 top-10 hidden h-px w-full lg:block"
                    style={{
                      background: "linear-gradient(90deg, var(--accent-cyan), var(--accent-magenta))",
                      transform: "translateX(50%)",
                      opacity: 0.3,
                    }}
                    aria-hidden="true"
                  />
                )}

                <div
                  className="glass-card rounded-2xl p-5 md:p-6 text-center hover-lift transition-transform duration-300"
                  style={{ boxShadow: "var(--shadow-card)" }}
                >
                  <div className="relative mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl"
                    style={{ background: `${step.color}18`, border: `1px solid ${step.color}30` }}>
                    <Icon className="h-6 w-6" style={{ color: step.color }} />
                    <span
                      className="absolute -top-2 -right-2 rounded-full px-1.5 py-0.5 text-[10px] font-bold"
                      style={{
                        background: "var(--bg-elevated)",
                        border: `1px solid ${step.color}40`,
                        color: step.color,
                        fontFamily: "var(--font-display)",
                      }}
                    >
                      {step.step}
                    </span>
                  </div>

                  <h3
                    className="font-bold text-base"
                    style={{ color: "var(--text-primary)", fontFamily: "var(--font-display)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}