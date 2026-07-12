"use client";

import { useEffect, useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

/**
 * Scroll indicators:
 * - Down arrow on hero (scrolls to next section)
 * - Up arrow floating button (appears after scrolling, scrolls to top)
 */
export default function ScrollArrows() {
  const [showUp, setShowUp] = useState(false);
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setAtTop(y < 100);
      setShowUp(y > 400);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToNext = () => {
    // Find the next section after hero (#about is right after #home)
    const about = document.getElementById("about");
    if (about) about.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Hero scroll-down arrow (only at top of page) — pointer-events-none except the button itself */}
      {atTop && (
        <button
          onClick={scrollToNext}
          aria-label="Scroll to next section"
          className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-1 text-neon-green/60 hover:text-neon-green transition-colors animate-bounce pointer-events-auto"
        >
          <span className="text-[10px] mono-tech tracking-widest hidden sm:block">SCROLL</span>
          <ChevronDown size={20} />
        </button>
      )}

      {/* Floating scroll-up button — positioned to avoid overlapping content center */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={`fixed bottom-20 right-6 z-40 w-10 h-10 rounded-full bg-neon-green text-[#05080f] flex items-center justify-center shadow-[0_0_20px_var(--neon-green)] hover:scale-110 transition-all ${
          showUp
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <ChevronUp size={18} />
      </button>
    </>
  );
}
