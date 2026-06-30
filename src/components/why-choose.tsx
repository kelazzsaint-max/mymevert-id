import { Zap, Shield, CheckCircle2, Layers3 } from "lucide-react";

const items = [
  {
    title: "Lightning Fast",
    desc: "Convert and download in seconds with our optimized YouTube integration.",
    icon: Zap,
    accentColor: "var(--accent-gold)",
    gradStart: "#ffd740",
    gradEnd: "#ff9100",
  },
  {
    title: "Secure & Private",
    desc: "No registration required. Your files and data stay completely private.",
    icon: Shield,
    accentColor: "var(--accent-green)",
    gradStart: "#00e5a0",
    gradEnd: "#00b87a",
  },
  {
    title: "3 Conversion Modes",
    desc: "YouTube → MP4, Local → MP3, or YouTube → MP3. All in one tool.",
    icon: Layers3,
    accentColor: "var(--accent-cyan)",
    gradStart: "#00d4ff",
    gradEnd: "#3d8bff",
  },
  {
    title: "Super Easy",
    desc: "Paste URL, choose mode, click download. Three simple steps to get your media.",
    icon: CheckCircle2,
    accentColor: "var(--accent-magenta)",
    gradStart: "#e040fb",
    gradEnd: "#ff4d8f",
  },
];

export function WhyChoose() {
  return (
    <section id="why-choose" className="relative py-20 md:py-24">
      <div
        className="absolute right-1/4 bottom-0 h-87.5 w-87.5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(circle, rgba(224,64,251,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4">
        <div className="reveal text-center mb-12 md:mb-16">
          <span
            className="badge mb-4"
            style={{
              background: "rgba(255,215,64,0.10)",
              border: "1px solid rgba(255,215,64,0.25)",
              color: "var(--accent-gold)",
            }}
          >
            Why Us
          </span>

          <h2
            className="text-3xl font-bold md:text-4xl lg:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span style={{ color: "var(--text-primary)" }}>Why Choose </span>
            <span className="gradient-text">MYMevert</span>
          </h2>

          <p
            className="mx-auto mt-4 max-w-2xl text-sm md:text-base"
            style={{ color: "var(--text-secondary)" }}
          >
            The most versatile YouTube media converter you will ever use.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="reveal glass-card group rounded-2xl p-5 md:p-6 hover-lift transition-transform duration-300"
                style={{
                  transitionDelay: `${index * 80}ms`,
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <div
                  className="inline-flex h-12 w-12 items-center justify-center rounded-xl p-0.5"
                  style={{
                    background: `linear-gradient(135deg, ${item.gradStart}, ${item.gradEnd})`,
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

                <h3
                  className="mt-4 font-bold text-base"
                  style={{
                    color: "var(--text-primary)",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {item.title}
                </h3>

                <p
                  className="mt-2 text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {item.desc}
                </p>

                <div
                  className="mt-4 h-0.5 w-0 rounded-full transition-all duration-500 group-hover:w-full"
                  style={{
                    background: `linear-gradient(135deg, ${item.gradStart}, ${item.gradEnd})`,
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