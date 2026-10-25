// "use client";

// import { useRef, useState, useSyncExternalStore, type FocusEvent, type MouseEvent, type ReactNode } from "react";
// import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
// import { expertise, type ExpertiseArea } from "@/data/content";

// const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
// const mono = "font-[ui-monospace,SFMono-Regular,Menlo,Consolas,monospace]";

// /* ---------- the small live pictures inside each card ---------- */

// function Lift({ on, className, children }: { on: boolean; className: string; children: ReactNode }) {
//   return (
//     <div
//       aria-hidden="true"
//       className={`absolute transition-[transform,box-shadow] duration-[600ms] ease-[cubic-bezier(.22,1,.36,1)] ${
//         on ? "-translate-y-2 shadow-[0_18px_40px_rgba(0,0,0,.35)]" : "shadow-[0_10px_30px_rgba(0,0,0,.08)]"
//       } ${className}`}
//     >
//       {children}
//     </div>
//   );
// }

// function TermRow({ r, i, isNew, on }: { r: string[]; i: number; isNew?: boolean; on: boolean }) {
//   return (
//     <div
//       style={isNew ? { transitionDelay: on ? `${i * 300}ms` : "0ms" } : undefined}
//       className={`grid grid-cols-[44px_1fr_34px] gap-2 whitespace-nowrap leading-[1.9] ${
//         isNew ? `transition-[opacity,transform] duration-300 ${on ? "translate-y-0 opacity-100" : "translate-y-1.5 opacity-0"}` : ""
//       }`}
//     >
//       <span className="text-[#5fc9bc]">{r[0]}</span>
//       <span>{r[1]}</span>
//       <span className="text-[#9be3a6]">{r[2]}</span>
//     </div>
//   );
// }

// function Terminal({ on }: { on: boolean }) {
//   const rows = [
//     ["GET", "/api/accounts", "200"],
//     ["POST", "/api/payments", "201"],
//     ["GET", "/actuator/health", "200"],
//   ];
//   const extra = [
//     ["PUT", "/api/profile", "200"],
//     ["GET", "/api/orders", "200"],
//   ];
//   return (
//     <Lift on={on} className={`bottom-7 left-7 -right-4 overflow-hidden rounded-2xl border border-[#2a2a2a] bg-[#161616] text-xs text-[#ddd] ${mono}`}>
//       <div className="flex items-center gap-1.5 border-b border-[#262626] px-3.5 py-2.5 text-[11px] text-[#8a8a8a]">
//         <i className="size-2 rounded-full bg-[#3a3a3a]" />
//         <i className="size-2 rounded-full bg-[#3a3a3a]" />
//         <i className="size-2 rounded-full bg-[#3a3a3a]" />
//         <span className="ml-2">spring-boot · api · sample</span>
//       </div>
//       <div className="px-3.5 pb-3 pt-2.5">
//         {rows.map((r, i) => (
//           <TermRow key={r[1]} r={r} i={i} on={on} />
//         ))}
//         {extra.map((r, i) => (
//           <TermRow key={r[1]} r={r} i={i} isNew on={on} />
//         ))}
//         <div className="mt-1">
//           ›{" "}
//           <span className="inline-block h-[13px] w-[7px] translate-y-0.5 animate-[blink_1s_steps(1)_infinite] bg-[#5fc9bc] motion-reduce:animate-none" />
//         </div>
//       </div>
//     </Lift>
//   );
// }

// function Pipeline({ on }: { on: boolean }) {
//   const steps = ["Build", "Test", "Scan", "Deploy"];
//   return (
//     <Lift on={on} className="bottom-6 left-[42%] right-6 rounded-2xl border border-[#ececec] bg-white px-4 py-3.5">
//       <div className={`mb-3 text-[11px] text-[#8a8a8a] ${mono}`}>pipeline · main</div>
//       <div className="relative flex justify-between">
//         <span className="absolute inset-x-2 top-2 h-0.5 bg-[#ececec]" />
//         <span
//           className={`absolute left-2 top-2 h-0.5 bg-accent transition-[width] duration-[1100ms] ease-[cubic-bezier(.22,1,.36,1)] ${
//             on ? "w-[calc(100%_-_16px)]" : "w-0"
//           }`}
//         />
//         {steps.map((s, i) => (
//           <div key={s} className="relative z-10 flex flex-col items-center gap-1.5 text-[10px] text-[#777]">
//             <b
//               style={{ transitionDelay: on ? `${[0, 250, 500, 800][i]}ms` : "0ms" }}
//               className={`size-[18px] rounded-full border-2 transition-colors duration-300 ${
//                 on ? "border-accent bg-accent" : "border-[#d6d6d6] bg-white"
//               }`}
//             />
//             {s}
//           </div>
//         ))}
//       </div>
//     </Lift>
//   );
// }

// function Cluster({ on }: { on: boolean }) {
//   return (
//     <Lift on={on} className="bottom-6 left-[42%] right-6 rounded-2xl border border-[#ececec] bg-white px-3.5 py-3">
//       <div className={`mb-2.5 text-[11px] text-[#8a8a8a] ${mono}`}>cluster · sample</div>
//       <div className="grid grid-cols-3 gap-2">
//         {[0, 1, 2].map((n) => (
//           <div key={n} className="grid grid-cols-3 gap-[5px] rounded-lg border border-[#ececec] p-2">
//             {[0, 1, 2, 3, 4, 5].map((k) => (
//               <span
//                 key={k}
//                 style={{ transitionDelay: on ? `${(n * 6 + k) * 40}ms` : "0ms" }}
//                 className={`h-2.5 rounded-[3px] transition-colors duration-300 ${on ? "bg-accent" : "bg-[#e6e6e6]"}`}
//               />
//             ))}
//           </div>
//         ))}
//       </div>
//     </Lift>
//   );
// }

// function Browser({ on }: { on: boolean }) {
//   const bars = [40, 62, 48, 80, 66, 92];
//   return (
//     <Lift on={on} className="-bottom-3.5 -right-4 left-[40%] h-[62%] overflow-hidden rounded-tl-2xl border border-[#ececec] bg-white">
//       <div className="flex gap-1.5 border-b border-[#f0f0f0] px-3 py-2.5">
//         <i className="size-2 rounded-full bg-[#e2e2e2]" />
//         <i className="size-2 rounded-full bg-[#e2e2e2]" />
//         <i className="size-2 rounded-full bg-[#e2e2e2]" />
//       </div>
//       <div className="grid grid-cols-[60px_1fr] gap-2.5 p-3">
//         <div className="space-y-2">
//           <span className="block h-2 rounded-[3px] bg-[#efefef]" />
//           <span className="block h-2 rounded-[3px] bg-[#efefef]" />
//           <span className="block h-2 rounded-[3px] bg-[#efefef]" />
//           <span className="block h-2 w-[70%] rounded-[3px] bg-[#efefef]" />
//         </div>
//         <div className="flex h-24 items-end gap-[7px] border-b border-[#f0f0f0]">
//           {bars.map((h, k) => (
//             <span
//               key={k}
//               style={{ height: `${h}%`, transitionDelay: on ? `${k * 60}ms` : "0ms" }}
//               className={`flex-1 origin-bottom rounded-t-[3px] transition-[transform,background-color] duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${
//                 on ? "scale-y-100 bg-accent" : "scale-y-[.45] bg-[#d9d9d9]"
//               }`}
//             />
//           ))}
//         </div>
//       </div>
//     </Lift>
//   );
// }

// function Editor({ on }: { on: boolean }) {
//   return (
//     <Lift on={on} className={`bottom-6 left-[42%] right-6 rounded-2xl border border-[#2a2a2a] bg-[#161616] px-3.5 py-3 text-[11px] leading-[1.85] text-[#cfcfcf] ${mono}`}>
//       <span className="text-[#6d6d6d]">{"// reusable component"}</span>
//       <br />
//       <span className="text-[#5fc9bc]">@Component</span>({"{"}
//       <br />
//       &nbsp;&nbsp;selector: <span className="text-[#e6c07b]">&apos;app-card&apos;</span>,
//       <br />
//       <span className={`-mx-3.5 block px-3.5 transition-colors duration-500 ${on ? "bg-[rgba(95,201,188,.14)]" : ""}`}>
//         &nbsp;&nbsp;changeDetection: <span className="text-[#5fc9bc]">OnPush</span>
//       </span>
//       {"}"})
//     </Lift>
//   );
// }

// const visuals = { terminal: Terminal, pipeline: Pipeline, cluster: Cluster, browser: Browser, editor: Editor };

// /* ---------- a card: black ink spreads from the cursor, the card tilts, the picture lifts ---------- */

// const placement = [
//   "md:col-start-1 md:row-span-2 md:row-start-1",
//   "md:col-start-2 md:row-start-1",
//   "md:col-start-3 md:row-start-1",
//   "md:col-start-2 md:row-start-2",
//   "md:col-start-3 md:row-start-2",
// ];

// function Card({ area, index, shown, scrollDriven }: { area: ExpertiseArea; index: number; shown: boolean; scrollDriven: boolean }) {
//   const reduceMotion = useReducedMotion();
//   const tiltRef = useRef<HTMLDivElement>(null);
//   const [ink, setInk] = useState({ on: false, x: 0, y: 0, scale: 60 });
//   const large = index === 0;
//   const Visual = visuals[area.visual];

//   function inkFrom(el: HTMLElement, clientX: number, clientY: number, on: boolean) {
//     const r = el.getBoundingClientRect();
//     const x = clientX - r.left;
//     const y = clientY - r.top;
//     const reach = Math.hypot(Math.max(x, r.width - x), Math.max(y, r.height - y));
//     setInk({ on, x, y, scale: (reach * 2) / 20 + 1 });
//   }
//   function onMove(e: MouseEvent<HTMLDivElement>) {
//     if (reduceMotion || !tiltRef.current) return;
//     const r = e.currentTarget.getBoundingClientRect();
//     const px = (e.clientX - r.left) / r.width - 0.5;
//     const py = (e.clientY - r.top) / r.height - 0.5;
//     tiltRef.current.style.transform = `rotateY(${px * 5}deg) rotateX(${-py * 5}deg)`;
//   }
//   function onLeave(e: MouseEvent<HTMLDivElement>) {
//     if (tiltRef.current) tiltRef.current.style.transform = "";
//     inkFrom(e.currentTarget, e.clientX, e.clientY, false);
//   }
//   function onFocus(e: FocusEvent<HTMLDivElement>) {
//     const r = e.currentTarget.getBoundingClientRect();
//     inkFrom(e.currentTarget, r.left + r.width / 2, r.top + r.height / 2, true);
//   }
//   const on = ink.on;

//   return (
//     <motion.li
//       className={`${placement[index] ?? ""} ${large ? "min-h-[420px] md:min-h-0" : "min-h-[330px] md:min-h-0"}`}
//       initial={reduceMotion ? false : { opacity: 0, y: 34, scale: 0.96 }}
//       // On computers the cards appear one by one as you scroll; on phones, as they come into view.
//       animate={scrollDriven ? (shown ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 34, scale: 0.96 }) : undefined}
//       whileInView={scrollDriven ? undefined : { opacity: 1, y: 0, scale: 1 }}
//       viewport={{ once: true, amount: 0.2 }}
//       transition={{ duration: 0.7, ease, delay: scrollDriven ? 0 : index * 0.1 }}
//     >
//       <div
//         ref={tiltRef}
//         tabIndex={0}
//         onMouseEnter={(e) => inkFrom(e.currentTarget, e.clientX, e.clientY, true)}
//         onMouseMove={onMove}
//         onMouseLeave={onLeave}
//         onFocus={onFocus}
//         onBlur={() => setInk((s) => ({ ...s, on: false }))}
//         className="relative h-full overflow-hidden rounded-3xl bg-surface p-[clamp(16px,2.6vh,28px)] transition-transform duration-150 ease-linear"
//       >
//         <span
//           aria-hidden="true"
//           className="pointer-events-none absolute size-5 rounded-full bg-ink transition-transform duration-[650ms] ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none"
//           style={{ left: ink.x, top: ink.y, transform: `translate(-50%, -50%) scale(${on ? ink.scale : 0})` }}
//         />
//         <span
//           aria-hidden="true"
//           className={`absolute right-6 top-7 font-condensed text-xs tracking-[0.2em] transition-colors duration-300 ${on ? "text-[#5fc9bc]" : "text-accent"}`}
//         >
//           {String(index + 1).padStart(2, "0")}
//         </span>
//         <div className="relative">
//           <h3
//             className={`font-condensed font-bold uppercase leading-none transition-colors duration-300 ${
//               large ? "text-[clamp(34px,min(4vw,6vh),60px)]" : "text-[clamp(26px,min(2.8vw,4.6vh),44px)]"
//             } ${on ? "text-white" : "text-ink"}`}
//           >
//             {area.name}
//           </h3>
//           <p className={`mt-2 max-w-[30ch] text-sm leading-snug transition-colors duration-300 ${on ? "text-[#cfcfcf]" : "text-muted"}`}>
//             {area.description}
//           </p>
//           <p
//             className={`mt-3 text-[11px] uppercase tracking-[0.12em] transition-colors duration-300 ${on ? "text-[#9a9a9a]" : "text-muted"}`}
//           >
//             {area.tools.join(" · ")}
//           </p>
//         </div>
//         <Visual on={on} />
//       </div>
//     </motion.li>
//   );
// }

// // true on computer-sized screens (where the section holds in place)
// const desktopQuery = "(min-width: 768px)";
// function subscribe(cb: () => void) {
//   const mq = window.matchMedia(desktopQuery);
//   mq.addEventListener("change", cb);
//   return () => mq.removeEventListener("change", cb);
// }

// export default function Expertise() {
//   const sectionRef = useRef<HTMLElement>(null);
//   const reduceMotion = useReducedMotion();
//   const isDesktop = useSyncExternalStore(subscribe, () => window.matchMedia(desktopQuery).matches, () => true);
//   const scrollDriven = isDesktop && !reduceMotion;

//   // While the section holds in place, each part of the scroll reveals one more card.
//   // All five are visible by 60% of the way, then the page stays a bit longer so you can look around.
//   const [revealed, setRevealed] = useState(1);
//   const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
//   useMotionValueEvent(scrollYProgress, "change", (p) => {
//     const n = Math.min(expertise.areas.length, 1 + Math.floor(p / 0.15));
//     setRevealed((r) => (r === n ? r : n));
//   });

//   return (
//     <section ref={sectionRef} id="expertise" aria-labelledby="expertise-title" className="relative md:h-[250vh]">
//       <div className="flex min-h-svh flex-col justify-center md:sticky md:top-0 md:h-svh">
//       <div className="w-full px-5 py-16 sm:px-8 md:py-[clamp(20px,4vh,48px)]">
//         <div className="grid items-end gap-8 md:grid-cols-2">
//           <div>
//             <p className="font-condensed text-xs uppercase tracking-[0.3em] text-muted sm:text-sm">{expertise.label}</p>
//             <h2
//               id="expertise-title"
//               className="mt-2 font-condensed text-[clamp(2.2rem,min(5vw,8vh),4.4rem)] font-bold uppercase leading-[0.95]"
//             >
//               {expertise.headline[0]}
//               <br />
//               <span className="font-normal text-[#8a8a8a]">{expertise.headline[1]}</span>
//             </h2>
//           </div>
//           <p className="max-w-[30rem] text-[clamp(15px,1.3vw,18px)] leading-relaxed text-muted md:justify-self-end">
//             {expertise.intro}
//           </p>
//         </div>

//         <ul className="mt-[clamp(16px,3vh,32px)] grid gap-3 [perspective:1100px] md:grid-cols-3 md:grid-rows-[repeat(2,minmax(150px,calc((100svh_-_clamp(180px,30vh,300px))/2)))]">
//           {expertise.areas.map((area, i) => (
//             <Card key={area.name} area={area} index={i} shown={!scrollDriven || i < revealed} scrollDriven={scrollDriven} />
//           ))}
//         </ul>

//         <p className="mt-[clamp(10px,2vh,24px)] font-condensed text-xs uppercase leading-relaxed tracking-[0.2em] text-muted sm:text-sm">
//           Certified: {expertise.certifications.join(" · ")}
//         </p>
//       </div>
//       </div>
//     </section>
//   );
// }
"use client";

import { useRef, useState, useSyncExternalStore, type FocusEvent, type MouseEvent, type ReactNode } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { expertise, type ExpertiseArea } from "@/data/content";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
const mono = "font-[ui-monospace,SFMono-Regular,Menlo,Consolas,monospace]";

/* ---------- the small live pictures inside each card ---------- */

function Lift({ on, className, children }: { on: boolean; className: string; children: ReactNode }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute transition-[transform,box-shadow,background-color,border-color,color] duration-[600ms] ease-[cubic-bezier(.22,1,.36,1)] ${
        on ? "-translate-y-2 shadow-[0_18px_40px_rgba(0,0,0,.35)]" : "shadow-[0_10px_30px_rgba(0,0,0,.08)]"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function TermRow({ r, i, isNew, on }: { r: string[]; i: number; isNew?: boolean; on: boolean }) {
  return (
    <div
      style={isNew ? { transitionDelay: on ? `${i * 300}ms` : "0ms" } : undefined}
      className={`grid grid-cols-[44px_1fr_34px] gap-2 whitespace-nowrap leading-[1.9] ${
        isNew ? `transition-[opacity,transform] duration-300 ${on ? "translate-y-0 opacity-100" : "translate-y-1.5 opacity-0"}` : ""
      }`}
    >
      <span className={`transition-colors duration-500 ${on ? "text-accent" : "text-[#5fc9bc]"}`}>{r[0]}</span>
      <span>{r[1]}</span>
      <span className={`transition-colors duration-500 ${on ? "text-[#1f7a3a]" : "text-[#9be3a6]"}`}>{r[2]}</span>
    </div>
  );
}

function Terminal({ on }: { on: boolean }) {
  const rows = [
    ["GET", "/api/accounts", "200"],
    ["POST", "/api/payments", "201"],
    ["GET", "/actuator/health", "200"],
  ];
  const extra = [
    ["PUT", "/api/profile", "200"],
    ["GET", "/api/orders", "200"],
  ];
  return (
    <Lift
      on={on}
      className={`bottom-7 left-7 -right-4 overflow-hidden rounded-2xl border text-xs ${mono} ${
        on ? "border-[#e6e6e6] bg-white text-ink" : "border-[#2a2a2a] bg-[#161616] text-[#ddd]"
      }`}
    >
      <div className={`flex items-center gap-1.5 border-b px-3.5 py-2.5 text-[11px] transition-colors duration-500 ${on ? "border-[#ececec] text-[#737373]" : "border-[#262626] text-[#8a8a8a]"}`}>
        <i className={`size-2 rounded-full transition-colors duration-500 ${on ? "bg-[#d4d4d4]" : "bg-[#3a3a3a]"}`} />
        <i className={`size-2 rounded-full transition-colors duration-500 ${on ? "bg-[#d4d4d4]" : "bg-[#3a3a3a]"}`} />
        <i className={`size-2 rounded-full transition-colors duration-500 ${on ? "bg-[#d4d4d4]" : "bg-[#3a3a3a]"}`} />
        <span className="ml-2">spring-boot · api · sample</span>
      </div>
      <div className="px-3.5 pb-3 pt-2.5">
        {rows.map((r, i) => (
          <TermRow key={r[1]} r={r} i={i} on={on} />
        ))}
        {extra.map((r, i) => (
          <TermRow key={r[1]} r={r} i={i} isNew on={on} />
        ))}
        <div className="mt-1">
          ›{" "}
          <span className={`inline-block h-[13px] w-[7px] translate-y-0.5 animate-[blink_1s_steps(1)_infinite] motion-reduce:animate-none ${on ? "bg-accent" : "bg-[#5fc9bc]"}`} />
        </div>
      </div>
    </Lift>
  );
}

function Pipeline({ on }: { on: boolean }) {
  const steps = ["Build", "Test", "Scan", "Deploy"];
  return (
    <Lift on={on} className="bottom-6 left-[42%] right-6 rounded-2xl border border-[#ececec] bg-white px-4 py-3.5">
      <div className={`mb-3 text-[11px] text-[#8a8a8a] ${mono}`}>pipeline · main</div>
      <div className="relative flex justify-between">
        <span className="absolute inset-x-2 top-2 h-0.5 bg-[#ececec]" />
        <span
          className={`absolute left-2 top-2 h-0.5 bg-accent transition-[width] duration-[1100ms] ease-[cubic-bezier(.22,1,.36,1)] ${
            on ? "w-[calc(100%_-_16px)]" : "w-0"
          }`}
        />
        {steps.map((s, i) => (
          <div key={s} className="relative z-10 flex flex-col items-center gap-1.5 text-[10px] text-[#777]">
            <b
              style={{ transitionDelay: on ? `${[0, 250, 500, 800][i]}ms` : "0ms" }}
              className={`size-[18px] rounded-full border-2 transition-colors duration-300 ${
                on ? "border-accent bg-accent" : "border-[#d6d6d6] bg-white"
              }`}
            />
            {s}
          </div>
        ))}
      </div>
    </Lift>
  );
}

function Cluster({ on }: { on: boolean }) {
  return (
    <Lift on={on} className="bottom-6 left-[42%] right-6 rounded-2xl border border-[#ececec] bg-white px-3.5 py-3">
      <div className={`mb-2.5 text-[11px] text-[#8a8a8a] ${mono}`}>cluster · sample</div>
      <div className="grid grid-cols-3 gap-2">
        {[0, 1, 2].map((n) => (
          <div key={n} className="grid grid-cols-3 gap-[5px] rounded-lg border border-[#ececec] p-2">
            {[0, 1, 2, 3, 4, 5].map((k) => (
              <span
                key={k}
                style={{ transitionDelay: on ? `${(n * 6 + k) * 40}ms` : "0ms" }}
                className={`h-2.5 rounded-[3px] transition-colors duration-300 ${on ? "bg-accent" : "bg-[#e6e6e6]"}`}
              />
            ))}
          </div>
        ))}
      </div>
    </Lift>
  );
}

function Browser({ on }: { on: boolean }) {
  const bars = [40, 62, 48, 80, 66, 92];
  return (
    <Lift on={on} className="-bottom-3.5 -right-4 left-[40%] h-[62%] overflow-hidden rounded-tl-2xl border border-[#ececec] bg-white">
      <div className="flex gap-1.5 border-b border-[#f0f0f0] px-3 py-2.5">
        <i className="size-2 rounded-full bg-[#e2e2e2]" />
        <i className="size-2 rounded-full bg-[#e2e2e2]" />
        <i className="size-2 rounded-full bg-[#e2e2e2]" />
      </div>
      <div className="grid grid-cols-[60px_1fr] gap-2.5 p-3">
        <div className="space-y-2">
          <span className="block h-2 rounded-[3px] bg-[#efefef]" />
          <span className="block h-2 rounded-[3px] bg-[#efefef]" />
          <span className="block h-2 rounded-[3px] bg-[#efefef]" />
          <span className="block h-2 w-[70%] rounded-[3px] bg-[#efefef]" />
        </div>
        <div className="flex h-24 items-end gap-[7px] border-b border-[#f0f0f0]">
          {bars.map((h, k) => (
            <span
              key={k}
              style={{ height: `${h}%`, transitionDelay: on ? `${k * 60}ms` : "0ms" }}
              className={`flex-1 origin-bottom rounded-t-[3px] transition-[transform,background-color] duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${
                on ? "scale-y-100 bg-accent" : "scale-y-[.45] bg-[#d9d9d9]"
              }`}
            />
          ))}
        </div>
      </div>
    </Lift>
  );
}

function Editor({ on }: { on: boolean }) {
  return (
    <Lift
      on={on}
      className={`bottom-6 left-[42%] right-6 rounded-2xl border px-3.5 py-3 text-[11px] leading-[1.85] ${mono} ${
        on ? "border-[#e6e6e6] bg-white text-ink" : "border-[#2a2a2a] bg-[#161616] text-[#cfcfcf]"
      }`}
    >
      <span className={`transition-colors duration-500 ${on ? "text-[#8a8a8a]" : "text-[#6d6d6d]"}`}>{"// reusable component"}</span>
      <br />
      <span className={`transition-colors duration-500 ${on ? "text-accent" : "text-[#5fc9bc]"}`}>@Component</span>({"{"}
      <br />
      &nbsp;&nbsp;selector: <span className={`transition-colors duration-500 ${on ? "text-[#9a5b00]" : "text-[#e6c07b]"}`}>&apos;app-card&apos;</span>,
      <br />
      <span className={`-mx-3.5 block px-3.5 transition-colors duration-500 ${on ? "bg-[rgba(13,107,98,.1)]" : ""}`}>
        &nbsp;&nbsp;changeDetection: <span className={`transition-colors duration-500 ${on ? "text-accent" : "text-[#5fc9bc]"}`}>OnPush</span>
      </span>
      {"}"})
    </Lift>
  );
}

const visuals = { terminal: Terminal, pipeline: Pipeline, cluster: Cluster, browser: Browser, editor: Editor };

/* ---------- a card: black ink spreads from the cursor, the card tilts, the picture lifts ---------- */

const placement = [
  "md:col-start-1 md:row-span-2 md:row-start-1",
  "md:col-start-2 md:row-start-1",
  "md:col-start-3 md:row-start-1",
  "md:col-start-2 md:row-start-2",
  "md:col-start-3 md:row-start-2",
];

function Card({ area, index, shown, scrollDriven }: { area: ExpertiseArea; index: number; shown: boolean; scrollDriven: boolean }) {
  const reduceMotion = useReducedMotion();
  const tiltRef = useRef<HTMLDivElement>(null);
  const [ink, setInk] = useState({ on: false, x: 0, y: 0, scale: 60 });
  const large = index === 0;
  const Visual = visuals[area.visual];

  function inkFrom(el: HTMLElement, clientX: number, clientY: number, on: boolean) {
    const r = el.getBoundingClientRect();
    const x = clientX - r.left;
    const y = clientY - r.top;
    const reach = Math.hypot(Math.max(x, r.width - x), Math.max(y, r.height - y));
    setInk({ on, x, y, scale: (reach * 2) / 20 + 1 });
  }
  function onMove(e: MouseEvent<HTMLDivElement>) {
    if (reduceMotion || !tiltRef.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    tiltRef.current.style.transform = `rotateY(${px * 5}deg) rotateX(${-py * 5}deg)`;
  }
  function onLeave(e: MouseEvent<HTMLDivElement>) {
    if (tiltRef.current) tiltRef.current.style.transform = "";
    inkFrom(e.currentTarget, e.clientX, e.clientY, false);
  }
  function onFocus(e: FocusEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    inkFrom(e.currentTarget, r.left + r.width / 2, r.top + r.height / 2, true);
  }
  const on = ink.on;

  return (
    <motion.li
      className={`${placement[index] ?? ""} ${large ? "min-h-[420px] md:min-h-0" : "min-h-[330px] md:min-h-0"}`}
      initial={reduceMotion ? false : { opacity: 0, y: 34, scale: 0.96 }}
      // On computers the cards appear one by one as you scroll; on phones, as they come into view.
      animate={scrollDriven ? (shown ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 34, scale: 0.96 }) : undefined}
      whileInView={scrollDriven ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease, delay: scrollDriven ? 0 : index * 0.1 }}
    >
      <div
        ref={tiltRef}
        tabIndex={0}
        onMouseEnter={(e) => inkFrom(e.currentTarget, e.clientX, e.clientY, true)}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onFocus={onFocus}
        onBlur={() => setInk((s) => ({ ...s, on: false }))}
        className="relative h-full overflow-hidden rounded-3xl bg-surface p-[clamp(16px,2.6vh,28px)] transition-transform duration-150 ease-linear"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute size-5 rounded-full bg-ink transition-transform duration-[650ms] ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none"
          style={{ left: ink.x, top: ink.y, transform: `translate(-50%, -50%) scale(${on ? ink.scale : 0})` }}
        />
        <span
          aria-hidden="true"
          className={`absolute right-6 top-7 font-condensed text-xs tracking-[0.2em] transition-colors duration-300 ${on ? "text-[#5fc9bc]" : "text-accent"}`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="relative">
          <h3
            className={`font-condensed font-bold uppercase leading-none transition-colors duration-300 ${
              large ? "text-[clamp(34px,min(4vw,6vh),60px)]" : "text-[clamp(26px,min(2.8vw,4.6vh),44px)]"
            } ${on ? "text-white" : "text-ink"}`}
          >
            {area.name}
          </h3>
          <p className={`mt-2 max-w-[30ch] text-sm leading-snug transition-colors duration-300 ${on ? "text-[#cfcfcf]" : "text-muted"}`}>
            {area.description}
          </p>
          <p
            className={`mt-3 text-[11px] uppercase tracking-[0.12em] transition-colors duration-300 ${on ? "text-[#9a9a9a]" : "text-muted"}`}
          >
            {area.tools.join(" · ")}
          </p>
        </div>
        <Visual on={on} />
      </div>
    </motion.li>
  );
}

// true on computer-sized screens (where the section holds in place)
const desktopQuery = "(min-width: 768px)";
function subscribe(cb: () => void) {
  const mq = window.matchMedia(desktopQuery);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

export default function Expertise() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const isDesktop = useSyncExternalStore(subscribe, () => window.matchMedia(desktopQuery).matches, () => true);
  const scrollDriven = isDesktop && !reduceMotion;

  // While the section holds in place, each part of the scroll reveals one more card.
  // All five are visible by 60% of the way, then the page stays a bit longer so you can look around.
  const [revealed, setRevealed] = useState(1);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const n = Math.min(expertise.areas.length, 1 + Math.floor(p / 0.15));
    setRevealed((r) => (r === n ? r : n));
  });

  return (
    <section ref={sectionRef} id="expertise" aria-labelledby="expertise-title" className="relative md:h-[250vh]">
      <div className="flex min-h-svh flex-col justify-center md:sticky md:top-0 md:h-svh">
      <div className="w-full px-5 py-16 sm:px-8 md:py-[clamp(20px,4vh,48px)]">
        <div className="grid items-end gap-8 md:grid-cols-2">
          <div>
            <p className="font-condensed text-xs uppercase tracking-[0.3em] text-muted sm:text-sm">{expertise.label}</p>
            <h2
              id="expertise-title"
              className="mt-2 font-condensed text-[clamp(2.2rem,min(5vw,8vh),4.4rem)] font-bold uppercase leading-[0.95]"
            >
              {expertise.headline[0]}
              <br />
              <span className="font-normal text-[#8a8a8a]">{expertise.headline[1]}</span>
            </h2>
          </div>
          <p className="max-w-[30rem] text-[clamp(15px,1.3vw,18px)] leading-relaxed text-muted md:justify-self-end">
            {expertise.intro}
          </p>
        </div>

        <ul className="mt-[clamp(16px,3vh,32px)] grid gap-3 [perspective:1100px] md:grid-cols-3 md:grid-rows-[repeat(2,minmax(150px,calc((100svh_-_clamp(180px,30vh,300px))/2)))]">
          {expertise.areas.map((area, i) => (
            <Card key={area.name} area={area} index={i} shown={!scrollDriven || i < revealed} scrollDriven={scrollDriven} />
          ))}
        </ul>

        <p className="mt-[clamp(10px,2vh,24px)] font-condensed text-xs uppercase leading-relaxed tracking-[0.2em] text-muted sm:text-sm">
          Certified: {expertise.certifications.join(" · ")}
        </p>
      </div>
      </div>
    </section>
  );
}
