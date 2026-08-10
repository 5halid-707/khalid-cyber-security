"use client";

import { cn } from "@/lib/utils";

interface AnimatedLogoProps {
  /**
   * Image source URL. Defaults to the site's main portrait.
   */
  src?: string;
  /**
   * Alt text for the image.
   */
  alt?: string;
  /**
   * Pixel size of the logo (width & height). Default: 36 (matches navbar avatar).
   */
  size?: number;
  /**
   * Visual variant. "navbar" = compact green neon ring. "showcase" = larger with
   * sparkle accents and stronger glow for hero/video sections. "footer" = subtle
   * minimal animation.
   */
  variant?: "navbar" | "showcase" | "footer";
  /**
   * Optional className passthrough.
   */
  className?: string;
}

/**
 * AnimatedLogo
 * ------------
 * Renders Khalid's profile photo inside a circular frame with a layered,
 * professional animation system:
 *
 *  1. **Neon ring** — a conic-gradient ring that rotates around the photo.
 *  2. **3D tilt** — the inner photo gently tilts in 3D space (perspective).
 *  3. **Shine sweep** — a diagonal light beam crosses the photo every ~4s.
 *  4. **Glow breathe** — outer box-shadow pulses between soft & strong neon glow.
 *  5. **Subtle scale pulse** — the whole logo breathes (1.0 → 1.04 → 1.0).
 *  6. **Sparkle accents** (showcase variant only) — small twinkles at corners.
 *
 * All animations respect `prefers-reduced-motion` (disabled in that mode).
 */
export default function AnimatedLogo({
  src = "/khalid-avatar.jpg",
  alt = "Khalid Al-harbi — Cyber Security Expert",
  size = 36,
  variant = "navbar",
  className,
}: AnimatedLogoProps) {
  const isShowcase = variant === "showcase";
  const isFooter = variant === "footer";

  // Outer ring thickness scales with logo size
  const ringPadding = Math.max(2, Math.round(size * 0.08));

  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center",
        "animate-logo-pulse",
        className,
      )}
      style={{ width: size, height: size }}
    >
      {/* Rotating neon conic ring */}
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 rounded-full animate-logo-ring",
          isFooter && "opacity-50",
        )}
        style={{
          padding: ringPadding,
          background:
            "conic-gradient(from 0deg, var(--color-neon-green), var(--color-neon-blue), var(--color-neon-pink), var(--color-neon-green))",
          WebkitMask:
            "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 2px))",
          mask: "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 2px))",
        }}
      />

      {/* Glow halo (breathe) */}
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 rounded-full animate-logo-glow",
          isFooter && "opacity-40",
        )}
        style={{
          background: "transparent",
        }}
      />

      {/* Photo container with 3D tilt + clip */}
      <span
        className={cn(
          "relative overflow-hidden rounded-full animate-logo-tilt",
          "border border-neon-green/40",
        )}
        style={{
          width: size - ringPadding * 2,
          height: size - ringPadding * 2,
        }}
      >
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          draggable={false}
          loading="eager"
        />

        {/* Shine sweep beam (diagonal light crossing the photo) */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 animate-logo-shine"
          style={{
            background:
              "linear-gradient(115deg, transparent 0%, transparent 35%, rgba(255,255,255,0.55) 50%, transparent 65%, transparent 100%)",
            mixBlendMode: "screen",
          }}
        />

        {/* Top gloss highlight for depth */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-1/3"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, transparent 100%)",
          }}
        />
      </span>

      {/* Sparkle accents — only on showcase variant */}
      {isShowcase && (
        <>
          <span
            aria-hidden
            className="pointer-events-none absolute -top-1 -right-1 h-1.5 w-1.5 rounded-full bg-white animate-logo-sparkle"
            style={{ animationDelay: "0s" }}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-1 -left-1 h-1 w-1 rounded-full bg-neon-green animate-logo-sparkle"
            style={{ animationDelay: "1s" }}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute top-1/2 -right-1.5 h-1 w-1 rounded-full bg-neon-blue animate-logo-sparkle"
            style={{ animationDelay: "0.5s" }}
          />
        </>
      )}

      {/* Online status dot — only on navbar variant */}
      {variant === "navbar" && (
        <span
          aria-hidden
          className="absolute bottom-0 left-0 h-2.5 w-2.5 rounded-full bg-neon-green"
          style={{
            border: "2px solid #05080f",
            boxShadow: "0 0 6px var(--color-neon-green)",
          }}
        />
      )}
    </span>
  );
}
