"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { timeline, type TimelineEntry } from "@/data/content";
import SectionLabel from "./SectionLabel";

const ENTRY_WIDTH = 420; // px from one entry to the next on the desktop timeline
const TRACK_PADDING = 64; // px of space before the first entry

/* One entry: tag, name, role and dates. Hovering (or focusing / tapping) opens it:
   black ink spreads from the corner nearest the timeline dot, the text turns white
   and the description points rise in one by one. */
function EntryCard({
  entry,
  id,
  open,
  corner,
  onToggle,
  onEnter,
  onLeave,
}: {
  entry: TimelineEntry;
  id: string;
  open: boolean;
  corner: "top" | "bottom"; // where the dot is, relative to the card
  onToggle: () => void;
  onEnter: () => void;
  onLeave: () => void;
}) {
  // Hover only on devices with a real mouse; on phones a tap uses onToggle instead.
  const canHover = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  // A short pause before closing, so brushing past the edge doesn't make it flicker.
  const closeTimer = useRef<number | undefined>(undefined);
  // Remembers whether this entry is still the open one when the timer fires.
  const openRef = useRef(open);
  useEffect(() => {
    openRef.current = open;
  }, [open]);
  useEffect(() => () => window.clearTimeout(closeTimer.current), []);
  const enter = () => {
    window.clearTimeout(closeTimer.current);
    onEnter();
  };
  const leave = () => {
    closeTimer.current = window.setTimeout(() => {
      // Only close if another entry hasn't been opened in the meantime.
      if (openRef.current) onLeave();
    }, 150);
  };
  return (
    <div
      data-open={open}
      onMouseEnter={() => canHover() && enter()}
      onMouseLeave={() => canHover() && leave()}
      className="group relative overflow-hidden rounded-xl p-4"
    >
      {/* black ink spreading from the corner nearest the timeline dot */}
      <span
        aria-hidden="true"
        style={{
          clipPath: `circle(${open ? 160 : 0}% at 14px ${corner === "bottom" ? "100%" : "0%"})`,
        }}
        className="pointer-events-none absolute inset-0 bg-ink transition-[clip-path] duration-700 ease-[cubic-bezier(.65,0,.35,1)] motion-reduce:transition-none"
      />

      <button
        type="button"
        onClick={(e) => {
          // With a mouse, hover already opens it, so a click shouldn't close it again.
          // Taps on phones, and Enter or Space on a keyboard, still toggle it.
          if (canHover() && e.detail > 0) return;
          onToggle();
        }}
        onFocus={(e) => e.currentTarget.matches(":focus-visible") && onEnter()}
        aria-expanded={open}
        aria-controls={id}
        className="relative z-10 block w-full text-left"
      >
        <span className="inline-block rounded-full border border-line px-2 py-0.5 font-condensed text-[10px] uppercase tracking-[0.25em] text-muted transition-colors delay-150 group-data-[open=true]:border-[#555] group-data-[open=true]:text-[#d0d0d0]">
          {entry.kind === "education" ? "Education" : "Work"}
        </span>
        <span className="mt-2 block font-condensed text-[24px] font-bold md:text-[32px] uppercase leading-none text-black transition-colors delay-150 group-data-[open=true]:text-white">
          {entry.name}
        </span>
        <span className="mt-1.5 block text-xs text-muted transition-colors delay-150 group-data-[open=true]:text-[#c4c4c4]">
          {entry.role} · {entry.dates} · {entry.location}
        </span>
        <span
          aria-hidden="true"
          className={`mt-2.5 font-condensed text-[11px] uppercase tracking-[0.25em] text-accent ${open ? "hidden" : "inline-block"}`}
        >
          Read more +
        </span>
      </button>

      <div
        id={id}
        aria-hidden={!open}
        className={`relative z-10 grid transition-[grid-template-rows] delay-150 duration-500 ease-out motion-reduce:transition-none ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <ul className="mt-3 list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-[#dedede] marker:text-[#5fc9bc]">
            {entry.points.map((point, k) => (
              <li
                key={point.slice(0, 40)}
                style={{ transitionDelay: open ? `${350 + k * 80}ms` : "0ms" }}
                className={`transition-[opacity,translate] duration-[400ms] ${open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
              >
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Dot({ kind, on, active = false }: { kind: TimelineEntry["kind"]; on: boolean; active?: boolean }) {
  const shape = kind === "education" ? "rounded-[2px] rotate-45" : "rounded-full";
  const fill = on ? (kind === "education" ? "border-accent bg-bg" : "border-accent bg-accent") : "border-[#cfcfcf] bg-bg";
  return (
    <span
      aria-hidden="true"
      className={`block size-[11px] border-2 transition-[background-color,border-color,scale] duration-300 ${shape} ${fill} ${active ? "scale-[1.35]" : ""}`}
    />
  );
}

/* Desktop: the section pins in place and scrolling moves the timeline sideways. */
function HorizontalTimeline({
  openIndex,
  toggle,
  setOpen,
}: {
  openIndex: number | null;
  toggle: (i: number) => void;
  setOpen: (i: number | null) => void;
}) {
  const entries = timeline.entries;
  const sectionRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([e]) => setViewportWidth(e.contentRect.width));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Phones get narrower entries so the sideways timeline fits a small screen.
  const phone = viewportWidth > 0 && viewportWidth < 768;
  const entryWidth = phone ? 270 : ENTRY_WIDTH;
  const pad = phone ? 24 : TRACK_PADDING;
  const trackWidth = pad * 2 + entryWidth * entries.length;
  const distance = Math.max(0, trackWidth - viewportWidth);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, (p) => -p * distance);
  useMotionValueEvent(scrollYProgress, "change", setProgress);

  // An entry appears once its dot has moved into the left three quarters of the screen.
  const isRevealed = (i: number) => pad + i * entryWidth - progress * distance < viewportWidth * 0.75;

  return (
    <div ref={sectionRef} className="relative" style={{ height: `calc(100svh + ${Math.round(distance * 1.2)}px)` }}>
      <div ref={viewportRef} className="sticky top-0 h-svh overflow-hidden">
        <div className="absolute left-5 top-8 sm:left-8">
          <SectionLabel id="experience-title">{timeline.label}</SectionLabel>
        </div>

        {/* the line, and the teal progress that draws across it */}
        <div aria-hidden="true" className="absolute inset-x-0 top-1/2 h-px bg-line">
          <motion.div style={{ scaleX: scrollYProgress }} className="h-[1.5px] origin-left bg-accent" />
        </div>

        <motion.ol style={{ x, width: trackWidth, paddingLeft: pad }} className="absolute left-0 top-0 flex h-full">
          {entries.map((entry, i) => {
            const up = i % 2 === 0;
            const on = isRevealed(i);
            return (
              <li key={entry.name} className="relative h-full shrink-0" style={{ width: entryWidth }}>
                <span className="absolute left-0 top-1/2 -translate-y-1/2">
                  <Dot kind={entry.kind} on={on} active={openIndex === i} />
                </span>
                <span
                  className={`absolute left-0 font-condensed text-sm tracking-[0.2em] text-soft ${
                    up ? "top-[calc(50%_+_14px)]" : "bottom-[calc(50%_+_14px)]"
                  }`}
                >
                  {entry.yearLabel}
                </span>
                <div
                  className={`absolute -left-4 w-[250px] md:w-[22rem] transition-[opacity,transform] duration-500 ease-out ${
                    up ? "bottom-[calc(50%_+_22px)]" : "top-[calc(50%_+_22px)]"
                  } ${on ? "translate-y-0 opacity-100" : up ? "translate-y-4 opacity-0" : "-translate-y-4 opacity-0"}`}
                >
                  <EntryCard entry={entry} id={`timeline-h-${i}`} open={openIndex === i} corner={up ? "bottom" : "top"} onToggle={() => toggle(i)} onEnter={() => setOpen(i)} onLeave={() => setOpen(null)} />
                </div>
              </li>
            );
          })}
        </motion.ol>
      </div>
    </div>
  );
}

/* Phones and reduced motion: a simple vertical list. */
function VerticalTimeline({
  openIndex,
  toggle,
  setOpen,
  labelId,
}: {
  openIndex: number | null;
  toggle: (i: number) => void;
  setOpen: (i: number | null) => void;
  labelId: string;
}) {
  return (
    <div className="mx-auto max-w-[110rem] px-5 py-24 sm:px-8">
      <SectionLabel id={labelId}>{timeline.label}</SectionLabel>
      <ol className="relative ml-1.5 mt-10 border-l border-line">
        {timeline.entries.map((entry, i) => (
          <li key={entry.name} className="relative pb-8 pl-6 last:pb-0">
            <span className="absolute -left-[6px] top-1.5">
              <Dot kind={entry.kind} on active={openIndex === i} />
            </span>
            <p className="font-condensed text-sm tracking-[0.2em] text-soft">{entry.yearLabel}</p>
            <div className="-ml-4 mt-1">
              <EntryCard entry={entry} id={`timeline-v-${i}`} open={openIndex === i} corner="top" onToggle={() => toggle(i)} onEnter={() => setOpen(i)} onLeave={() => setOpen(null)} />
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function Experience() {
  const reduceMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (i: number) => setOpenIndex((current) => (current === i ? null : i));

  // Escape closes an open entry.
  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenIndex(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex]);

  return (
    <section id="experience" aria-labelledby="experience-title" className="min-h-svh">
      {/* The sideways timeline on every screen; a simple list only for visitors with reduced motion. */}
      {reduceMotion ? (
        <VerticalTimeline openIndex={openIndex} toggle={toggle} setOpen={setOpenIndex} labelId="experience-title" />
      ) : (
        <HorizontalTimeline openIndex={openIndex} toggle={toggle} setOpen={setOpenIndex} />
      )}
    </section>
  );
}
