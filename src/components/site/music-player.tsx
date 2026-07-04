"use client";

import { useEffect, useRef, useState } from "react";
import { Music, Volume2, VolumeX, Play, Pause, X } from "lucide-react";
import { useI18n } from "./i18n";

/**
 * Chill reggae/lounge music player — Bob Marley + Michael Bublé vibe.
 * Generates relaxed, warm, groovy music programmatically using the Web Audio
 * API — no copyright issues, no downloads, infinite seamless loop.
 *
 * Sound design (chill / laid-back vibe):
 * - Warm guitar-like chords (slow strums, triangle waves with vibrato)
 * - Soft walking bass line (root → fifth → octave)
 * - Gentle reggae-style off-beat skank
 * - Slow tempo (~70 BPM) for relaxation
 * - Reverb + low-pass for warm, mellow tone
 * - Major key (C major) for uplifting-yet-calm feeling
 */

// Chill reggae/lounge progression in C major
// I → vi → IV → V  (C → Am → F → G) — classic laid-back feel
const CHORDS = [
  // C major: C E G
  { root: 65.41, fifth: 98.0, notes: [261.63, 329.63, 392.0] },
  // A minor: A C E
  { root: 55.0, fifth: 82.41, notes: [220.0, 261.63, 329.63] },
  // F major: F A C
  { root: 43.65, fifth: 65.41, notes: [174.61, 220.0, 261.63] },
  // G major: G B D
  { root: 49.0, fifth: 73.42, notes: [196.0, 246.94, 293.66] },
];
const BPM = 72; // slow, relaxed
const BEAT = 60 / BPM; // ~0.83s per beat
const BAR = BEAT * 4; // ~3.33s per bar

export default function MusicPlayer() {
  const { lang } = useI18n();
  const isAr = lang === "ar";
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.32);
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
    // Smooth fade in (relaxed)
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
    master.gain.linearRampToValueAtTime(muted ? 0 : volume, ctx.currentTime + 1.2);

    // Warm low-pass filter (mellow tone)
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 2200;
    filter.Q.value = 0.4;
    filter.connect(master);

    // Reverb-ish delay (warm space)
    const delay = ctx.createDelay();
    delay.delayTime.value = BEAT * 1.5;
    const feedback = ctx.createGain();
    feedback.gain.value = 0.28;
    const wetGain = ctx.createGain();
    wetGain.gain.value = 0.35;
    delay.connect(feedback);
    feedback.connect(delay);
    delay.connect(wetGain);
    wetGain.connect(filter);

    const activeNodes: { osc: OscillatorNode; gain: GainNode }[] = [];
    let chordIndex = 0;
    let nextBarTime = ctx.currentTime + 0.1;
    let stopped = false;

    // === WARM GUITAR CHORD STRUMS (slow, mellow) ===
    const playGuitarChord = (notes: number[], time: number) => {
      // Strum: notes triggered slightly after each other (like a real strum)
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        osc.type = "triangle";
        osc.frequency.value = freq;
        // Gentle vibrato for warmth
        const vibrato = ctx.createOscillator();
        const vibratoGain = ctx.createGain();
        vibrato.frequency.value = 4.5;
        vibratoGain.gain.value = 2;
        vibrato.connect(vibratoGain);
        vibratoGain.connect(osc.detune);
        vibrato.start(time);
        vibrato.stop(time + BAR + 0.2);

        const noteStart = time + i * 0.04; // strum delay
        const g = ctx.createGain();
        g.gain.setValueAtTime(0, noteStart);
        g.gain.linearRampToValueAtTime(0.09, noteStart + 0.03);
        g.gain.exponentialRampToValueAtTime(0.001, noteStart + BAR * 0.9);

        osc.connect(g);
        g.connect(filter);
        g.connect(delay);
        osc.start(noteStart);
        osc.stop(noteStart + BAR);
        activeNodes.push({ osc, gain: g });
      });
    };

    // === SOFT WALKING BASS (root → fifth → octave) ===
    const playBass = (root: number, fifth: number, time: number) => {
      const playBassNote = (freq: number, t: number, dur: number) => {
        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.value = freq;
        const g = ctx.createGain();
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(0.22, t + 0.05);
        g.gain.setValueAtTime(0.22, t + dur - 0.1);
        g.gain.exponentialRampToValueAtTime(0.001, t + dur);
        osc.connect(g);
        g.connect(master);
        osc.start(t);
        osc.stop(t + dur + 0.05);
        activeNodes.push({ osc, gain: g });
      };
      // Root on beat 1, fifth on beat 2, root on beat 3, octave on beat 4
      playBassNote(root, time, BEAT * 0.9);
      playBassNote(fifth, time + BEAT, BEAT * 0.9);
      playBassNote(root, time + BEAT * 2, BEAT * 0.9);
      playBassNote(root * 2, time + BEAT * 3, BEAT * 0.9);
    };

    // === REGGAE SKANK (off-beat chord stabs) ===
    const playSkank = (notes: number[], time: number) => {
      notes.forEach((freq) => {
        const osc = ctx.createOscillator();
        osc.type = "triangle";
        osc.frequency.value = freq * 2; // up an octave for brightness
        const g = ctx.createGain();
        g.gain.setValueAtTime(0, time);
        g.gain.linearRampToValueAtTime(0.05, time + 0.01);
        g.gain.exponentialRampToValueAtTime(0.001, time + 0.18);
        const hp = ctx.createBiquadFilter();
        hp.type = "highpass";
        hp.frequency.value = 800;
        osc.connect(hp);
        hp.connect(g);
        g.connect(filter);
        g.connect(delay);
        osc.start(time);
        osc.stop(time + 0.2);
        activeNodes.push({ osc, gain: g });
      });
    };

    // === GENTLE MELODY (sparse, relaxing) ===
    const playMelody = (time: number) => {
      const chord = CHORDS[chordIndex];
      // Pick a chord tone, up an octave
      const note = chord.notes[Math.floor(Math.random() * chord.notes.length)] * 2;
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = note;
      // Slow vibrato
      const vibrato = ctx.createOscillator();
      const vibratoGain = ctx.createGain();
      vibrato.frequency.value = 5;
      vibratoGain.gain.value = 3;
      vibrato.connect(vibratoGain);
      vibratoGain.connect(osc.detune);
      vibrato.start(time);
      vibrato.stop(time + 1.5);

      const g = ctx.createGain();
      g.gain.setValueAtTime(0, time);
      g.gain.linearRampToValueAtTime(0.08, time + 0.1);
      g.gain.exponentialRampToValueAtTime(0.001, time + 1.2);
      osc.connect(g);
      g.connect(delay);
      g.connect(filter);
      osc.start(time);
      osc.stop(time + 1.3);
      activeNodes.push({ osc, gain: g });
    };

    // === MAIN SCHEDULER ===
    const scheduleBar = () => {
      if (stopped) return;
      while (nextBarTime < ctx.currentTime + 0.3) {
        const chord = CHORDS[chordIndex];
        // Warm guitar chord strum at start of bar
        playGuitarChord(chord.notes, nextBarTime);
        // Walking bass line (root-fifth-root-octave)
        playBass(chord.root, chord.fifth, nextBarTime);
        // Reggae skank on beats 2 and 4 (off-beats)
        playSkank(chord.notes, nextBarTime + BEAT * 1.5);
        playSkank(chord.notes, nextBarTime + BEAT * 3.5);
        // Sparse melody on beat 3 (occasionally)
        if (Math.random() > 0.4) {
          playMelody(nextBarTime + BEAT * 2);
        }

        nextBarTime += BAR;
        chordIndex = (chordIndex + 1) % CHORDS.length;
      }
      setTimeout(scheduleBar, 120);
    };
    scheduleBar();

    stopFnRef.current = () => {
      stopped = true;
      const now = ctx.currentTime;
      master.gain.cancelScheduledValues(now);
      master.gain.setValueAtTime(master.gain.value, now);
      master.gain.linearRampToValueAtTime(0, now + 0.6);
      setTimeout(() => {
        activeNodes.forEach((n) => {
          try {
            n.osc.stop();
          } catch {
            // already stopped
          }
        });
      }, 700);
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
    master.gain.linearRampToValueAtTime(newMuted ? 0 : volume, ctx.currentTime + 0.3);
  };

  const handleVolume = (v: number) => {
    setVolume(v);
    const ctx = ctxRef.current;
    const master = masterGainRef.current;
    if (!ctx || !master) return;
    if (!muted) {
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
      master.gain.linearRampToValueAtTime(v, ctx.currentTime + 0.2);
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

    tryStart();

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
            max="0.6"
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
            {isAr ? "موسيقى رايقة" : "CHILL VIBES"}
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
            {isAr ? "موسيقى رايقة" : "Chill Vibes"}
          </span>
        </div>
      )}
    </div>
  );
}
