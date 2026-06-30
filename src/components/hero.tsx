"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme } from "next-themes";
import { Play, Pause } from "lucide-react";
import { ConverterInput } from "@/components/converter/converter-input";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const { resolvedTheme } = useTheme();

  // Ganti video berdasarkan ukuran layar
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateVideoSource = () => {
      const isMobile = window.innerWidth < 768;
      const videoSource = isMobile ? "/bg-video-mobile.mp4" : "/bg-video.mp4";
      
      if (video.src.includes(videoSource)) return;
      
      const wasPlaying = !video.paused;
      video.src = videoSource;
      if (wasPlaying) {
        video.play().catch(() => {});
      }
    };

    updateVideoSource();

    window.addEventListener('resize', updateVideoSource);
    return () => window.removeEventListener('resize', updateVideoSource);
  }, []);

  // Pause video saat keluar dari layar biar gak terus-terusan makan resource HP
  useEffect(() => {
    const video = videoRef.current;
    const section = document.getElementById("hero");
    if (!video || !section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
          setPlaying(true);
        } else {
          video.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setPlaying(true);
      } else {
        videoRef.current.pause();
        setPlaying(false);
      }
    }
  };

  // OVERLAY TETAP GELAP (tidak berubah di light mode)
  const overlayStyle = "linear-gradient(to bottom, rgba(10,10,15,0.75) 0%, rgba(10,10,15,0.5) 50%, rgba(10,10,15,0.85) 100%)";

  // Style tombol berdasarkan tema (tetap)
  const buttonStyle = {
    background: resolvedTheme === "light" 
      ? "rgba(255, 255, 255, 0.9)" 
      : "rgba(0, 0, 0, 0.6)",
    borderColor: resolvedTheme === "light" 
      ? "rgba(0, 0, 0, 0.2)" 
      : "rgba(255, 255, 255, 0.2)",
    color: resolvedTheme === "light" 
      ? "#1e293b" 
      : "white",
    boxShadow: resolvedTheme === "light"
      ? "0 2px 8px rgba(0,0,0,0.1)"
      : "none"
  };

  return (
    <section id="hero" className="relative overflow-hidden py-16 md:py-24">
      {/* Background Video */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="relative h-full w-full overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 z-0 h-full w-full object-cover md:scale-130"
          >
            <source src="/bg-video.mp4" type="video/mp4" media="(min-width: 768px)" />
            <source src="/bg-video-mobile.mp4" type="video/mp4" media="(max-width: 767px)" />
          </video>
          <div className="absolute inset-0" style={{ background: overlayStyle }} />
        </div>
      </div>

      {/* Play/Pause button */}
      <button
        onClick={togglePlay}
        className="absolute bottom-3 right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
        style={buttonStyle}
        aria-label={playing ? "Pause background video" : "Play background video"}
      >
        {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
      </button>

      <div className="hero-content relative z-10 mx-auto max-w-5xl px-4 text-center">
        {/* Badge */}
        <div className="reveal mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm backdrop-blur-sm"
          style={{ border: "1px solid rgba(255,77,143,0.25)", background: "rgba(255,77,143,0.06)" }}>
          <YouTubeIcon />
          <span style={{ color: "var(--accent-pink)", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "13px" }}>
            3 Conversion Modes
          </span>
          <span style={{ color: "#94a3b8" }}>•</span>
          <span style={{ color: "#94a3b8", fontSize: "13px" }}>Free & Fast</span>
        </div>

        {/* Heading */}
        <h1 className="reveal text-4xl font-bold tracking-tight md:text-5xl lg:text-7xl"
          style={{ fontFamily: "var(--font-display)" }}>
          <span className="block" style={{ color: "#e2e8f0" }}>Convert Media</span>
          <span className="gradient-text animate-gradient" style={{ backgroundSize: "200% 200%" }}>
            Faster Than Ever
          </span>
        </h1>

        <p className="reveal mx-auto mt-5 max-w-2xl text-sm leading-relaxed md:text-base lg:text-lg text-secondary">
          Download YouTube videos as MP4, extract audio as MP3 from local files,
          or grab MP3 directly from YouTube. All in one place — no registration needed.
        </p>

        {/* Converter */}
        <div id="converter" className="reveal mt-10 md:mt-12">
          <ConverterInput />
        </div>

        {/* Trust badges */}
        <div className="reveal mt-8 flex flex-wrap items-center justify-center gap-6 text-xs md:text-sm">
          {["100% Free", "No Registration", "High Quality", "Instant Download"].map((label) => (
            <div key={label} className="flex items-center gap-2">
              <svg className="h-4 w-4 text-accent-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span style={{ color: "white" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function YouTubeIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
      style={{ color: "var(--accent-pink)" }}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}