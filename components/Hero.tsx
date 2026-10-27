"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { hero, site } from "@/data/content";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* One line of the name: each letter rises up from below, one after another. */
function NameLine({ text, delay, className }: { text: string; delay: number; className: string }) {
  return (
    <span className={`block overflow-hidden pb-[0.04em] ${className}`}>
      {Array.from(text).map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: "105%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.9, ease, delay: delay + i * 0.05 }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

/* "Hi, I'm a ___": the role fades and slides to the next one every 2.6 seconds. */
function RotatingRole({ roles }: { roles: string[] }) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % roles.length), 2600);
    return () => window.clearInterval(id);
  }, [reduceMotion, roles.length]);

  return (
    <>
      <span className="sr-only">{roles.join(", ")}</span>
      <motion.span
        key={roles[index]}
        aria-hidden="true"
        className="inline-block text-black"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        {roles[index]}
      </motion.span>
    </>
  );
}

/* Types a phrase, waits, deletes it, then types the next one. */
function Typewriter({ phrases }: { phrases: string[] }) {
  const reduceMotion = useReducedMotion();
  const [text, setText] = useState("");

  useEffect(() => {
    if (reduceMotion) return;
    let timer = 0;
    let phrase = 0;
    let chars = 0;
    let deleting = false;

    const tick = () => {
      const current = phrases[phrase];
      if (!deleting) {
        chars += 1;
        setText(current.slice(0, chars));
        if (chars === current.length) {
          deleting = true;
          timer = window.setTimeout(tick, 1800);
          return;
        }
        timer = window.setTimeout(tick, 60 + Math.random() * 40);
      } else {
        chars -= 1;
        setText(current.slice(0, chars));
        if (chars === 0) {
          deleting = false;
          phrase = (phrase + 1) % phrases.length;
          timer = window.setTimeout(tick, 300);
          return;
        }
        timer = window.setTimeout(tick, 28);
      }
    };

    timer = window.setTimeout(tick, 2000); // start after the page has loaded in
    return () => window.clearTimeout(timer);
  }, [reduceMotion, phrases]);

  return (
    <>
      <span className="sr-only">{phrases.join(" ")}</span>
      <span aria-hidden="true">
        <span className="text-black">{reduceMotion ? phrases[0] : text}</span>
        <span className="ml-0.5 inline-block h-[1em] w-[1.5px] translate-y-[0.15em] animate-[blink_1s_steps(1)_infinite] bg-black motion-reduce:animate-none" />
      </span>
    </>
  );
}

const spaced = "font-condensed text-[clamp(13px,1.15vw,18px)] uppercase tracking-[0.3em] text-[#8a8a8a]";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [firstName, ...rest] = site.name.split(" ");
  const lastName = rest.join(" ");

  /* While the hero holds in place, scrolling splits the name apart:
     "Snehal" slides left, "Shinde" slides right, the side name sweeps up
     and the smaller text fades. Then the next page slides over. */
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const leftX = useTransform(scrollYProgress, [0, 1], ["0%", "-38%"]);
  const rightX = useTransform(scrollYProgress, [0, 1], ["0%", "58%"]);
  const nameOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.45]);
  const sideY = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const smallOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const move = !reduceMotion;

  const fadeDown = (delay: number) => ({
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease, delay },
  });
  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease, delay },
  });

  return (
    <section ref={sectionRef} id="top" tabIndex={-1} aria-labelledby="hero-title" className="relative h-[180vh]">
      <div className="sticky top-0 h-svh min-h-[600px] overflow-hidden">
        {/* giant pale name down the right edge */}
        <motion.div
          aria-hidden="true"
          style={move ? { y: sideY } : undefined}
          className="absolute -bottom-5 -right-3 -top-5 hidden items-center md:flex"
        >
          <motion.div
            className="whitespace-nowrap font-condensed text-[clamp(10rem,48vh,30rem)] font-bold uppercase leading-[0.82] text-[#f3f3f2] [writing-mode:vertical-rl]"
            initial={{ y: "35%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 1.8, ease, delay: 0.3 }}
          >
            {site.name}
          </motion.div>
        </motion.div>

        {/* logo, top left: black-and-white avatar with your name */}
        <motion.div className="absolute left-5 top-3.5 z-10 sm:left-8" style={move ? { opacity: smallOpacity } : undefined}>
          <motion.a href="#top" aria-label="Snehal Shinde, back to top" className="group flex items-center gap-3" {...fadeDown(0)}>
            <Image
              src="/logo-avatar.png"
              alt=""
              width={36}
              height={36}
              priority
              className="size-9 rounded-full transition-transform duration-[400ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:-rotate-6 group-hover:scale-105 motion-reduce:transition-none"
            />
            <span className="font-condensed text-[clamp(13px,1.15vw,18px)] uppercase tracking-[0.3em] text-ink">
              {firstName}
            </span>
          </motion.a>
        </motion.div>

        {/* availability (top right) and profile links (bottom left) */}
        <motion.div aria-hidden="true" className="absolute inset-x-5 top-[72px] h-px origin-right bg-[#eee] sm:inset-x-8" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1], delay: 0.2 }} />
        {/* <motion.p className={`absolute right-5 top-6 z-10 sm:right-8 ${spaced}`} style={move ? { opacity: smallOpacity } : undefined}>
          <motion.span className="inline-block" {...fadeDown(0)}>
            {hero.availability}
          </motion.span>
        </motion.p> */}
                {/* availability, centred, with a pulsing green dot (hidden on phones to keep the bar clear) */}
        <motion.p
          className={`absolute left-1/2 top-6 z-10 hidden -translate-x-1/2 whitespace-nowrap md:block ${spaced}`}
          style={move ? { opacity: smallOpacity } : undefined}
        >
          <motion.span className="inline-flex items-center gap-2.5" {...fadeDown(0)}>
            <span aria-hidden="true" className="inline-block size-[7px] animate-pulse rounded-full bg-[#1f9d55] motion-reduce:animate-none" />
            {hero.availability}
          </motion.span>
        </motion.p>

        {/* Get in touch, top right: scrolls down to the Contact section */}
        <motion.div className="absolute right-5 top-3.5 z-10 sm:right-8" style={move ? { opacity: smallOpacity } : undefined}>
          <motion.a
            href="#contact"
            className="group inline-flex items-center gap-2.5 rounded-full bg-ink px-[18px] py-2.5 font-condensed text-[13px] uppercase tracking-[0.25em] text-white transition-colors duration-300 hover:bg-accent"
            {...fadeDown(0.1)}
          >
            Get in touch
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
              ↗
            </span>
          </motion.a>
        </motion.div>
        <motion.nav
          aria-label="Profiles"
          className={`absolute bottom-10 left-5 z-10 sm:bottom-16 sm:left-8 md:left-[9vw] ${spaced}`}
          style={move ? { opacity: smallOpacity } : undefined}
        >
          <motion.span className="inline-block" {...fadeUp(1.3)}>
          {site.github ? (
            <a href={site.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-black">
              GitHub<span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : (
            <span title="GitHub link coming soon">GitHub</span>
          )}
          <span aria-hidden="true" className="mx-2.5 text-[#dadada]">/</span>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-black">
            LinkedIn<span className="sr-only"> (opens in a new tab)</span>
          </a>
          <span aria-hidden="true" className="mx-2.5 text-[#dadada]">/</span>
          <a href={site.resume} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-black">
            Résumé<span className="sr-only"> (opens in a new tab)</span>
          </a>
          </motion.span>
        </motion.nav>

        {/* greeting and name */}
        <div className="absolute inset-y-0 left-5 flex w-[90%] flex-col justify-center pb-[14vh] sm:left-8 md:left-[9vw] md:w-[66%]">
          <motion.p className="font-display text-[clamp(22px,2.4vw,36px)] text-[#8a8a8a]" style={move ? { opacity: smallOpacity } : undefined}>
            <motion.span className="inline-block" {...fadeUp(0.35)}>
              {hero.greeting} <RotatingRole roles={hero.roles} />
            </motion.span>
          </motion.p>
          <h1 id="hero-title" className="mt-2 font-condensed text-[clamp(4.25rem,min(14vw,23vh),15rem)] uppercase leading-[0.9]">
            <span className="sr-only">{site.name}</span>
            <span aria-hidden="true">
              <motion.span className="block w-max" style={move ? { x: leftX, opacity: nameOpacity } : undefined}>
                <NameLine text={firstName} delay={0.55} className="font-bold text-black" />
              </motion.span>
              <motion.span className="ml-[0.9em] block w-max" style={move ? { x: rightX, opacity: nameOpacity } : undefined}>
                <NameLine text={lastName} delay={0.85} className="font-normal text-[#6b6b6b]" />
              </motion.span>
            </span>
          </h1>
        </div>

        {/* quote, bottom right */}
        <motion.p
          className="absolute bottom-16 right-5 z-10 text-right sm:bottom-8 text-[clamp(22px,2.4vw,36px)] leading-snug text-[#8a8a8a] sm:right-8"
          style={move ? { opacity: smallOpacity } : undefined}
        >
          <motion.span className="inline-block" {...fadeUp(1.3)}>
            {hero.quote.fixed}
            <br />
            <Typewriter phrases={hero.quote.phrases} />
          </motion.span>
        </motion.p>

        
      </div>
    </section>
  );
}
