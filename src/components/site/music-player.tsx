"use client";

import { useEffect, useRef, useState } from "react";
import { Music, Volume2, VolumeX, Play, Pause } from "lucide-react";
import { useI18n } from "./i18n";

/**
 * Luxury hotel-style ambient music player.
 * Generates smooth, looping lounge/ambient music programmatically using the
 * Web Audio API — no copyright issues, no downloads, infinite seamless loop.
 *
 * Sound design:
 * - Soft sine-wave pad chords (extended jazz/lounge voicings)
 * - Gentle arpeggios shimmering above
 * - Low-pass filtered for warmth
 * - Slow LFO for movement
 * - Muted by default (autoplay policies require user gesture)
 */

// Jazz/lounge chord progression (frequencies in Hz)
// ii–V–I–vi in C: Dm7 → G7 → Cmaj7 → Am7
const CHORDS = [
  // Dm7: D F A C
  [146.83, 174.61, 220.0, 261.63],
  // G7: G B D F
  [196.0, 246.94, 293.66, 349.23],
  // Cmaj7: C E G B
  [130.81, 164.81, 196.0, 246.94],
  // Am7: A C E G
  [110.0, 130.81, 164.81, 196.0],
];
const CHORD_DURATION = 4.0; // seconds per chord
const ARPEGGIO_NOTES = [523.25, 659.25, 783.99, 1046.5]; // C5 E5 G5 C6

export default function MusicPlayer() {
  const { lang } = useI18n();
  const isAr = lang === "ar";
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(0.25);
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
    // Fade in
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
    master.gain.linearRampToValueAtTime(
      muted ? 0 : volume,
      ctx.currentTime + 1.5
    );

    // Low-pass filter for warm tone
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 1800;
    filter.Q.value = 0.7;
    filter.connect(master);

    // Slow LFO on filter cutoff for movement
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 0.08;
    lfoGain.gain.value = 400;
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();

    // Reverb-like delay feedback
    const delay = ctx.createDelay();
    delay.delayTime.value = 0.38;
    const feedback = ctx.createGain();
    feedback.gain.value = 0.35;
    const wetGain = ctx.createGain();
    wetGain.gain.value = 0.4;
    delay.connect(feedback);
    feedback.connect(delay);
    delay.connect(wetGain);
    wetGain.connect(filter);

    const activeNodes: { osc: OscillatorNode; gain: GainNode }[] = [];
    let chordIndex = 0;
    let nextChordTime = ctx.currentTime + 0.1;
    let stopped = false;

    const playPadChord = (freqs: number[], time: number) => {
      freqs.forEach((freq) => {
        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.value = freq;
        // Slight detune for warmth
        osc.detune.value = (Math.random() - 0.5) * 6;

        const g = ctx.createGain();
        g.gain.setValueAtTime(0, time);
        g.gain.linearRampToValueAtTime(0.12, time + 0.8);
        g.gain.linearRampToValueAtTime(0.1, time + CHORD_DURATION - 0.8);
        g.gain.linearRampToValueAtTime(0, time + CHORD_DURATION);

        osc.connect(g);
        g.connect(filter);
        g.connect(delay);
        osc.start(time);
        osc.stop(time + CHORD_DURATION + 0.1);
        activeNodes.push({ osc, gain: g });
      });
    };

    const playArpeggio = (time: number) => {
      const note = ARPEGGIO_NOTES[Math.floor(Math.random() * ARPEGGIO_NOTES.length)];
      const osc = ctx.createOscillator();
      osc.type = "triangle";
      osc.frequency.value = note;

      const g = ctx.createGain();
      g.gain.setValueAtTime(0, time);
      g.gain.linearRampToValueAtTime(0.05, time + 0.05);
      g.gain.exponentialRampToValueAtTime(0.001, time + 1.5);

      osc.connect(g);
      g.connect(delay);
      g.connect(filter);
      osc.start(time);
      osc.stop(time + 1.6);
      activeNodes.push({ osc, gain: g });
    };

    const scheduleLoop = () => {
      if (stopped) return;
      while (nextChordTime < ctx.currentTime + 0.5) {
        playPadChord(CHORDS[chordIndex], nextChordTime);
        // Arpeggio on off-beats
        playArpeggio(nextChordTime + CHORD_DURATION * 0.25);
        playArpeggio(nextChordTime + CHORD_DURATION * 0.75);
        nextChordTime += CHORD_DURATION;
        chordIndex = (chordIndex + 1) % CHORDS.length;
      }
      setTimeout(scheduleLoop, 200);
    };
    scheduleLoop();

    stopFnRef.current = () => {
      stopped = true;
      const now = ctx.currentTime;
      master.gain.cancelScheduledValues(now);
      master.gain.setValueAtTime(master.gain.value, now);
      master.gain.linearRampToValueAtTime(0, now + 0.8);
      try {
        lfo.stop(now + 1);
      } catch {
        // ignore
      }
      setTimeout(() => {
        activeNodes.forEach((n) => {
          try {
            n.osc.stop();
          } catch {
            // already stopped
          }
        });
      }, 1000);
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

  const toggleMute = () => {
    const ctx = ctxRef.current;
    const master = masterGainRef.current;
    if (!ctx || !master) return;
    const newMuted = !muted;
    setMuted(newMuted);
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
    master.gain.linearRampToValueAtTime(
      newMuted ? 0 : volume,
      ctx.currentTime + 0.3
    );
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

      {/* Main control cluster */}
      <div className="flex items-center gap-2">
        {/* Play/Pause button */}
        <button
          onClick={togglePlay}
          aria-label={playing ? "Pause music" : "Play music"}
          className="w-12 h-12 rounded-full bg-neon-pink text-white flex items-center justify-center shadow-[0_0_18px_var(--neon-pink)] hover:scale-110 transition-transform"
        >
          {playing ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
        </button>

        {/* Expand/volume toggle when playing */}
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

      {/* Music label hint */}
      {!playing && (
        <div className="bg-surface/80 backdrop-blur-md border border-edge rounded-lg px-2.5 py-1 flex items-center gap-1.5">
          <Music size={11} className="text-neon-pink" />
          <span className="text-[10px] text-fg/60 mono-tech">
            {isAr ? "موسيقى فاخرة" : "Lounge Music"}
          </span>
        </div>
      )}
    </div>
  );
}
