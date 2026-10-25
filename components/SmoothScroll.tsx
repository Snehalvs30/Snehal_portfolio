"use client";

import { useEffect, type ReactNode } from "react";
import { MotionConfig, useReducedMotion } from "motion/react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

// Shared handle to the Lenis instance so NavLink can use it.
// It stays null when the visitor prefers reduced motion.
export const lenisRef: { current: Lenis | null } = { current: null };

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return; // no smooth scrolling for reduced-motion users
    // const lenis = new Lenis({ autoRaf: true, lerp: 0.1 });
        // lerp: lower = smoother and a little floatier (0.1 was the default feel)
    const lenis = new Lenis({ autoRaf: true, lerp: 0.075, smoothWheel: true, wheelMultiplier: 0.9 });
    lenisRef.current = lenis;
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduceMotion]);

  // reducedMotion="user" makes every Motion animation respect the OS setting.
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
