"use client";

import Image from "next/image";
import { useRef, useState, useSyncExternalStore } from "react";
import { easeInOut, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { projects, type Project } from "@/data/content";
import SectionLabel from "./SectionLabel";

const isSample = (src: string) => src.includes("/sample-");

// true on computer-sized screens, where each project holds in place and grows
const desktopQuery = "(min-width: 768px)";
function subscribe(cb: () => void) {
  const mq = window.matchMedia(desktopQuery);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
function useIsDesktop() {
  return useSyncExternalStore(subscribe, () => window.matchMedia(desktopQuery).matches, () => true);
}

/* The picture. If the project has a GitHub link, the whole picture is that link. */
function Picture({ project }: { project: Project }) {
  const picture = (
    <>
      <Image
        src={project.image.src}
        alt={project.image.alt}
        width={1600}
        height={1000}
        sizes="(min-width: 768px) 62vw, 100vw"
        unoptimized={project.image.src.endsWith(".svg")}
        className="block h-auto w-full"
      />
      {isSample(project.image.src) && (
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] text-muted">
          Sample image
        </span>
      )}
    </>
  );
  const frame = "group relative block overflow-hidden rounded-2xl bg-surface shadow-[0_24px_60px_rgba(0,0,0,0.14)]";

  if (!project.codeUrl) return <div className={frame}>{picture}</div>;
  return (
    <a
      href={project.codeUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${project.title} on GitHub (opens in a new tab)`}
      className={frame}
    >
      {picture}
    </a>
  );
}

/* Number, name, stack, description and link. */
function Details({ project, index, total, showNumber = true }: { project: Project; index: number; total: number; showNumber?: boolean }) {
  return (
    <>
      {showNumber && (
        <p className="font-condensed text-xs uppercase tracking-[0.3em] text-muted">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </p>
      )}
      <h3 className="mt-1.5 font-condensed text-[clamp(2rem,3vw,2.75rem)] font-bold uppercase leading-[0.95]">
        {project.title}
      </h3>
      <p className="mt-2.5 text-sm text-muted">{project.stack.join(" · ")}</p>
      <p className="mt-3 text-[15px] leading-relaxed text-[#4a4a4a]">{project.description}</p>
      {project.codeUrl ? (
        <a
          href={project.codeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block font-condensed text-xs uppercase tracking-[0.25em] text-accent"
        >
          View on GitHub ↗<span className="sr-only"> (opens in a new tab)</span>
        </a>
      ) : (
        <p className="mt-4 font-condensed text-xs uppercase tracking-[0.25em] text-muted">GitHub link coming soon</p>
      )}
    </>
  );
}

/* One project: a small picture with its name huge and pale behind it.
   As you scroll, the picture grows, the name drifts sideways, and the details card appears. */
function ProjectScene({
  project,
  index,
  total,
  animate,
  isDesktop,
}: {
  project: Project;
  index: number;
  total: number;
  animate: boolean;
  isDesktop: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // the picture grows from 32% to its full size (at most 62% of the screen width, 62% of its height)
  // computers: up to 62% of the screen width; phones: the full width minus the margins
  const full = isDesktop ? "min(62vw, 99.2svh)" : "(100vw - 2.5rem)";
  const grow = useTransform(scrollYProgress, [0, 0.7], [isDesktop ? 0.32 : 0.45, 1], { ease: easeInOut });
  const width = useTransform(grow, (g) => `calc(${g} * ${full})`);
  // the pale name drifts from right to left the whole time
  const drift = useTransform(scrollYProgress, [0, 1], ["30%", "-30%"]);
  const ghostOpacity = useTransform(grow, [0.32, 1], [1, 0.4]);
  const [showCard, setShowCard] = useState(false);
  const [started, setStarted] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next = p > 0.62;
    setShowCard((s) => (s === next ? s : next));
    const begun = p > 0.05;
    setStarted((s) => (s === begun ? s : begun));
  });

  if (!animate) {
    // Phones and reduced motion: the picture at full width with its details underneath.
    return (
      <article ref={ref} className="py-10">
        <Picture project={project} />
        <div className="mt-5">
          <Details project={project} index={index} total={total} />
        </div>
      </article>
    );
  }

  return (
    <section ref={ref} className="relative h-[220vh]" aria-label={project.title}>
      <div className={`sticky top-0 flex h-svh items-center justify-center overflow-hidden ${isDesktop ? "" : "flex-col px-5"}`}>
        {/* the name, huge and pale, drifting behind the picture */}
        <div className={`pointer-events-none absolute inset-x-0 -translate-y-1/2 ${isDesktop ? "top-1/2" : "top-[38%]"}`} aria-hidden="true">
          <motion.p
            style={{ x: drift, opacity: ghostOpacity }}
            className={`whitespace-nowrap text-center font-condensed font-bold uppercase leading-none text-[#f1f1f0] ${isDesktop ? "text-[22vw]" : "text-[44vw]"}`}
          >
            {project.title}
          </motion.p>
        </div>

        {/* big pale number, top left, like the original projects section */}
        <p
          aria-hidden="true"
          className={`pointer-events-none absolute left-5 top-[clamp(72px,11vh,110px)] z-20 md:left-8 font-condensed text-[clamp(5rem,10vw,9rem)] font-bold leading-[0.9] text-[#e6e6e4] transition-[opacity,translate] duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${
            started ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </p>

        <motion.div style={{ width }} className="relative z-10">
          <Picture project={project} />
        </motion.div>

        {/* details card, bottom left, overlapping the picture's corner */}
        <div
          className={`${
            isDesktop
              ? "absolute bottom-[clamp(24px,6vh,60px)] left-8 max-w-[34rem] rounded-xl bg-white/95 px-5 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
              : "relative mt-5 w-full"
          } z-20 transition-[opacity,translate] duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
            showCard ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3.5 opacity-0"
          }`}
        >
          <Details project={project} index={index} total={total} showNumber={false} />
        </div>
      </div>
    </section>
  );
}

export default function Projects() {
  const items = projects.items;
  const reduceMotion = Boolean(useReducedMotion());
  const isDesktop = useIsDesktop();
  const animate = !reduceMotion; // animated on phones too

  return (
    <section id="projects" aria-labelledby="projects-title" className="relative min-h-svh">
      {animate ? (
        // "Selected projects" stays at the top until the last project has finished
        <div className="sticky top-0 z-30 h-0">
          <div className="absolute left-5 top-6 md:left-8 md:top-10">
            <SectionLabel id="projects-title">{projects.label}</SectionLabel>
          </div>
        </div>
      ) : (
        <div className="px-5 pt-8 sm:px-8">
          <SectionLabel id="projects-title">{projects.label}</SectionLabel>
        </div>
      )}
      <div className={animate ? "" : "px-5 sm:px-8"}>
        {items.map((project, i) => (
          <ProjectScene key={project.title} project={project} index={i} total={items.length} animate={animate} isDesktop={isDesktop} />
        ))}
      </div>
    </section>
  );
}
