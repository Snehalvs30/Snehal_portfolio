"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/*
  Wraps one section of the page so that, as you scroll, the NEXT section rises
  up and slides over this one, while this one shrinks back and darkens slightly.

  How it works: the section is "sticky". A section taller than the screen sticks
  only once its bottom edge reaches the bottom of the screen, so you always see
  all of it before the next one covers it. Everything follows the normal (smooth)
  page scroll, so there is nothing to click.
*/
export default function StackSection({
  children,
  last = false,
}: {
  children: ReactNode;
  last?: boolean; // the final section (Contact) is not covered by anything
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [top, setTop] = useState(0);

  // Stick when the section's bottom meets the bottom of the screen.
  useEffect(() => {
    const el = ref.current;
    if (!el || last) return;
    const update = () => setTop(Math.min(0, window.innerHeight - el.offsetHeight));
    const observer = new ResizeObserver(update); // also runs once right away
    observer.observe(el);
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [last]);

  // 0 → 1 while the next section slides over this one.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["end end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const dim = useTransform(scrollYProgress, [0, 1], [0, 0.45]);
  const animate = !last && !reduceMotion;

  return (
    <div
      ref={ref}
      className={`relative min-h-svh bg-bg ${last ? "" : "sticky"}`}
      style={last ? undefined : { top }}
    >
      <motion.div style={animate ? { scale, transformOrigin: "50% 100%" } : undefined} className="min-h-svh">
        {children}
      </motion.div>
      {animate && (
        <motion.div aria-hidden="true" style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-black" />
      )}
    </div>
  );
}
