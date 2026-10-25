"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { whatIDo, type Metric } from "@/data/content";
import SectionLabel from "./SectionLabel";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* Turns "I [build] software..." into words; bracketed words are the key words. */
type Token = { text: string; key?: number; space: boolean };
function parseStatement(statement: string): Token[] {
  const tokens: Token[] = [];
  const pattern = /\[([^\]]+)\]|(\S+)|(\s+)/g;
  let match: RegExpExecArray | null;
  let keyIndex = 0;
  let space = false;
  while ((match = pattern.exec(statement))) {
    if (match[3]) {
      space = true;
      continue;
    }
    tokens.push(match[1] ? { text: match[1], key: keyIndex++, space } : { text: match[2], space });
    space = false;
  }
  return tokens;
}

function formatMetric(metric: Metric, value: number) {
  return `${metric.prefix ?? ""}${value.toFixed(metric.decimals ?? 0)}${metric.suffix ?? ""}`;
}

/* Counts from metric.from to metric.to when it appears. */
function CountUp({ metric }: { metric: Metric }) {
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState(metric.from);

  useEffect(() => {
    if (reduceMotion) return;
    const controls = animate(metric.from, metric.to, { duration: 1.1, ease, onUpdate: setValue });
    return () => controls.stop();
  }, [metric, reduceMotion]);

  return (
    <>
      <span aria-hidden="true">{formatMetric(metric, reduceMotion ? metric.to : value)}</span>
      <span className="sr-only">{formatMetric(metric, metric.to)}</span>
    </>
  );
}

export default function WhatIDo() {
  const tokens = useMemo(() => parseStatement(whatIDo.statement), []);
  const sectionRef = useRef<HTMLElement>(null);
  const count = whatIDo.items.length;
  const [active, setActive] = useState(0);

  // The section stays on screen while scrolling moves through Build → Ship → Run.
  // Each step turns the next key word bold black; at the end all of them are black.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const step = Math.min(count - 1, Math.floor(p * count));
    setActive((a) => (a === step ? a : step));
  });

  const item = whatIDo.items[active];

  return (
    <section ref={sectionRef} id="what-i-do" aria-labelledby="what-i-do-title" className="relative h-[300vh]">
      <div className="sticky top-0 flex h-svh w-full flex-col justify-center px-5 sm:px-8">
        <SectionLabel id="what-i-do-title">{whatIDo.label}</SectionLabel>

        <p className="mt-8 font-condensed text-[clamp(2.25rem,6vw,5rem)] uppercase leading-[1.06] text-[#8a8a8a]">
          {tokens.map((token, i) => {
            const space = token.space ? " " : "";
            if (token.key === undefined) {
              return (
                <span key={i}>
                  {space}
                  {token.text}
                </span>
              );
            }
            const on = token.key <= active;
            return (
              <span key={i}>
                {space}
                <span className={`transition-colors duration-500 ${on ? "font-bold text-ink" : ""}`}>{token.text}</span>
              </span>
            );
          })}
        </p>

        <div className="relative mt-8 min-h-[10rem] border-t border-line pt-6">
          <div id="what-i-do-detail" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="grid gap-6 md:grid-cols-[1.5fr_1fr]"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease }}
              >
                <div>
                  <p className="max-w-[60ch] text-base leading-relaxed text-muted sm:text-lg">{item.description}</p>
                  <p className="mt-3 text-xs uppercase tracking-[0.08em] text-muted">{item.tags.join(" · ")}</p>
                </div>
                <div>
                  <p className="font-condensed text-5xl font-bold leading-none tabular-nums text-ink">
                    <CountUp metric={item.metric} />
                  </p>
                  <p className="mt-2 text-sm text-muted">{item.metric.label}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
