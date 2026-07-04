"use client";

import { useEffect, useRef, useState } from "react";
import {
  Music,
  Volume2,
  VolumeX,
  Play,
  Pause,
  X,
  SkipForward,
  SkipBack,
} from "lucide-react";
import { useI18n } from "./i18n";

/**
 * R&B chill playlist player — royalty-free instrumental ballads.
 * Uses HTML5 audio with a playlist of Loyalty Freak Music tracks
 * (CC-BY / public domain — no copyright issues).
 *
 * Vibe: late-90s R&B/pop ballad instrumentals — relaxed, melodic,
 * similar feeling to Backstreet Boys slow songs (but instrumental).
 *
 * Features:
 * - Autoplay on first user interaction (browser policy)
 * - Playlist with skip next/previous
 * - Prominent red stop button
 * - Volume control with slider
 * - Animated "R&B VIBES" equalizer badge
 * - Bilingual (AR/EN)
 */

type Track = {
  src: string;
  titleAr: string;
  titleEn: string;
};

const PLAYLIST: Track[] = [
  {
    src: "/chill-song.mp3",
    titleAr: "Sensual Melancholia",
    titleEn: "Sensual Melancholia",
  },
  {
    src: "/chill-song-2.mp3",
    titleAr: "The Candle",
    titleEn: "The Candle",
  },
];

export default function MusicPlayer() {
  const { lang } = useI18n();
  const isAr = lang === "ar";
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.45);
  const [expanded, setExpanded] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio(PLAYLIST[0].src);
    audio.loop = false; // auto-advance via onEnded
    audio.preload = "auto";
    audio.volume = volume;
    audioRef.current = audio;

    const onEnded = () => {
      // Auto-advance to next track
      setTrackIndex((prev) => {
        const next = (prev + 1) % PLAYLIST.length;
        const a = audioRef.current;
        if (a) {
          a.src = PLAYLIST[next].src;
          a.play().catch(() => {});
        }
        return next;
      });
    };
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.pause();
      audio.src = "";
      audio.removeEventListener("ended", onEnded);
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

  const skipTo = (delta: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    const next = (trackIndex + delta + PLAYLIST.length) % PLAYLIST.length;
    setTrackIndex(next);
    audio.src = PLAYLIST[next].src;
    if (playing) {
      audio.play().catch(() => setPlaying(false));
    }
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

    tryStart();

    document.addEventListener("click", tryStart, { once: true });
    document.addEventListener("keydown", tryStart, { once: true });
    document.addEventListener("touchstart", tryStart, { once: true });
    document.addEventListener("scroll", tryStart, { once: true, passive: true });

    return cleanup;
  }, []);

  const currentTrack = PLAYLIST[trackIndex];

  return (
    <div className="fixed bottom-24 left-6 z-[998] flex flex-col items-start gap-2">
      {/* Expanded volume slider */}
      {expanded && playing && (
        <div className="bg-surface/95 backdrop-blur-md border border-neon-blue/40 rounded-xl p-3 shadow-[0_0_20px_rgba(0,168,232,0.2)] mb-1">
          <div className="flex items-center gap-2 mb-2">
            <Volume2 size={14} className="text-neon-blue" />
            <span className="text-[10px] text-fg/60 mono-tech">
              {isAr ? "مستوى الصوت" : "Volume"}
            </span>
            <span className="text-[10px] text-neon-blue mono-tech ml-auto">
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
            className="w-32 accent-[#00a8e8]"
            aria-label="Volume"
          />
        </div>
      )}

      {/* Now-playing badge with track name */}
      {playing && (
        <div className="bg-surface/90 backdrop-blur-md border border-neon-blue/40 rounded-lg px-3 py-1.5 flex items-center gap-2 mb-1 max-w-[220px]">
          <span className="flex items-end gap-0.5 h-3 shrink-0">
            <span
              className="w-0.5 bg-neon-blue rounded-full"
              style={{
                height: "30%",
                animation: "rb-eq 1s ease-in-out infinite alternate",
              }}
            />
            <span
              className="w-0.5 bg-neon-blue rounded-full"
              style={{
                height: "60%",
                animation: "rb-eq 0.8s ease-in-out 0.15s infinite alternate",
              }}
            />
            <span
              className="w-0.5 bg-neon-blue rounded-full"
              style={{
                height: "45%",
                animation: "rb-eq 1.2s ease-in-out 0.3s infinite alternate",
              }}
            />
          </span>
          <div className="min-w-0">
            <p className="text-[10px] text-neon-blue mono-tech font-bold leading-tight">
              {isAr ? "أغاني R&B رايقة" : "R&B VIBES"}
            </p>
            <p className="text-[9px] text-fg/50 truncate leading-tight">
              {isAr ? currentTrack.titleAr : currentTrack.titleEn}
            </p>
          </div>
          <style>{`
            @keyframes rb-eq { from { transform: scaleY(0.3); } to { transform: scaleY(1); } }
          `}</style>
        </div>
      )}

      {/* Main control cluster */}
      <div className="flex items-center gap-2">
        {/* Previous track */}
        {playing && (
          <button
            onClick={() => skipTo(-1)}
            aria-label="Previous track"
            className="w-9 h-9 rounded-full bg-surface/80 backdrop-blur-md border border-edge text-fg/80 flex items-center justify-center hover:border-neon-blue transition-colors"
          >
            <SkipBack size={14} />
          </button>
        )}

        {/* Play/Pause button (R&B blue) */}
        <button
          onClick={togglePlay}
          aria-label={playing ? "Pause music" : "Play music"}
          className={`w-12 h-12 rounded-full flex items-center justify-center shadow-[0_0_18px_var(--neon-blue)] hover:scale-110 transition-transform ${
            playing
              ? "bg-neon-blue text-white"
              : "bg-neon-blue text-white animate-pulse"
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

        {/* Next track */}
        {playing && (
          <button
            onClick={() => skipTo(1)}
            aria-label="Next track"
            className="w-9 h-9 rounded-full bg-surface/80 backdrop-blur-md border border-edge text-fg/80 flex items-center justify-center hover:border-neon-blue transition-colors"
          >
            <SkipForward size={14} />
          </button>
        )}

        {/* Volume toggle when playing */}
        {playing && (
          <button
            onClick={() => setExpanded((v) => !v)}
            aria-label="Volume controls"
            className="w-9 h-9 rounded-full bg-surface/80 backdrop-blur-md border border-edge text-fg/80 flex items-center justify-center hover:border-neon-blue transition-colors"
          >
            {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
        )}
      </div>

      {/* Idle hint */}
      {!playing && (
        <div className="bg-surface/80 backdrop-blur-md border border-edge rounded-lg px-2.5 py-1 flex items-center gap-1.5">
          <Music size={11} className="text-neon-blue" />
          <span className="text-[10px] text-fg/60 mono-tech">
            {isAr ? "أغاني R&B رايقة" : "R&B Chill Vibes"}
          </span>
        </div>
      )}
    </div>
  );
}
