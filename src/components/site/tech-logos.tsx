"use client";

import { useState } from "react";

/**
 * Tool / platform logos.
 * All SVGs are self-hosted under /public/logos so nothing depends on a
 * third-party CDN (devicon has no ibm/cisco/kali icons — those 404'd before).
 */
export type TechLogo = { name: string; src: string; color: string };

export const TECH_LOGOS: TechLogo[] = [
  // === Credentials & education platforms ===
  { name: "IBM", src: "/logos/ibm.svg", color: "#1f70c1" },
  { name: "Cisco", src: "/logos/cisco.svg", color: "#00bceb" },
  // === Cyber security ===
  { name: "Kali Linux", src: "/logos/kali-linux.svg", color: "#557c94" },
  // === Programming & frameworks ===
  { name: "Python", src: "/logos/python.svg", color: "#ffd845" },
  { name: "Flutter", src: "/logos/flutter.svg", color: "#54c5f8" },
  // === Databases & web ===
  { name: "MySQL", src: "/logos/mysql.svg", color: "#00758f" },
  { name: "WordPress", src: "/logos/wordpress.svg", color: "#21759b" },
  // === Design & media ===
  { name: "Photoshop", src: "/logos/photoshop.svg", color: "#31a8ff" },
  { name: "Premiere Pro", src: "/logos/premierepro.svg", color: "#ea77ff" },
];

/** Platforms without an SVG mark — rendered as branded text chips. */
export const TEXT_PLATFORMS = [
  { name: "Coventry University", color: "#00ffcc" },
  { name: "FutureLearn", color: "#de00a5" },
  { name: "Credly", color: "#ff6c00" },
  { name: "TryHackMe", color: "#88cc14" },
  { name: "CPD UK", color: "#00a8e8" },
  { name: "Alison", color: "#00ffcc" },
];

/**
 * Logo image with a graceful text fallback so a failed request never leaves
 * an empty/broken image box.
 */
export function TechLogoImg({
  logo,
  className = "",
}: {
  logo: TechLogo;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        className="mono-tech text-[10px] font-black leading-tight text-center px-1"
        style={{ color: logo.color }}
      >
        {logo.name}
      </span>
    );
  }

  return (
    <img
      src={logo.src}
      alt={logo.name}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
