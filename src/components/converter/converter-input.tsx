"use client";

import { useState, useRef } from "react";
import {
  Download,
  FileUp,
  Music,
  Loader2,
  CheckCircle2,
  AlertCircle,
  X,
  FileVideo2,
  Tv2,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

type TabMode = "yt-mp4" | "local-mp3" | "yt-mp3";
type Status  = "idle" | "loading" | "success" | "error";

// API URL dari environment variable
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

function YouTubeIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function StatusBanner({ status, progress, error, onClose, showProgress = false }: {
  status: Status; progress?: number; error: string; onClose: () => void; showProgress?: boolean;
}) {
  if (status === "idle") return null;
  const config = {
    loading: {
      icon: <Loader2 className="h-4 w-4 animate-spin shrink-0" style={{ color: "var(--accent-cyan)" }} />,
      borderColor: "var(--accent-cyan)", bgColor: "rgba(0,212,255,0.08)", textColor: "var(--accent-cyan)",
      label: progress != null ? `Processing... ${progress}%` : "Processing, please wait…",
    },
    success: {
      icon: <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: "var(--accent-green)" }} />,
      borderColor: "var(--accent-green)", bgColor: "rgba(0,229,160,0.08)", textColor: "var(--accent-green)",
      label: "Success! Your file is being downloaded.",
    },
    error: {
      icon: <AlertCircle className="h-4 w-4 shrink-0" style={{ color: "var(--accent-pink)" }} />,
      borderColor: "var(--accent-pink)", bgColor: "rgba(255,77,143,0.08)", textColor: "var(--accent-pink)",
      label: error,
    },
  }[status];
  return (
    <div className="rounded-xl px-4 py-3 text-sm transition-all duration-300"
      style={{ border: `1px solid ${config.borderColor}40`, background: config.bgColor, color: config.textColor }}
      role="status" aria-live="polite">
      <div className="flex items-center gap-3">
        {config.icon}
        <span className="flex-1 leading-relaxed">{config.label}</span>
        {status !== "loading" && (
          <button onClick={onClose} className="shrink-0 rounded-lg p-1 transition" style={{ background: "transparent" }} aria-label="Close">
            <X className="h-4 w-4 opacity-60" />
          </button>
        )}
      </div>
      {showProgress && status === "loading" && <Progress value={progress ?? 0} className="mt-2" style={{ background: "var(--bg-elevated)" }} />}
    </div>
  );
}

function TabButton({ tab, isActive, onClick }: {
  tab: { id: TabMode; label: string; shortLabel: string; icon: React.ElementType }; isActive: boolean; onClick: () => void;
}) {
  const Icon = tab.icon;
  return (
    <button type="button" onClick={onClick}
      className="relative flex items-center justify-center gap-1.5 rounded-lg px-2 py-2.5 md:px-3 font-semibold"
      style={{
        fontFamily: "var(--font-display)",
        letterSpacing: "0.03em",
        fontSize: "clamp(9px, 2vw, 12px)",
        background: isActive ? "linear-gradient(135deg, rgba(61,139,255,0.18) 0%, rgba(224,64,251,0.18) 100%)" : "transparent",
        color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
        border: isActive ? "1px solid rgba(61,139,255,0.35)" : "1px solid transparent",
        boxShadow: isActive ? "var(--glow-blue)" : "none",
        transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
      }}>
      <Icon className="h-3 w-3 md:h-3.5 md:w-3.5 shrink-0" style={{ color: isActive ? "var(--accent-cyan)" : "currentColor" }} />
      <span className="leading-tight hidden sm:inline">{tab.label}</span>
      <span className="leading-tight sm:hidden">{tab.shortLabel}</span>
    </button>
  );
}

function ActionButton({ children, onClick, disabled, loading, gradient = "var(--grad-danger)" }: {
  children: React.ReactNode; onClick: () => void; disabled?: boolean; loading?: boolean; gradient?: string;
}) {
  return (
    <button type="button" onClick={onClick} disabled={disabled || loading}
      className="glow-btn w-full rounded-xl py-4 font-semibold text-white"
      style={{ background: gradient, fontFamily: "var(--font-display)", letterSpacing: "0.05em" }}>
      <span className="flex items-center justify-center gap-2">
        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Download className="h-5 w-5" />}
        {children}
      </span>
    </button>
  );
}

function UrlInput({ value, onChange, disabled, placeholder = "Paste YouTube link here…", focusColor = "var(--accent-cyan)" }: {
  value: string; onChange: (v: string) => void; disabled: boolean; placeholder?: string; focusColor?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="relative flex items-center rounded-xl transition-all duration-200"
      style={{
        background: "var(--bg-input)",
        border: `1px solid ${focused ? focusColor + "80" : "var(--border-mid)"}`,
        boxShadow: focused ? `0 0 0 3px ${focusColor}18` : "none",
      }}>
      <div className="pointer-events-none absolute left-4 flex h-8 w-8 items-center justify-center rounded-lg"
        style={{ background: "rgba(255,0,0,0.12)" }}>
        <YouTubeIcon className="h-4 w-4 text-red-400" />
      </div>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder} disabled={disabled}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        className="w-full bg-transparent py-4 pl-14 pr-4 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ color: "var(--text-primary)" }} />
    </div>
  );
}

function FileDropzone({ file, isDragging, onDragOver, onDragLeave, onDrop, onClick, inputRef, onChange }: {
  file: File | null; isDragging: boolean;
  onDragOver: (e: React.DragEvent) => void; onDragLeave: () => void; onDrop: (e: React.DragEvent) => void;
  onClick: () => void; inputRef: React.RefObject<HTMLInputElement | null>; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop} onClick={onClick}
      role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && onClick()} aria-label="Upload video file"
      className="relative cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-all duration-300"
      style={{
        borderColor: isDragging ? "var(--accent-cyan)" : file ? "var(--accent-green)" : "var(--border-mid)",
        background: isDragging ? "rgba(0,212,255,0.06)" : file ? "rgba(0,229,160,0.04)" : "var(--bg-input)",
        transform: isDragging ? "scale(1.01)" : "scale(1)",
      }}>
      <input ref={inputRef} type="file" accept="video/mp4,video/avi,video/quicktime,video/x-matroska,.mkv,.avi,.mp4,.mov"
        className="hidden" onChange={onChange} />
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl"
        style={{ background: file ? "rgba(0,229,160,0.15)" : "rgba(61,139,255,0.12)" }}>
        {file ? <FileVideo2 className="h-6 w-6" style={{ color: "var(--accent-green)" }} />
               : <FileUp    className="h-6 w-6" style={{ color: "var(--accent-blue)" }} />}
      </div>
      {file ? (
        <div className="space-y-1">
          <p className="font-semibold break-all px-2" style={{ color: "var(--text-primary)", fontFamily: "var(--font-display)" }}>{file.name}</p>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            {(file.size / 1024 / 1024).toFixed(2)} MB · <span style={{ color: "var(--accent-cyan)", textDecoration: "underline" }}>Click to change file</span>
          </p>
        </div>
      ) : (
        <div className="space-y-1.5">
          <p className="font-semibold" style={{ color: "var(--text-primary)", fontFamily: "var(--font-display)" }}>Upload video file</p>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Drag & drop or click to select</p>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>Supports MP4, AVI, MKV, MOV</p>
        </div>
      )}
    </div>
  );
}

function InfoPill({ icon, label, badge, accentColor = "var(--accent-magenta)" }: {
  icon: React.ReactNode; label: string; badge: string; accentColor?: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl px-4 py-3"
      style={{ border: "1px solid var(--border-mid)", background: "var(--bg-input)" }}>
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg" style={{ background: `${accentColor}18` }}>
        <span style={{ color: accentColor }}>{icon}</span>
      </div>
      <span className="flex-1 text-sm" style={{ color: "var(--text-secondary)" }}>{label}</span>
      <span className="rounded-lg px-2.5 py-1 text-xs font-bold"
        style={{ fontFamily: "var(--font-display)", letterSpacing: "0.04em", background: `${accentColor}18`, color: accentColor, border: `1px solid ${accentColor}30` }}>
        {badge}
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════ */
export function ConverterInput() {
  const [activeTab, setActiveTab] = useState<TabMode>("yt-mp4");
  
  // YT-MP4 states
  const [ytMp4Url,    setYtMp4Url]    = useState("");
  const [ytMp4Res,    setYtMp4Res]    = useState("720");
  const [ytMp4Status, setYtMp4Status] = useState<Status>("idle");
  const [ytMp4Error,  setYtMp4Error]  = useState("");
  const [ytMp4Progress, setYtMp4Progress] = useState(0);
  
  // YT-MP3 states
  const [ytMp3Url,    setYtMp3Url]    = useState("");
  const [ytMp3Status, setYtMp3Status] = useState<Status>("idle");
  const [ytMp3Error,  setYtMp3Error]  = useState("");
  const [ytMp3Progress, setYtMp3Progress] = useState(0);
  
  // Local-MP3 states
  const [localFile,   setLocalFile]   = useState<File | null>(null);
  const [localStatus, setLocalStatus] = useState<Status>("idle");
  const [localError,  setLocalError]  = useState("");
  const [localProgress, setLocalProgress] = useState(0);
  
  const [isDragging,  setIsDragging]  = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const tabs = [
    { id: "yt-mp4"    as TabMode, label: "YouTube → MP4", shortLabel: "YT → MP4",    icon: Download },
    { id: "local-mp3" as TabMode, label: "Local → MP3",   shortLabel: "Local → MP3", icon: FileUp   },
    { id: "yt-mp3"    as TabMode, label: "YouTube → MP3", shortLabel: "YT → MP3",    icon: Music    },
  ];

  const isYouTubeUrl = (url: string) =>
    /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)/.test(url.trim());

  const resetStatus = (tab: TabMode) => {
    if (tab === "yt-mp4") {
      setYtMp4Status("idle");
      setYtMp4Error("");
      setYtMp4Progress(0);
    }
    if (tab === "yt-mp3") {
      setYtMp3Status("idle");
      setYtMp3Error("");
      setYtMp3Progress(0);
    }
    if (tab === "local-mp3") {
      setLocalStatus("idle");
      setLocalError("");
      setLocalProgress(0);
    }
  };

  const handleSwitchTab = (tab: TabMode) => { 
    setActiveTab(tab); 
    resetStatus(tab); 
  };

  function triggerDownload(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // Generic polling function
  const startPolling = (
    jobId: string,
    setProgress: (p: number) => void,
    setStatus: (s: Status) => void,
    setError: (e: string) => void,
  ) => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`${API_URL}/convert/status/${jobId}`);
        const data = await res.json();
        
        setProgress(data.progress);
        
        if (data.status === "completed") {
          clearInterval(interval);
          
          // Download file
          const downloadRes = await fetch(`${API_URL}/convert/download/${jobId}`);
          const blob = await downloadRes.blob();
          const filename = data.filename || `mymevert-${Date.now()}.mp4`;
          
          triggerDownload(blob, filename);
          setStatus("success");
          setProgress(100);
          
        } else if (data.status === "error") {
          clearInterval(interval);
          setStatus("error");
          setError(data.error || "Conversion failed");
        }
      } catch (err) {
        console.error("Polling error:", err);
      }
    }, 1000);
    
    // Timeout after 5 minutes
    setTimeout(() => {
      clearInterval(interval);
      setStatus("error");
      setError("Conversion timeout. Please try again.");
    }, 300000);
  };

  // ============= YT-MP4 with Polling =============
  async function handleYtMp4() {
    if (!ytMp4Url.trim()) { setYtMp4Status("error"); setYtMp4Error("YouTube link cannot be empty."); return; }
    if (!isYouTubeUrl(ytMp4Url)) { setYtMp4Status("error"); setYtMp4Error("Invalid link."); return; }
    
    setYtMp4Status("loading"); 
    setYtMp4Error(""); 
    setYtMp4Progress(0);
    
    try {
      const res = await fetch(`${API_URL}/convert/yt-mp4/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: ytMp4Url, resolution: ytMp4Res })
      });
      
      if (!res.ok) throw new Error("Failed to start conversion");
      
      const { job_id } = await res.json();      
      startPolling(job_id, setYtMp4Progress, setYtMp4Status, setYtMp4Error);
      
    } catch (err: unknown) {
      setYtMp4Status("error");
      setYtMp4Error(err instanceof Error ? err.message : "An error occurred");
    }
  }

  // ============= YT-MP3 with Polling =============
  async function handleYtMp3() {
    if (!ytMp3Url.trim()) { setYtMp3Status("error"); setYtMp3Error("YouTube link cannot be empty."); return; }
    if (!isYouTubeUrl(ytMp3Url)) { setYtMp3Status("error"); setYtMp3Error("Invalid link."); return; }
    
    setYtMp3Status("loading"); 
    setYtMp3Error(""); 
    setYtMp3Progress(0);
    
    try {
      const res = await fetch(`${API_URL}/convert/yt-mp3/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: ytMp3Url })
      });
      
      if (!res.ok) throw new Error("Failed to start conversion");
      
      const { job_id } = await res.json();      
      startPolling(job_id, setYtMp3Progress, setYtMp3Status, setYtMp3Error);
      
    } catch (err: unknown) {
      setYtMp3Status("error");
      setYtMp3Error(err instanceof Error ? err.message : "An error occurred");
    }
  }

  // ============= Local-MP3 with Polling =============
  async function handleLocalMp3() {
    if (!localFile) { 
      setLocalStatus("error"); 
      setLocalError("Please select a video file first."); 
      return; 
    }
    
    setLocalStatus("loading"); 
    setLocalError(""); 
    setLocalProgress(0);
    
    try {
      const form = new FormData();
      form.append("file", localFile);
      
      const res = await fetch(`${API_URL}/convert/local-mp3/start`, {
        method: "POST",
        body: form
      });
      
      if (!res.ok) throw new Error("Failed to start conversion");
      
      const { job_id } = await res.json();      
      startPolling(job_id, setLocalProgress, setLocalStatus, setLocalError);
      
    } catch (err: unknown) {
      setLocalStatus("error");
      setLocalError(err instanceof Error ? err.message : "An error occurred");
    }
  }

  const resOptions = [
    { value: "1080", label: "1080p Full HD" },
    { value: "720",  label: "720p HD" },
    { value: "480",  label: "480p" },
    { value: "360",  label: "360p" },
  ];

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="grad-border glass-card corner-bracket rounded-2xl p-6 md:p-8 lg:p-10"
        style={{ boxShadow: "var(--shadow-elevated)" }}>

        {/* Header */}
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <span className="badge" style={{ background: "rgba(0,212,255,0.10)", border: "1px solid rgba(0,212,255,0.25)", color: "var(--accent-cyan)" }}>
            ⚡ Free Converter
          </span>
          <h3 className="text-2xl font-bold md:text-3xl" style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}>
            Convert Your Media
          </h3>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Download videos or extract audio in seconds.</p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="grid grid-cols-3 gap-2 rounded-xl p-1.5" style={{ background: "var(--bg-elevated)" }}>
            {tabs.map((tab) => (
              <TabButton key={tab.id} tab={tab} isActive={activeTab === tab.id} onClick={() => handleSwitchTab(tab.id)} />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="relative min-h-60">

          {/* TAB 1: YouTube → MP4 */}
          <div className="space-y-4" style={{
            opacity: activeTab === "yt-mp4" ? 1 : 0,
            pointerEvents: activeTab === "yt-mp4" ? "auto" : "none",
            position: activeTab === "yt-mp4" ? "relative" : "absolute",
            inset: 0,
            transform: activeTab === "yt-mp4" ? "translateY(0)" : "translateY(6px)",
            transition: "opacity 0.25s ease, transform 0.25s ease",
          }}>
            {ytMp4Status !== "loading" && (
              <>
                <UrlInput value={ytMp4Url} onChange={(v) => { setYtMp4Url(v); resetStatus("yt-mp4"); }} disabled={false} />
                <div className="grid gap-3 md:grid-cols-2">
                  <Select value={ytMp4Res} onValueChange={(v) => setYtMp4Res(v)}>
                    <SelectTrigger className="w-full h-12.5 rounded-xl px-4 text-sm"
                      style={{ background: "var(--bg-input)", border: "1px solid var(--border-mid)", color: "var(--text-primary)", fontFamily: "var(--font-display)" }}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl" style={{ background: "var(--bg-base)", border: "1px solid var(--border-mid)" }}>
                      {resOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value} style={{ color: "var(--text-primary)", fontFamily: "var(--font-display)" }}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex items-center gap-3 rounded-xl px-4 py-3"
                    style={{ background: "var(--bg-input)", border: "1px solid var(--border-mid)" }}>
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg" style={{ background: "rgba(255,77,143,0.15)" }}>
                      <Tv2 className="h-4 w-4" style={{ color: "var(--accent-pink)" }} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: "var(--text-primary)", fontFamily: "var(--font-display)" }}>MP4 Format</p>
                      <p className="text-xs" style={{ color: "var(--text-secondary)" }}>HD Quality</p>
                    </div>
                  </div>
                </div>
              </>
            )}
            <StatusBanner status={ytMp4Status} progress={ytMp4Progress} error={ytMp4Error} onClose={() => { setYtMp4Status("idle"); setYtMp4Error(""); }} showProgress />
            <ActionButton onClick={handleYtMp4} loading={ytMp4Status === "loading"} disabled={ytMp4Status === "loading"} gradient="var(--grad-danger)">
              Download MP4
            </ActionButton>
          </div>

          {/* TAB 2: Local → MP3 */}
          <div className="space-y-4" style={{
            opacity: activeTab === "local-mp3" ? 1 : 0,
            pointerEvents: activeTab === "local-mp3" ? "auto" : "none",
            position: activeTab === "local-mp3" ? "relative" : "absolute",
            inset: 0,
            transform: activeTab === "local-mp3" ? "translateY(0)" : "translateY(6px)",
            transition: "opacity 0.25s ease, transform 0.25s ease",
          }}>
            <FileDropzone file={localFile} isDragging={isDragging}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => { e.preventDefault(); setIsDragging(false); const f = e.dataTransfer.files[0]; if (f) { setLocalFile(f); resetStatus("local-mp3"); } }}
              onClick={() => fileInputRef.current?.click()}
              inputRef={fileInputRef}
              onChange={(e) => { const f = e.target.files?.[0]; if (f) { setLocalFile(f); resetStatus("local-mp3"); } }}
            />
            <InfoPill icon={<Music className="h-5 w-5" />} label="Video will be converted to high-quality MP3 audio" badge="MP3" accentColor="var(--accent-magenta)" />
            <StatusBanner status={localStatus} progress={localProgress} error={localError} onClose={() => { setLocalStatus("idle"); setLocalError(""); }} showProgress />
            <ActionButton onClick={handleLocalMp3} loading={localStatus === "loading"} disabled={localStatus === "loading" || !localFile} gradient="var(--grad-cyan)">
              Convert to MP3
            </ActionButton>
          </div>

          {/* TAB 3: YouTube → MP3 */}
          <div className="space-y-4" style={{
            opacity: activeTab === "yt-mp3" ? 1 : 0,
            pointerEvents: activeTab === "yt-mp3" ? "auto" : "none",
            position: activeTab === "yt-mp3" ? "relative" : "absolute",
            inset: 0,
            transform: activeTab === "yt-mp3" ? "translateY(0)" : "translateY(6px)",
            transition: "opacity 0.25s ease, transform 0.25s ease",
          }}>
            {ytMp3Status !== "loading" && (
              <UrlInput value={ytMp3Url} onChange={(v) => { setYtMp3Url(v); resetStatus("yt-mp3"); }} disabled={false} focusColor="var(--accent-magenta)" />
            )}
            <InfoPill icon={<Music className="h-5 w-5" />} label="High-quality audio extracted directly from YouTube" badge="MP3 HQ" accentColor="var(--accent-magenta)" />
            <StatusBanner status={ytMp3Status} progress={ytMp3Progress} error={ytMp3Error} onClose={() => { setYtMp3Status("idle"); setYtMp3Error(""); }} showProgress />
            <ActionButton onClick={handleYtMp3} loading={ytMp3Status === "loading"} disabled={ytMp3Status === "loading"} gradient="var(--grad-primary)">
              Download MP3
            </ActionButton>
          </div>

        </div>
      </div>
    </div>
  );
}