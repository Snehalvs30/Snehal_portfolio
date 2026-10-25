"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { intro } from "@/data/content";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const seg = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));

/* Where the photo frame sits inside the pinned screen. */
function frameRect(W: number, H: number) {
  return { l: Math.max(20, W * 0.04), t: H * 0.1, w: W * 0.4, h: H * 0.8 };
}

function IntroText({ on }: { on: boolean }) {
  const rise = (delay: number) => ({
    initial: false as const,
    animate: on ? { y: "0%" } : { y: "105%" },
    transition: { duration: 0.8, ease, delay },
  });
  const fade = (delay: number) => ({
    initial: false as const,
    animate: on ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
    transition: { duration: 0.7, ease, delay },
  });
  return (
    <>
      <h2 className="font-condensed text-[clamp(2.4rem,4.6vw,4.4rem)] font-bold uppercase leading-[1.02]">
        <span className="block overflow-hidden pb-[0.04em]">
          <motion.span className="block" {...rise(0)}>
            {intro.headline[0]}
          </motion.span>
        </span>
        <span className="block overflow-hidden pb-[0.04em]">
          <motion.span className="block text-[#8a8a8a]" {...rise(0.1)}>
            {intro.headline[1]}
          </motion.span>
        </span>
      </h2>
      <motion.p className="mt-5 max-w-[36rem] text-[clamp(16px,1.3vw,19px)] leading-relaxed" {...fade(0.3)}>
        {intro.lead}
      </motion.p>
      <motion.p className="mt-5 max-w-[36rem] text-[15px] leading-relaxed text-muted" {...fade(0.42)}>
        {intro.body}
      </motion.p>
      {intro.personal && (
        <motion.p className="mt-5 max-w-[36rem] text-[15px] leading-relaxed text-muted" {...fade(0.54)}>
          {intro.personal}
        </motion.p>
      )}
      <motion.dl className="mt-6 flex max-w-[36rem] flex-wrap gap-7 border-t border-line pt-4" {...fade(0.65)}>
        {intro.facts.map((f) => (
          <div key={f.label} className="text-[13px] text-muted">
            <dt className="mb-1 font-condensed text-[11px] uppercase tracking-[0.25em] text-[#8a8a8a]">{f.label}</dt>
            <dd>{f.value}</dd>
          </div>
        ))}
      </motion.dl>
    </>
  );
}

/* Phones and reduced motion: photo and text side by side (or stacked), with a gentle fade-in. */
function StaticIntro() {
  return (
    <div className="grid gap-10 px-5 py-24 sm:px-8 md:grid-cols-[0.8fr_1fr] md:items-center md:gap-16 md:py-32">
      <motion.figure
        className="m-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9 }}
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-[#0b0b0b]">
          <Image src={intro.photo.src} alt={intro.photo.alt} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover object-[46%_28%]" />
        </div>
        <figcaption className="mt-3 font-condensed text-xs tracking-[0.3em] text-soft">{intro.caption}</figcaption>
      </motion.figure>
      <div>
        <IntroText on />
      </div>
    </div>
  );
}

/* Desktop: "THIS IS ME." grows until you fly through the full stop, the black
   shrinks into a frame, the photo develops inside it, then the text rises in. */
function ZoomIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const groupRef = useRef<SVGGElement>(null);
  const textRef = useRef<SVGTextElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const blackRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const grainRef = useRef<HTMLDivElement>(null);
  const dot = useRef({ x: 800, y: 304 });

  const [size, setSize] = useState({ W: 1280, H: 800 });
  const [textOn, setTextOn] = useState(false);
  const [developed, setDeveloped] = useState(false);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  const placeDot = useCallback(() => {
    const t = textRef.current;
    const d = dotRef.current;
    if (!t || !d) return;
    const b = t.getBBox();
    dot.current = { x: b.x + b.width + 20, y: b.y + b.height * 0.82 };
    d.setAttribute("cx", String(dot.current.x));
    d.setAttribute("cy", String(dot.current.y));
  }, []);

  const apply = useCallback((p: number) => {
    const pin = pinRef.current;
    const svg = svgRef.current;
    const g = groupRef.current;
    const black = blackRef.current;
    const photo = photoRef.current;
    const grain = grainRef.current;
    if (!pin || !svg || !g || !black || !photo || !grain) return;

    // 1. zoom into the full stop
    const a = seg(p, 0, 0.32);
    const s = Math.exp(a * Math.log(180));
    const { x, y } = dot.current;
    g.setAttribute("transform", `translate(${x} ${y}) scale(${s.toFixed(3)}) translate(${-x} ${-y})`);
    const full = a >= 1;
    svg.style.display = full ? "none" : "block";

    // 2. the black screen shrinks into the photo frame
    const W = pin.clientWidth;
    const H = pin.clientHeight;
    const f = frameRect(W, H);
    const b = seg(p, 0.32, 0.48);
    const e = 1 - Math.pow(1 - b, 3);
    black.style.display = full && b < 1 ? "block" : "none";
    black.style.left = `${f.l * e}px`;
    black.style.top = `${f.t * e}px`;
    black.style.width = `${W + (f.w - W) * e}px`;
    black.style.height = `${H + (f.h - H) * e}px`;

    // 3. the photo develops
    const d = seg(p, 0.48, 0.74);
    photo.style.opacity = d <= 0 ? "0" : Math.min(1, d * 1.6).toFixed(2);
    photo.style.filter = `brightness(${(0.15 + 0.85 * d).toFixed(2)}) contrast(${(0.6 + 0.4 * d).toFixed(2)})`;
    grain.style.opacity = (d > 0 && d < 1 ? 0.5 * (1 - Math.abs(d - 0.5) * 1.6) : 0).toFixed(2);
    setDeveloped(d >= 1);

    // 4. the text
    setTextOn(p > 0.7);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", apply);

  useEffect(() => {
    const pin = pinRef.current;
    if (!pin) return;
    const observer = new ResizeObserver(([entry]) => {
      setSize({ W: entry.contentRect.width, H: entry.contentRect.height });
      placeDot();
      apply(scrollYProgress.get());
    });
    observer.observe(pin);
    document.fonts?.ready.then(() => {
      placeDot();
      apply(scrollYProgress.get());
    });
    return () => observer.disconnect();
  }, [apply, placeDot, scrollYProgress]);

  const f = frameRect(size.W, size.H);

  return (
    // <section ref={sectionRef} className="relative h-[320vh]" aria-labelledby="intro-title">
    <section ref={sectionRef} className="relative h-[400vh]" aria-labelledby="intro-title">
      <div ref={pinRef} className="sticky top-0 h-svh overflow-hidden">
        {/* photo frame */}
        <div className="absolute overflow-hidden bg-[#0b0b0b]" style={{ left: f.l, top: f.t, width: f.w, height: f.h }}>
          <div ref={photoRef} className="absolute inset-0 opacity-0">
            <Image src={intro.photo.src} alt={intro.photo.alt} fill sizes="40vw" className="object-cover object-[46%_28%]" />
          </div>
          <div ref={grainRef} className="film-grain opacity-0 motion-reduce:animate-none" aria-hidden="true" />
        </div>
        <p
          className={`absolute font-condensed text-xs tracking-[0.3em] text-soft transition-opacity duration-500 ${developed ? "opacity-100" : "opacity-0"}`}
          style={{ left: f.l, top: f.t + f.h + 10 }}
        >
          {intro.caption}
        </p>

        {/* text */}
        <div className="absolute" style={{ left: f.l + f.w + Math.max(40, size.W * 0.05), right: "clamp(20px,4vw,60px)", top: size.H * 0.12 }}>
          <span id="intro-title" className="sr-only">
            {intro.zoomText}.
          </span>
          <IntroText on={textOn} />
        </div>

        {/* the black screen after flying through the full stop */}
        <div ref={blackRef} aria-hidden="true" className="absolute z-[9] hidden bg-[#0b0b0b]" />

        {/* "THIS IS ME." */}
        <svg
          ref={svgRef}
          aria-hidden="true"
          viewBox="0 0 900 540"
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 z-10 h-full w-full overflow-visible bg-bg"
        >
          <g ref={groupRef}>
            <text
              ref={textRef}
              x="70"
              y="318"
              fontSize="150"
              fontWeight="700"
              letterSpacing="2"
              fill="#111"
              style={{ fontFamily: "var(--font-antonio), 'Arial Narrow', sans-serif" }}
            >
              {intro.zoomText}
            </text>
            <circle ref={dotRef} cx="800" cy="304" r="14" fill="#0b0b0b" />
          </g>
        </svg>
      </div>
    </section>
  );
}

export default function ThisIsMe() {
  const reduceMotion = useReducedMotion();
  return (
    <div id="intro">
      {reduceMotion ? (
        <StaticIntro />
      ) : (
        <>
          <div className="hidden md:block">
            <ZoomIntro />
          </div>
          <section className="md:hidden" aria-label={`${intro.zoomText}.`}>
            <StaticIntro />
          </section>
        </>
      )}
    </div>
  );
}
