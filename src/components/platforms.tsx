export function Platforms() {
  return (
    <section className="py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="reveal text-center mb-10 md:mb-14">
          <span
            className="badge mb-4"
            style={{
              background: "rgba(255,77,143,0.10)",
              border: "1px solid rgba(255,77,143,0.25)",
              color: "var(--accent-pink)",
            }}
          >
            Supported Platform
          </span>

          <h2
            className="text-3xl font-bold md:text-4xl lg:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span style={{ color: "var(--text-primary)" }}>Powered by </span>
            <span className="gradient-text">YouTube</span>
          </h2>

          <p
            className="mx-auto mt-4 max-w-2xl text-sm md:text-base"
            style={{ color: "var(--text-secondary)" }}
          >
            Currently we support YouTube for all your download and media
            conversion needs.
          </p>
        </div>

        <div className="reveal mx-auto max-w-md">
          <div
            className="glass-card corner-bracket group relative overflow-hidden rounded-2xl p-8 text-center transition-all duration-300 hover:-translate-y-1"
            style={{ boxShadow: "var(--shadow-elevated)" }}
          >
            {/* Glow bg */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(255,77,143,0.08) 0%, transparent 70%)",
              }}
              aria-hidden="true"
            />

            <div className="relative">
              {/* Icon */}
              <div
                className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl"
                style={{
                  background: "rgba(255,0,0,0.10)",
                  border: "1px solid rgba(255,0,0,0.20)",
                }}
              >
                <svg
                  className="h-10 w-10"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  style={{ color: "#ff0000" }}
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </div>

              <h3
                className="text-2xl font-bold"
                style={{
                  color: "var(--text-primary)",
                  fontFamily: "var(--font-display)",
                }}
              >
                YouTube
              </h3>

              <p
                className="mt-2 text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                Download videos & extract audio in MP4 and MP3 formats
              </p>

              {/* Tags */}
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {[
                  {
                    label: "MP4 Download",
                    color: "var(--accent-pink)",
                    bg: "rgba(255,77,143,0.10)",
                  },
                  {
                    label: "MP3 Extract",
                    color: "var(--accent-magenta)",
                    bg: "rgba(224,64,251,0.10)",
                  },
                  {
                    label: "1080p HD",
                    color: "var(--accent-blue)",
                    bg: "rgba(61,139,255,0.10)",
                  },
                ].map((tag) => (
                  <span
                    key={tag.label}
                    className="rounded-full px-3 py-1 text-xs font-semibold"
                    style={{
                      background: tag.bg,
                      color: tag.color,
                      border: `1px solid ${tag.color}30`,
                      fontFamily: "var(--font-display)",
                      letterSpacing: "0.03em",
                    }}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
