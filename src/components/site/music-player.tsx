"use client";

import { useEffect, useRef, useState } from "react";
import { Music, Volume2, VolumeX, Play, Pause, X } from "lucide-react";
import { useI18n } from "./i18n";

/**
 * Upbeat, energetic marketing/cinematic promo music player.
 * Generates driving electronic promo music programmatically using the Web
 * Audio API — no copyright issues, no downloads, infinite seamless loop.
 *
 * Sound design (energetic marketing vibe):
 * - Driving 4-on-the-floor kick + off-beat hi-hats
 * - Pulsing bass line
 * - Bright saw-wave synth chords (suspended → resolved)
 * - Lead arpeggios shimmering above
 * - Side-chain-style pumping for energy
 * - Faster tempo (~120 BPM) for excitement
 */

// Energetic promo chord progression (frequencies in Hz)
// vi–IV–I–V in A minor: Am → F → C → G  (uplifting pop/edm progression)
const CHORDS = [
  // Am: A C E
  { root: 110.0, notes: [220.0, 261.63, 329.63] },
  // F: F A C
  { root: 87.31, notes: [174.61, 220.0, 261.63] },
  // C: C E G
  { root: 130.81, notes: [261.63, 329.63, 392.0] },
  // G: G B D
  { root: 98.0, notes: [196.0, 246.94, 293.66] },
];
const CHORD_DURATION = 2.0; // 2s per chord = 120 BPM (1 bar each)
const BPM = 120;
const BEAT = 60 / BPM; // 0.5s per beat

export default function MusicPlayer() {
  const { lang } = useI18n();
  const isAr = lang === "ar";
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [expanded, setExpanded] = useState(false);

  const ctxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const stopFnRef = useRef<(() => void) | null>(null);

  const ensureCtx = () => {
    if (ctxRef.current) return ctxRef.current;
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    const ctx = new AC();
    ctxRef.current = ctx;

    const masterGain = ctx.createGain();
    masterGain.gain.value = 0;
    masterGain.connect(ctx.destination);
    masterGainRef.current = masterGain;
    return ctx;
  };

  const startMusic = async () => {
    const ctx = ensureCtx();
    if (ctx.state === "suspended") await ctx.resume();

    const master = masterGainRef.current!;
    // Fade in quickly (energetic)
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
    master.gain.linearRampToValueAtTime(muted ? 0 : volume, ctx.currentTime + 0.4);

    // Master compressor for punch
    const compressor = ctx.createDynamicsCompressor();
    compressor.threshold.value = -18;
    compressor.knee.value = 24;
    compressor.ratio.value = 4;
    compressor.attack.value = 0.003;
    compressor.release.value = 0.25;
    compressor.connect(master);

    // High-pass for clarity + low-pass for warmth (band-pass style)
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 6000;
    filter.Q.value = 0.5;
    filter.connect(compressor);

    // Reverb-like delay
    const delay = ctx.createDelay();
    delay.delayTime.value = BEAT * 0.75; // dotted-eighth delay
    const feedback = ctx.createGain();
    feedback.gain.value = 0.3;
    const wetGain = ctx.createGain();
    wetGain.gain.value = 0.25;
    delay.connect(feedback);
    feedback.connect(delay);
    delay.connect(wetGain);
    wetGain.connect(filter);

    const activeNodes: { osc: OscillatorNode; gain: GainNode }[] = [];
    let chordIndex = 0;
    let nextBarTime = ctx.currentTime + 0.05;
    let stopped = false;

    // === KICK DRUM (4-on-the-floor) ===
    const playKick = (time: number) => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(150, time);
      osc.frequency.exponentialRampToValueAtTime(50, time + 0.1);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.6, time);
      g.gain.exponentialRampToValueAtTime(0.001, time + 0.18);
      osc.connect(g);
      g.connect(compressor);
      osc.start(time);
      osc.stop(time + 0.2);
      activeNodes.push({ osc, gain: g });
    };

    // === HI-HAT (off-beats) ===
    const playHat = (time: number) => {
      const bufferSize = ctx.sampleRate * 0.05;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const hp = ctx.createBiquadFilter();
      hp.type = "highpass";
      hp.frequency.value = 7000;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.12, time);
      g.gain.exponentialRampToValueAtTime(0.001, time + 0.04);
      noise.connect(hp);
      hp.connect(g);
      g.connect(filter);
      noise.start(time);
      noise.stop(time + 0.05);
    };

    // === BASS LINE (driving pulse) ===
    const playBass = (freq: number, time: number, duration: number) => {
      const osc = ctx.createOscillator();
      osc.type = "sawtooth";
      osc.frequency.value = freq;
      const lp = ctx.createBiquadFilter();
      lp.type = "lowpass";
      lp.frequency.value = 400;
      lp.Q.value = 2;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0, time);
      g.gain.linearRampToValueAtTime(0.25, time + 0.02);
      g.gain.setValueAtTime(0.25, time + duration - 0.05);
      g.gain.exponentialRampToValueAtTime(0.001, time + duration);
      osc.connect(lp);
      lp.connect(g);
      g.connect(compressor);
      osc.start(time);
      osc.stop(time + duration + 0.05);
      activeNodes.push({ osc, gain: g });
    };

    // === SYNTH CHORDS (bright, saw) ===
    const playChord = (notes: number[], time: number) => {
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        osc.type = "sawtooth";
        osc.frequency.value = freq;
        osc.detune.value = (i - 1) * 8; // slight spread
        const lp = ctx.createBiquadFilter();
        lp.type = "lowpass";
        lp.frequency.setValueAtTime(2000, time);
        lp.frequency.linearRampToValueAtTime(4000, time + 0.3);
        const g = ctx.createGain();
        g.gain.setValueAtTime(0, time);
        g.gain.linearRampToValueAtTime(0.07, time + 0.05);
        g.gain.setValueAtTime(0.07, time + CHORD_DURATION - 0.3);
        g.gain.linearRampToValueAtTime(0, time + CHORD_DURATION);
        osc.connect(lp);
        lp.connect(g);
        g.connect(filter);
        g.connect(delay);
        osc.start(time);
        osc.stop(time + CHORD_DURATION + 0.1);
        activeNodes.push({ osc, gain: g });
      });
    };

    // === LEAD ARPEGGIO (shimmer) ===
    const playLead = (time: number) => {
      const chord = CHORDS[chordIndex];
      const note = chord.notes[Math.floor(Math.random() * chord.notes.length)] * 2;
      const osc = ctx.createOscillator();
      osc.type = "triangle";
      osc.frequency.value = note;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0, time);
      g.gain.linearRampToValueAtTime(0.08, time + 0.01);
      g.gain.exponentialRampToValueAtTime(0.001, time + 0.4);
      osc.connect(g);
      g.connect(delay);
      g.connect(filter);
      osc.start(time);
      osc.stop(time + 0.5);
      activeNodes.push({ osc, gain: g });
    };

    // === MAIN SCHEDULER ===
    const scheduleBar = () => {
      if (stopped) return;
      while (nextBarTime < ctx.currentTime + 0.3) {
        const chord = CHORDS[chordIndex];
        // Kick on every beat (4 per bar)
        for (let b = 0; b < 4; b++) playKick(nextBarTime + b * BEAT);
        // Hi-hats on off-beats (8th notes)
        for (let h = 0; h < 8; h++) playHat(nextBarTime + h * BEAT * 0.5 + BEAT * 0.25);
        // Bass: root on beats 1 and 3, octave on 4
        playBass(chord.root, nextBarTime, BEAT * 2);
        playBass(chord.root * 2, nextBarTime + BEAT * 3, BEAT);
        // Synth chord (whole bar)
        playChord(chord.notes, nextBarTime);
        // Lead arpeggios on beats 2, 3, 4
        playLead(nextBarTime + BEAT);
        playLead(nextBarTime + BEAT * 2);
        playLead(nextBarTime + BEAT * 3);

        nextBarTime += CHORD_DURATION;
        chordIndex = (chordIndex + 1) % CHORDS.length;
      }
      setTimeout(scheduleBar, 100);
    };
    scheduleBar();

    stopFnRef.current = () => {
      stopped = true;
      const now = ctx.currentTime;
      master.gain.cancelScheduledValues(now);
      master.gain.setValueAtTime(master.gain.value, now);
      master.gain.linearRampToValueAtTime(0, now + 0.3);
      setTimeout(() => {
        activeNodes.forEach((n) => {
          try {
            n.osc.stop();
          } catch {
            // already stopped
          }
        });
      }, 400);
    };
  };

  const togglePlay = async () => {
    if (playing) {
      stopFnRef.current?.();
      setPlaying(false);
    } else {
      await startMusic();
      setMuted(false);
      setPlaying(true);
    }
  };

  const stopMusic = () => {
    stopFnRef.current?.();
    setPlaying(false);
  };

  const toggleMute = () => {
    const ctx = ctxRef.current;
    const master = masterGainRef.current;
    if (!ctx || !master) return;
    const newMuted = !muted;
    setMuted(newMuted);
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
    master.gain.linearRampToValueAtTime(newMuted ? 0 : volume, ctx.currentTime + 0.2);
  };

  const handleVolume = (v: number) => {
    setVolume(v);
    const ctx = ctxRef.current;
    const master = masterGainRef.current;
    if (!ctx || !master) return;
    if (!muted) {
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
      master.gain.linearRampToValueAtTime(v, ctx.currentTime + 0.15);
    }
  };

  // === AUTOPLAY on first user interaction (browser policy workaround) ===
  useEffect(() => {
    let started = false;
    const tryStart = async () => {
      if (started) return;
      started = true;
      try {
        await startMusic();
        setPlaying(true);
        setMuted(false);
      } catch {
        // user gesture not yet, retry on next interaction
        started = false;
      }
      cleanup();
    };

    const cleanup = () => {
      document.removeEventListener("click", tryStart);
      document.removeEventListener("keydown", tryStart);
      document.removeEventListener("touchstart", tryStart);
      document.removeEventListener("scroll", tryStart);
    };

    // Try immediately (works if context already resumed)
    tryStart();

    // Fallback: any user gesture
    if (!playing) {
      document.addEventListener("click", tryStart, { once: true });
      document.addEventListener("keydown", tryStart, { once: true });
      document.addEventListener("touchstart", tryStart, { once: true });
      document.addEventListener("scroll", tryStart, { once: true, passive: true });
    }

    return cleanup;
  }, []);

  useEffect(() => {
    return () => {
      stopFnRef.current?.();
      ctxRef.current?.close().catch(() => {});
    };
  }, []);

  return (
    <div className="fixed bottom-24 left-6 z-[998] flex flex-col items-start gap-2">
      {/* Expanded volume slider */}
      {expanded && playing && (
        <div className="bg-surface/95 backdrop-blur-md border border-neon-pink/40 rounded-xl p-3 shadow-[0_0_20px_rgba(255,0,204,0.2)] mb-1">
          <div className="flex items-center gap-2 mb-2">
            <Volume2 size={14} className="text-neon-pink" />
            <span className="text-[10px] text-fg/60 mono-tech">
              {isAr ? "مستوى الصوت" : "Volume"}
            </span>
            <span className="text-[10px] text-neon-pink mono-tech ml-auto">
              {Math.round(volume * 100)}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="0.6"
            step="0.01"
            value={volume}
            onChange={(e) => handleVolume(parseFloat(e.target.value))}
            className="w-32 accent-[#ff00cc]"
            aria-label="Volume"
          />
        </div>
      )}

      {/* Now-playing badge (only when playing) */}
      {playing && (
        <div className="bg-surface/90 backdrop-blur-md border border-neon-pink/40 rounded-lg px-3 py-1.5 flex items-center gap-2 mb-1 animate-pulse">
          <span className="flex items-end gap-0.5 h-3">
            <span className="w-0.5 bg-neon-pink rounded-full" style={{ height: "30%", animation: "eq 0.6s ease-in-out infinite alternate" }} />
            <span className="w-0.5 bg-neon-pink rounded-full" style={{ height: "70%", animation: "eq 0.5s ease-in-out 0.1s infinite alternate" }} />
            <span className="w-0.5 bg-neon-pink rounded-full" style={{ height: "50%", animation: "eq 0.7s ease-in-out 0.2s infinite alternate" }} />
            <span className="w-0.5 bg-neon-pink rounded-full" style={{ height: "90%", animation: "eq 0.4s ease-in-out 0.05s infinite alternate" }} />
          </span>
          <span className="text-[10px] text-neon-pink mono-tech font-bold">
            {isAr ? "موسيقى تسويقية" : "PROMO MUSIC"}
          </span>
          <style>{`
            @keyframes eq { from { transform: scaleY(0.3); } to { transform: scaleY(1); } }
          `}</style>
        </div>
      )}

      {/* Main control cluster */}
      <div className="flex items-center gap-2">
        {/* Play/Pause button */}
        <button
          onClick={togglePlay}
          aria-label={playing ? "Pause music" : "Play music"}
          className={`w-12 h-12 rounded-full flex items-center justify-center shadow-[0_0_18px_var(--neon-pink)] hover:scale-110 transition-transform ${
            playing
              ? "bg-neon-pink text-white"
              : "bg-neon-pink text-white animate-pulse"
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
            className="w-10 h-10 rounded-full bg-surface/80 backdrop-blur-md border border-edge text-fg/80 flex items-center justify-center hover:border-neon-pink transition-colors"
          >
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        )}
      </div>

      {/* Idle hint */}
      {!playing && (
        <div className="bg-surface/80 backdrop-blur-md border border-edge rounded-lg px-2.5 py-1 flex items-center gap-1.5">
          <Music size={11} className="text-neon-pink" />
          <span className="text-[10px] text-fg/60 mono-tech">
            {isAr ? "موسيقى تسويقية" : "Promo Music"}
          </span>
        </div>
      )}
    </div>
  );
}
