"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { contact, site } from "@/data/content";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* The address is only put together in the browser, when someone asks for it. */
const emailAddress = () => `${site.emailParts.name}@${site.emailParts.domain}`;

// Paste your Web3Forms access key into .env.local as NEXT_PUBLIC_WEB3FORMS_KEY (see README).
const FORM_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

const Arrow = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

const icons: Record<string, ReactNode> = {
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>,
  github: <path d="M9 19c-4 1.5-4-2-6-2.5M15 21v-3.5a3 3 0 0 0-.9-2.3c3-.3 6-1.5 6-6.7a5.2 5.2 0 0 0-1.4-3.6 4.8 4.8 0 0 0-.1-3.6s-1.1-.3-3.7 1.4a12.7 12.7 0 0 0-6.6 0C5.7 1 4.6 1.3 4.6 1.3a4.8 4.8 0 0 0-.1 3.6A5.2 5.2 0 0 0 3 8.5c0 5.2 3 6.4 6 6.7a3 3 0 0 0-.9 2.3V21" />,
  medium: <path d="M2 4h7a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H2zM22 4h-7a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h8z" />,
  linkedin: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" /></>,
};

function Icon({ name }: { name: string }) {
  return (
    <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-[10px] border border-[#333] text-[#cfcfcf] transition-colors duration-300 group-hover:border-[#5fc9bc] group-hover:bg-[#171717] group-hover:text-[#5fc9bc] group-focus-visible:border-[#5fc9bc] group-focus-visible:text-[#5fc9bc]">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        {icons[name]}
      </svg>
    </span>
  );
}

function CopyButton({ text, small }: { text: string; small?: boolean }) {
  const [tip, setTip] = useState("");
  function copy() {
    navigator.clipboard?.writeText(text).then(
      () => setTip("Copied"),
      () => setTip("Press Ctrl+C"),
    );
    window.setTimeout(() => setTip(""), 1600);
  }
  return (
    <button
      type="button"
      onClick={copy}
      aria-label="Copy email address"
      className={`relative grid place-items-center rounded-xl border border-[#3a3a3a] text-[#ddd] transition-colors hover:border-[#5fc9bc] hover:bg-[#1b1b1b] focus-visible:border-[#5fc9bc] ${small ? "size-10" : "size-[50px]"}`}
    >
      <span role="status" className={`absolute bottom-[calc(100%_+_8px)] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#5fc9bc] px-2 py-1 text-xs text-[#08201d] transition-opacity ${tip ? "opacity-100" : "opacity-0"}`}>
        {tip}
      </span>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="9" y="9" width="12" height="12" rx="2" />
        <path d="M5 15V5a2 2 0 0 1 2-2h10" />
      </svg>
    </button>
  );
}

/* A floating-label field. */
function Field({ id, label, error, textarea, ...rest }: { id: string; label: string; error: string; textarea?: boolean } & Record<string, string | boolean>) {
  const base = `peer w-full resize-y border-0 border-b bg-transparent pb-2.5 pt-[22px] text-[17px] text-white outline-none transition-colors ${error ? "border-[#e8836f]" : "border-[#3a3a3a]"}`;
  return (
    <div className="group relative mb-[clamp(8px,1.6vh,24px)]">
      {textarea ? (
        <textarea id={id} name={id} rows={3} placeholder=" " aria-invalid={Boolean(error)} aria-describedby={`${id}-err`} className={`${base} min-h-[84px]`} {...rest} />
      ) : (
        <input id={id} name={id} placeholder=" " aria-invalid={Boolean(error)} aria-describedby={`${id}-err`} className={base} {...rest} />
      )}
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-0 top-[22px] origin-top-left text-[17px] text-[#8a8a8a] transition-[transform,color] duration-300 peer-focus:-translate-y-5 peer-focus:scale-[.72] peer-focus:text-[#5fc9bc] peer-[:not(:placeholder-shown)]:-translate-y-5 peer-[:not(:placeholder-shown)]:scale-[.72] peer-[:not(:placeholder-shown)]:text-[#5fc9bc]"
      >
        {label}
      </label>
      <span aria-hidden="true" className="absolute inset-x-0 top-[calc(100%_-_1.5px)] h-[1.5px] origin-left scale-x-0 bg-[#5fc9bc] transition-transform duration-500 group-focus-within:scale-x-100" />
      <span id={`${id}-err`} aria-live="polite" className="mt-1.5 block min-h-[18px] text-xs text-[#f0a090]">
        {error}
      </span>
    </div>
  );
}

type Status = "idle" | "sending" | "sent" | "error";

function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const next = {
      name: name.length > 1 ? "" : "Please add your name.",
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "" : "Please add a valid email so I can reply.",
      message: message.length > 4 ? "" : "Please write a short message.",
    };
    setErrors(next);
    const firstBad = (Object.keys(next) as (keyof typeof next)[]).find((k) => next[k]);
    if (firstBad) {
      formRef.current?.querySelector<HTMLElement>(`#${firstBad}`)?.focus();
      return;
    }
    if (!FORM_KEY) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: FORM_KEY, subject: `Portfolio message from ${name}`, name, email, message }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      setStatus("sent");
      formRef.current?.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="mt-[clamp(16px,4vh,44px)] max-w-[40rem]">
      <div className="grid gap-x-6 md:grid-cols-2">
        <Field id="name" label="Your name" error={errors.name} type="text" autoComplete="name" />
        <Field id="email" label="Your email" error={errors.email} type="email" autoComplete="email" />
      </div>
      <Field id="message" label="Message" error={errors.message} textarea />
      <button
        type="submit"
        disabled={status === "sending"}
        className="group inline-flex items-center gap-3.5 rounded-full bg-white px-7 py-4 font-condensed text-base uppercase tracking-[0.2em] text-[#111] transition-colors hover:bg-[#5fc9bc] hover:text-[#08201d] focus-visible:outline-[#5fc9bc] disabled:opacity-70"
      >
        {status === "sending" ? "Sending…" : status === "sent" ? "Sent" : "Send message"}
        <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
          <Arrow />
        </span>
      </button>
      <p role="status" className="mt-5 min-h-6 text-base">
        {status === "sent" && <span className="text-[#5fc9bc]">Thanks for writing. I&apos;ll get back to you soon.</span>}
        {status === "error" && (
          <span className="text-[#f0a090]">Sorry, the message couldn&apos;t be sent. Please use &quot;Send me an email&quot; instead.</span>
        )}
      </p>
    </form>
  );
}

function LocalTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", { timeZone: contact.timeZone, hour: "numeric", minute: "2-digit" });
    const tick = () => setTime(fmt.format(new Date()));
    const first = window.setTimeout(tick, 0);
    const id = window.setInterval(tick, 30000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, []);
  return <span suppressHydrationWarning>{time || "--:--"}</span>;
}

function EmailReveal() {
  const [open, setOpen] = useState(false);
  const address = open ? emailAddress() : "";
  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="email-reveal"
        onClick={() => setOpen((v) => !v)}
        className="group flex w-full items-center gap-4 py-[17px] text-left text-[17px] text-[#eaeaea]"
      >
        <Icon name="mail" />
        <span className="transition-[transform,color] duration-300 group-hover:translate-x-2 group-hover:text-white">Send me an email</span>
        <span aria-hidden="true" className={`ml-auto text-[#7d7d7d] transition-[transform,color] duration-300 group-hover:text-[#5fc9bc] ${open ? "rotate-45 text-[#5fc9bc]" : ""}`}>
          +
        </span>
      </button>
      <div id="email-reveal" hidden={!open}>
        {open && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }} className="flex flex-wrap items-center gap-3.5 pb-4 pl-14">
            <a href={`mailto:${address}`} className="inline-flex items-center gap-3 border-b-[1.5px] border-[#5fc9bc] pb-1.5 text-base text-white">
              {address}
              <Arrow size={18} />
            </a>
            <CopyButton text={address} small />
          </motion.div>
        )}
      </div>
    </>
  );
}

function LinkRow({ href, icon, label }: { href: string; icon: string; label: string }) {
  if (!href) {
    return (
      <span className="flex items-center gap-4 py-[17px] text-[17px] text-[#7d7d7d]" title="Link coming soon">
        <Icon name={icon} />
        {label}
        <span className="ml-auto text-xs">coming soon</span>
      </span>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 py-[17px] text-[17px] text-[#eaeaea]">
      <Icon name={icon} />
      <span className="transition-[transform,color] duration-300 group-hover:translate-x-2 group-hover:text-white">{label}</span>
      <span className="sr-only"> (opens in a new tab)</span>
      <span aria-hidden="true" className="ml-auto text-[#7d7d7d] transition-[transform,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#5fc9bc]">
        ↗
      </span>
    </a>
  );
}

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const reduceMotion = useReducedMotion();
  const on = inView || Boolean(reduceMotion);

  const links = [
    { href: site.github, icon: "github", label: "See my code on GitHub" },
    { href: site.medium, icon: "medium", label: "Read my writing on Medium" },
    { href: site.linkedin, icon: "linkedin", label: "Connect with me on LinkedIn" },
  ];

  return (
    <section ref={ref} id="contact" aria-labelledby="contact-title" className="flex min-h-svh flex-col justify-center bg-[#111] px-5 py-[clamp(40px,7vh,90px)] text-[#f2f2f2] sm:px-8">
      <div className="grid gap-16 md:grid-cols-[1.6fr_1fr] md:gap-[clamp(40px,7vw,140px)]">
        <div>
          <p className="font-condensed text-[13px] uppercase tracking-[0.3em] text-[#9a9a9a]">{contact.label}</p>
          <h2 id="contact-title" className="mt-4 font-condensed text-[clamp(2.6rem,min(6.5vw,11vh),6.4rem)] font-bold uppercase leading-[0.95]">
            {contact.headline.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.04em]">
                <motion.span
                  className={`block ${i === 1 ? "text-[#7d7d7d]" : ""}`}
                  initial={false}
                  animate={{ y: on ? "0%" : "105%" }}
                  transition={{ duration: 0.9, ease, delay: i * 0.12 }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h2>
          <motion.p
            className="mt-[clamp(12px,2.5vh,28px)] max-w-[32rem] text-[clamp(16px,1.3vw,19px)] leading-relaxed text-[#bdbdbd]"
            initial={false}
            animate={on ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: 0.7, ease, delay: 0.3 }}
          >
            {contact.sub}
          </motion.p>
          <motion.div initial={false} animate={on ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }} transition={{ duration: 0.7, ease, delay: 0.45 }}>
            <ContactForm />
          </motion.div>
        </div>

        <div className="flex flex-col gap-[clamp(32px,9vh,110px)] pt-9 max-md:gap-12 max-md:pt-0">
          <div className="font-[ui-monospace,SFMono-Regular,Menlo,Consolas,monospace] text-sm leading-[1.9] text-[#bdbdbd]">
            <p>{contact.location}</p>
            <p>
              <span aria-hidden="true" className="mr-2 inline-block size-[7px] animate-[pulse_2s_ease-in-out_infinite] rounded-full bg-[#5fc9bc] motion-reduce:animate-none" />
              <LocalTime /> local time
            </p>
            <p>{contact.availability}</p>
          </div>

          <ul className="border-t border-[#2a2a2a]">
            {[<EmailReveal key="email" />, ...links.map((l) => <LinkRow key={l.label} {...l} />)].map((row, i) => (
              <motion.li
                key={i}
                className="border-b border-[#2a2a2a]"
                initial={false}
                animate={on ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.6, ease, delay: 0.35 + i * 0.08 }}
              >
                {row}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
