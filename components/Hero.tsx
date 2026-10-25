// "use client";

// import { useEffect, useState } from "react";
// import { AnimatePresence, motion, useReducedMotion } from "motion/react";
// import { hero, site } from "@/data/content";

// const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

// /* One line of the name: each letter rises up from below, one after another. */
// function NameLine({ text, delay, className }: { text: string; delay: number; className: string }) {
//   return (
//     <span className={`block overflow-hidden pb-[0.04em] ${className}`}>
//       {Array.from(text).map((char, i) => (
//         <motion.span
//           key={i}
//           className="inline-block"
//           initial={{ y: "110%" }}
//           animate={{ y: 0 }}
//           transition={{ duration: 0.8, ease, delay: delay + i * 0.05 }}
//         >
//           {char}
//         </motion.span>
//       ))}
//     </span>
//   );
// }

// /* "I'm a ___": the role fades and slides to the next one every 2.2 seconds. */
// function RotatingRole({ roles }: { roles: string[] }) {
//   const reduceMotion = useReducedMotion();
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     if (reduceMotion) return;
//     const id = window.setInterval(() => setIndex((i) => (i + 1) % roles.length), 2200);
//     return () => window.clearInterval(id);
//   }, [reduceMotion, roles.length]);

//   return (
//     <>
//       <span className="sr-only">{roles.join(", ")}</span>
//       <span aria-hidden="true" className="inline-block">
//         <AnimatePresence mode="wait" initial={false}>
//           <motion.span
//             key={roles[index]}
//             className="inline-block font-medium text-ink"
//             initial={{ opacity: 0, y: 6 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -6 }}
//             transition={{ duration: 0.25 }}
//           >
//             {roles[index]}
//           </motion.span>
//         </AnimatePresence>
//       </span>
//     </>
//   );
// }

// /* Types a phrase, waits, deletes it, then types the next one. */
// function Typewriter({ phrases }: { phrases: string[] }) {
//   const reduceMotion = useReducedMotion();
//   const [text, setText] = useState("");

//   useEffect(() => {
//     if (reduceMotion) return;
//     let timer = 0;
//     let phrase = 0;
//     let chars = 0;
//     let deleting = false;

//     const tick = () => {
//       const current = phrases[phrase];
//       if (!deleting) {
//         chars += 1;
//         setText(current.slice(0, chars));
//         if (chars === current.length) {
//           deleting = true;
//           timer = window.setTimeout(tick, 1800); // pause on the full phrase
//           return;
//         }
//         timer = window.setTimeout(tick, 60 + Math.random() * 40);
//       } else {
//         chars -= 1;
//         setText(current.slice(0, chars));
//         if (chars === 0) {
//           deleting = false;
//           phrase = (phrase + 1) % phrases.length;
//           timer = window.setTimeout(tick, 300);
//           return;
//         }
//         timer = window.setTimeout(tick, 28);
//       }
//     };

//     timer = window.setTimeout(tick, 1200); // start after the name has appeared
//     return () => window.clearTimeout(timer);
//   }, [reduceMotion, phrases]);

//   return (
//     <>
//       <span className="sr-only">{phrases.join(" ")}</span>
//       <span aria-hidden="true">
//         <span className="text-ink">{reduceMotion ? phrases[0] : text}</span>
//         <span className="ml-0.5 inline-block h-[1em] w-[1.5px] translate-y-[0.15em] animate-[blink_1s_steps(1)_infinite] bg-ink motion-reduce:animate-none" />
//       </span>
//     </>
//   );
// }

// export default function Hero() {
//   const [firstName, ...rest] = site.name.split(" ");
//   const lastName = rest.join(" ");

//   return (
//     <section
//       id="top"
//       tabIndex={-1}
//       aria-labelledby="hero-title"
//       className="flex h-svh min-h-[600px] flex-col"
//     >
//       <div className="relative flex flex-1 flex-col px-5 pt-6 sm:px-8 md:pt-8">
//         {/* Top right: availability */}
//         <p className="self-end font-condensed text-xs uppercase tracking-[0.3em] text-soft sm:text-sm">
//           {hero.availability}
//         </p>

//         {/* Greeting and name, shifted a little to the right on larger screens */}
//         <div className="mt-[11vh] md:ml-[9vw]">
//           <p className="text-[clamp(24px,2.4vw,36px)] text-muted">{hero.greeting}</p>
//           <h1
//             id="hero-title"
//             className="mt-2 font-condensed text-[clamp(4rem,min(15vw,21vh),14rem)] uppercase leading-[0.9] tracking-[0.01em]"
//           >
//             <span className="sr-only">{site.name}</span>
//             <span aria-hidden="true">
//               <NameLine text={firstName} delay={0.15} className="font-bold text-ink" />
//               <NameLine text={lastName} delay={0.45} className="pl-[1.1em] font-normal text-muted" />
//             </span>
//           </h1>
//         </div>

//         {/* Bottom right: quote with a typing second line */}
//         <p className="mb-[10vh] ml-auto mt-auto max-w-[34rem] pt-8 text-right text-[clamp(1.25rem,2.1vw,2rem)] leading-[1.3] text-soft">
//           {hero.quote.fixed}
//           <br />
//           <Typewriter phrases={hero.quote.phrases} />
//         </p>
//       </div>

//       {/* Bottom bar: rotating role and profile links */}
//       <div className="mx-5 flex flex-wrap items-center justify-between gap-4 border-t border-line py-5 sm:mx-8">
//         <p className="font-display text-[clamp(20px,2vw,26px)] tracking-tight">
//           <span className="text-muted">I&apos;m a </span>
//           <RotatingRole roles={hero.roles} />
//         </p>

//         <nav
//           aria-label="Profiles"
//           className="flex items-center font-condensed text-xs uppercase tracking-[0.3em] text-soft sm:text-sm"
//         >
//           {site.github ? (
//             <a href={site.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink">
//               GitHub<span className="sr-only"> (opens in a new tab)</span>
//             </a>
//           ) : (
//             // Placeholder until you add site.github in data/content.ts
//             <span title="GitHub link coming soon">
//               GitHub<span className="sr-only"> (link coming soon)</span>
//             </span>
//           )}
//           <span aria-hidden="true" className="mx-3 text-line">/</span>
//           <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink">
//             LinkedIn<span className="sr-only"> (opens in a new tab)</span>
//           </a>
//           <span aria-hidden="true" className="mx-3 text-line">/</span>
//           <a href={site.resume} download className="transition-colors hover:text-ink">
//             Résumé<span className="sr-only"> (PDF)</span>
//           </a>
//         </nav>
//       </div>
//     </section>
//   );
// }

// ---------
"use client";

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

// const spaced = "font-condensed text-xs uppercase tracking-[0.3em] text-[#8a8a8a] sm:text-[13px]";
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

        {/* top bar: availability and profile links */}
        <motion.div aria-hidden="true" className="absolute inset-x-5 top-14 h-px origin-right bg-[#eee] sm:inset-x-8" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1], delay: 0.2 }} />
        {/* <motion.p className={`absolute left-5 top-6 z-10 sm:left-8 ${spaced}`} style={move ? { opacity: smallOpacity } : undefined}> */}
        <motion.p className={`absolute right-5 top-6 z-10 sm:right-8 ${spaced}`} style={move ? { opacity: smallOpacity } : undefined}>
          <motion.span className="inline-block" {...fadeDown(0)}>
            {hero.availability}
          </motion.span>
        </motion.p>
        {/* <motion.nav aria-label="Profiles" className={`absolute right-5 top-6 z-10 hidden sm:right-8 sm:block ${spaced}`} {...fadeDown(0.1)}>
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
          <a href={site.resume} download className="transition-colors hover:text-black">
            Résumé<span className="sr-only"> (PDF)</span>
          </a>
        </motion.nav> */}
                <motion.nav
          aria-label="Profiles"
          // className={`absolute bottom-6 left-5 z-10 sm:bottom-8 sm:left-8 ${spaced}`}
          // className={`absolute bottom-6 left-5 z-10 sm:bottom-8 sm:left-8 md:left-[9vw] ${spaced}`}
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
          {/* <a href={site.resume} download className="transition-colors hover:text-black">
            Résumé<span className="sr-only"> (PDF)</span>
          </a> */}
          <a href={site.resume} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-black">
            Résumé<span className="sr-only"> (opens in a new tab)</span>
          </a>
          </motion.span>
        </motion.nav>

        {/* greeting and name */}
        {/* <div className="absolute inset-y-0 left-5 flex w-[90%] flex-col justify-center sm:left-8 md:w-[68%]"> */}
        {/* <div className="absolute inset-y-0 left-5 flex w-[90%] flex-col justify-center sm:left-8 md:left-[9vw] md:w-[66%]"> */}
        <div className="absolute inset-y-0 left-5 flex w-[90%] flex-col justify-center pb-[14vh] sm:left-8 md:left-[9vw] md:w-[66%]">
          {/* <motion.p className="font-display text-[clamp(18px,1.8vw,26px)] text-[#8a8a8a]" style={move ? { opacity: smallOpacity } : undefined}> */}
          <motion.p className="font-display text-[clamp(22px,2.4vw,36px)] text-[#8a8a8a]" style={move ? { opacity: smallOpacity } : undefined}>
            <motion.span className="inline-block" {...fadeUp(0.35)}>
              {hero.greeting} <RotatingRole roles={hero.roles} />
            </motion.span>
          </motion.p>
          {/* <h1 id="hero-title" className="mt-2 font-condensed text-[clamp(3.5rem,min(11vw,19vh),11rem)] uppercase leading-[0.9]"> */}
          {/* <h1 id="hero-title" className="mt-2 font-condensed text-[clamp(4.5rem,min(15vw,25vh),16rem)] uppercase leading-[0.9]"> */}
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
          // className="absolute bottom-8 right-5 z-10 text-right text-[clamp(1rem,1.6vw,1.5rem)] leading-snug text-[#8a8a8a] sm:right-8"
          // className="absolute bottom-16 right-5 z-10 text-right sm:bottom-8text-[clamp(22px,2.4vw,36px)] leading-snug text-[#8a8a8a] sm:right-8"
             className="absolute bottom-16 right-5 z-10 text-right sm:bottom-8 text-[clamp(22px,2.4vw,36px)] leading-snug text-[#8a8a8a] sm:right-8"
          style={move ? { opacity: smallOpacity } : undefined}
        >
          <motion.span className="inline-block" {...fadeUp(1.3)}>
            {hero.quote.fixed}
            <br />
            <Typewriter phrases={hero.quote.phrases} />
          </motion.span>
        </motion.p>

        {/* small "scroll down" hint, bottom left */}
        {/* <motion.div
          aria-hidden="true"
          className="absolute bottom-8 left-5 h-12 w-px overflow-hidden bg-[#e6e6e6] sm:left-8"
          style={move ? { opacity: smallOpacity } : undefined}
        >
          <span className="absolute left-0 top-[-40%] block h-[40%] w-px animate-[cue_1.8s_cubic-bezier(.65,0,.35,1)_infinite] bg-[#111] motion-reduce:animate-none" />
        </motion.div> */}
      </div>
    </section>
  );
}
