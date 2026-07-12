"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article" | "li";
};

const variants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0 },
  },
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
  as = "div",
}: Props) {
  const MotionTag = motion[as as "div"];

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      // Low amount threshold so it reveals quickly on mobile (avoids staying
      // opacity:0 / pointer-events:none if the element barely enters viewport)
      viewport={{ once: true, amount: 0.05, margin: "0px 0px -40px 0px" }}
      custom={delay}
      transition={{ delay }}
      // Ensure the element is always interactive even during animation
      style={{ pointerEvents: "auto" }}
    >
      {children}
    </MotionTag>
  );
}
