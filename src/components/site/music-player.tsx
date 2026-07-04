"use client";

import { useEffect, useRef, useState } from "react";
import { Music, Volume2, VolumeX, Play, Pause, X } from "lucide-react";
import { useI18n } from "./i18n";

/**
 * Chill lofi song player — real royalty-free track.
 * Uses an HTML5 audio element with a public-domain lofi chill track
 * downloaded from archive.org (no copyright, no attribution required).
 *
 * Features:
 * - Autoplay on first user interaction (browser policy)
 * - Prominent red stop button
 * - Volume control with slider
 * - Animated "CHILL VIBES" equalizer badge
 * - Bilingual (AR/EN)
 */

export default function MusicPlayer() {
  const { lang } = useI18n();
  const isAr = lang === "ar";
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.45);
  const [expanded, setExpanded] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio("/chill-song.mp3");
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = volume;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const play = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      audio.volume = muted ? 0 : volume;
      await audio.play();
      setPlaying(true);
    } catch {
      // Will retry on next interaction
    }
  };

  const pause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setPlaying(false);
  };

  const togglePlay = async () => {
    if (playing) {
      pause();
    } else {
      await play();
    }
  };

  const stopMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setPlaying(false);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const newMuted = !muted;
    setMuted(newMuted);
    audio.volume = newMuted ? 0 : volume;
  };

  const handleVolume = (v: number) => {
    setVolume(v);
    const audio = audioRef.current;
    if (!audio) return;
    if (!muted) audio.volume = v;
  };

  // === AUTOPLAY on first user interaction (browser policy) ===
  useEffect(() => {
    let started = false;
    const tryStart = async () => {
      if (started) return;
      started = true;
      await play();
      cleanup();
    };

    const cleanup = () => {
      document.removeEventListener("click", tryStart);
      document.removeEventListener("keydown", tryStart);
      document.removeEventListener("touchstart", tryStart);
      document.removeEventListener("scroll", tryStart);
    };

    // Try immediately
    tryStart();

    // Fallback: wait for any real user gesture
    document.addEventListener("click", tryStart, { once: true });
    document.addEventListener("keydown", tryStart, { once: true });
    document.addEventListener("touchstart", tryStart, { once: true });
    document.addEventListener("scroll", tryStart, { once: true, passive: true });

    return cleanup;
  }, []);

  return (
    <div className="fixed bottom-24 left-6 z-[998] flex flex-col items-start gap-2">
      {/* Expanded volume slider */}
      {expanded && playing && (
        <div className="bg-surface/95 backdrop-blur-md border border-neon-green/40 rounded-xl p-3 shadow-[0_0_20px_rgba(0,255,204,0.2)] mb-1">
          <div className="flex items-center gap-2 mb-2">
            <Volume2 size={14} className="text-neon-green" />
            <span className="text-[10px] text-fg/60 mono-tech">
              {isAr ? "مستوى الصوت" : "Volume"}
            </span>
            <span className="text-[10px] text-neon-green mono-tech ml-auto">
              {Math.round(volume * 100)}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => handleVolume(parseFloat(e.target.value))}
            className="w-32 accent-[#00ffcc]"
            aria-label="Volume"
          />
        </div>
      )}

      {/* Now-playing badge (chill vibe) */}
      {playing && (
        <div className="bg-surface/90 backdrop-blur-md border border-neon-green/40 rounded-lg px-3 py-1.5 flex items-center gap-2 mb-1">
          <span className="flex items-end gap-0.5 h-3">
            <span className="w-0.5 bg-neon-green rounded-full" style={{ height: "30%", animation: "chill-eq 1.2s ease-in-out infinite alternate" }} />
            <span className="w-0.5 bg-neon-green rounded-full" style={{ height: "60%", animation: "chill-eq 1s ease-in-out 0.2s infinite alternate" }} />
            <span className="w-0.5 bg-neon-green rounded-full" style={{ height: "45%", animation: "chill-eq 1.4s ease-in-out 0.4s infinite alternate" }} />
            <span className="w-0.5 bg-neon-green rounded-full" style={{ height: "70%", animation: "chill-eq 1.1s ease-in-out 0.1s infinite alternate" }} />
          </span>
          <span className="text-[10px] text-neon-green mono-tech font-bold">
            {isAr ? "أغنية رايقة" : "CHILL SONG"}
          </span>
          <style>{`
            @keyframes chill-eq { from { transform: scaleY(0.3); } to { transform: scaleY(1); } }
          `}</style>
        </div>
      )}

      {/* Main control cluster */}
      <div className="flex items-center gap-2">
        {/* Play/Pause button (chill green) */}
        <button
          onClick={togglePlay}
          aria-label={playing ? "Pause music" : "Play music"}
          className={`w-12 h-12 rounded-full flex items-center justify-center shadow-[0_0_18px_var(--neon-green)] hover:scale-110 transition-transform ${
            playing
              ? "bg-neon-green text-[#05080f]"
              : "bg-neon-green text-[#05080f] animate-pulse"
          }`}
        >
          {playing ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
        </button>

        {/* Stop button (always visible when playing) */}
        {playing && (
          <button
            onClick={stopMusic}
            aria-label="Stop music"
            className="w-10 h-10 rounded-full bg-red-600/90 text-white flex items-center justify-center hover:bg-red-700 hover:scale-110 transition-all shadow-[0_0_15px_rgba(220,38,38,0.6)]"
          >
            <X size={18} />
          </button>
        )}

        {/* Volume toggle when playing */}
        {playing && (
          <button
            onClick={() => setExpanded((v) => !v)}
            aria-label="Volume controls"
            className="w-10 h-10 rounded-full bg-surface/80 backdrop-blur-md border border-edge text-fg/80 flex items-center justify-center hover:border-neon-green transition-colors"
          >
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        )}
      </div>

      {/* Idle hint */}
      {!playing && (
        <div className="bg-surface/80 backdrop-blur-md border border-edge rounded-lg px-2.5 py-1 flex items-center gap-1.5">
          <Music size={11} className="text-neon-green" />
          <span className="text-[10px] text-fg/60 mono-tech">
            {isAr ? "أغنية رايقة" : "Chill Song"}
          </span>
        </div>
      )}
    </div>
  );
}
