"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  text: string;
  className?: string;
  /** Trigger typing when element enters viewport */
  trigger?: boolean;
  /** Typing speed in ms per character */
  speed?: number;
  /** Show a blinking cursor after typing completes */
  cursor?: boolean;
  /** Prefix shown before the typed text (e.g., "$ ", "> ") */
  prefix?: string;
  as?: "h2" | "h3" | "h4" | "p" | "span";
};

/**
 * Hacker-style terminal typing animation.
 * Types out text character-by-character with a blinking cursor.
 * Triggers when scrolled into view (once).
 */
export default function TypedHeading({
  text,
  className = "",
  trigger = true,
  speed = 35,
  cursor = true,
  prefix = "",
  as: Tag = "h2",
}: Props) {
  const [display, setDisplay] = useState("");
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const indexRef = useRef(0);

  // Start typing when element enters viewport
  useEffect(() => {
    if (!trigger || started) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStarted(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [trigger, started]);

  // Type character by character
  useEffect(() => {
    if (!started) return;

    let timeout: ReturnType<typeof setTimeout>;
    const tick = () => {
      if (indexRef.current <= text.length) {
        setDisplay(text.substring(0, indexRef.current));
        indexRef.current += 1;
        timeout = setTimeout(tick, speed);
      } else {
        setDone(true);
      }
    };

    timeout = setTimeout(tick, 150);
    return () => clearTimeout(timeout);
  }, [started, text, speed]);

  return (
    <Tag
      ref={ref as any}
      className={`typed-heading ${className}`}
      data-cursor={cursor && done ? "on" : "off"}
    >
      {prefix && <span className="opacity-60">{prefix}</span>}
      <span>{display}</span>
      {cursor && !done && (
        <span className="typed-cursor">▋</span>
      )}
      <style jsx>{`
        .typed-cursor {
          display: inline-block;
          margin-inline-start: 2px;
          color: var(--neon-green);
          animation: blink-cursor 0.9s step-end infinite;
        }
        @keyframes blink-cursor {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </Tag>
  );
}
