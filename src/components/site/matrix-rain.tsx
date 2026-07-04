"use client";

import { useEffect, useRef } from "react";

/**
 * Matrix-style animated code rain background.
 * Renders on a fixed full-screen canvas behind all content (z -50).
 */
export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Mix of Arabic, Latin, and cyber glyphs for a richer rain
    const glyphs =
      "01أبتثجحخدذرزسشصضطظعغفقكلمنهويابت0123456789<>/{}[]#$%&*+=!؟01";
    const chars = glyphs.split("");

    let columns = 0;
    let drops: number[] = [];
    let fontSize = 16;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      fontSize = window.innerWidth < 768 ? 14 : 16;
      columns = Math.floor(canvas.width / fontSize);
      drops = Array(columns)
        .fill(0)
        .map(() => Math.random() * -100);
    };

    resize();
    window.addEventListener("resize", resize);

    let frame = 0;
    let rafId: number;

    const draw = () => {
      rafId = requestAnimationFrame(draw);
      frame++;

      // Trail fade — lower alpha = longer trails
      ctx.fillStyle = "rgba(5, 8, 15, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px "Share Tech Mono", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Leading glyph is brighter (white-green), trailing ones fade to green
        const opacity = Math.random();
        if (Math.random() > 0.975) {
          ctx.fillStyle = `rgba(220, 255, 240, ${opacity})`;
        } else {
          ctx.fillStyle = `rgba(0, 255, 204, ${opacity * 0.55})`;
        }
        ctx.fillText(char, x, y);

        // Reset drop to top randomly after it passes bottom
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none opacity-60"
    />
  );
}
