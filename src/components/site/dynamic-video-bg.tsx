"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Dynamic video background that cycles through service-themed videos.
 * Each video represents one of Khalid's services:
 * - Hacking & Security
 * - E-commerce & Web Design
 * - Digital Marketing
 * - 3D Modeling & Design
 *
 * Videos auto-cycle every 8 seconds with smooth crossfade transitions.
 * Falls back to MatrixRain-style canvas if videos aren't available yet.
 */

type VideoClip = {
  src: string;
  label: { ar: string; en: string };
  color: string;
};

const VIDEO_CLIPS: VideoClip[] = [
  {
    src: "/bg-hacking.mp4",
    label: { ar: "اختبار اختراق وحماية", en: "Penetration Testing & Security" },
    color: "#00ffcc",
  },
  {
    src: "/bg-ecommerce.mp4",
    label: { ar: "تصميم متاجر ومواقع", en: "E-Commerce & Web Design" },
    color: "#00a8e8",
  },
  {
    src: "/bg-marketing.mp4",
    label: { ar: "تسويق إلكتروني", en: "Digital Marketing" },
    color: "#ff00cc",
  },
  {
    src: "/bg-design.mp4",
    label: { ar: "تصميم ومونتاج ومودلز", en: "Design & Editing & 3D Models" },
    color: "#00ffcc",
  },
];

const CYCLE_MS = 8000; // 8 seconds per clip

export default function DynamicVideoBackground() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasVideos, setHasVideos] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Check if at least one video is available
  useEffect(() => {
    const check = async () => {
      try {
        const res = await fetch("/bg-hacking.mp4", { method: "HEAD" });
        setHasVideos(res.ok);
      } catch {
        setHasVideos(false);
      }
    };
    check();
  }, []);

  // Cycle through videos
  useEffect(() => {
    if (!hasVideos) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % VIDEO_CLIPS.length);
    }, CYCLE_MS);
    return () => clearInterval(interval);
  }, [hasVideos]);

  // Play the current video, pause others
  useEffect(() => {
    if (!hasVideos) return;
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === currentIndex) {
        v.play().catch(() => {});
      } else {
        v.pause();
        v.currentTime = 0;
      }
    });
  }, [currentIndex, hasVideos]);

  // Fallback: Matrix rain canvas (if videos not yet available)
  useEffect(() => {
    if (hasVideos) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const glyphs = "01أبتثجحخدذرزسشصضطظعغفقكلمنهوي0123456789<>/{}[]#$%";
    const chars = glyphs.split("");
    let columns = 0;
    let drops: number[] = [];
    let fontSize = 16;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      fontSize = window.innerWidth < 768 ? 14 : 16;
      columns = Math.floor(canvas.width / fontSize);
      drops = Array(columns).fill(0).map(() => Math.random() * -100);
    };
    resize();
    window.addEventListener("resize", resize);

    let rafId: number;
    const draw = () => {
      rafId = requestAnimationFrame(draw);
      ctx.fillStyle = "rgba(5, 8, 15, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px "Share Tech Mono", monospace`;
      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        if (Math.random() > 0.975) ctx.fillStyle = "rgba(220,255,240,0.8)";
        else ctx.fillStyle = `rgba(0,255,204,${Math.random() * 0.55})`;
        ctx.fillText(char, x, y);
        if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };
    draw();
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, [hasVideos]);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      {/* Dark base background */}
      <div className="absolute inset-0 bg-[#05080f]" />

      {/* Matrix rain fallback */}
      {!hasVideos && (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 opacity-50"
        />
      )}

      {/* Video layers */}
      {hasVideos &&
        VIDEO_CLIPS.map((clip, i) => (
          <video
            key={clip.src}
            ref={(el) => {
              videoRefs.current[i] = el;
            }}
            src={clip.src}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1500 ${
              i === currentIndex ? "opacity-30" : "opacity-0"
            }`}
            loop
            muted
            playsInline
            preload="auto"
          />
        ))}

      {/* Dark overlay for readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(rgba(5,8,15,0.75), rgba(5,8,15,0.85)), radial-gradient(circle at 50% 30%, rgba(0,168,232,0.06), transparent 60%)",
        }}
      />

      {/* Current service label (bottom-left, subtle) */}
      {hasVideos && (
        <div className="absolute bottom-20 right-6 z-10">
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm border transition-all duration-500"
            style={{ borderColor: `${VIDEO_CLIPS[currentIndex].color}40` }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{
                backgroundColor: VIDEO_CLIPS[currentIndex].color,
                boxShadow: `0 0 8px ${VIDEO_CLIPS[currentIndex].color}`,
              }}
            />
            <span
              className="text-[10px] font-bold mono-tech"
              style={{ color: VIDEO_CLIPS[currentIndex].color }}
            >
              {VIDEO_CLIPS[currentIndex].label.ar}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
