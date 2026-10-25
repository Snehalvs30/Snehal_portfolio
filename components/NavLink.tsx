"use client";

import type { ComponentPropsWithoutRef, MouseEvent } from "react";
import { lenisRef } from "./SmoothScroll";

const HEADER_OFFSET = 80; // px, roughly the sticky header height plus a little air

type Props = ComponentPropsWithoutRef<"a"> & {
  href: string; // an in-page link like "#projects"
  onNavigate?: () => void;
};

// An in-page link that scrolls smoothly (when allowed) and moves keyboard
// focus to the target section, so screen reader and keyboard users land there too.
export default function NavLink({ href, onNavigate, onClick, ...rest }: Props) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (!href.startsWith("#")) return;
    const target = document.getElementById(href.slice(1));
    if (!target) return;

    event.preventDefault();
    const top = Math.max(
      0,
      target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET,
    );
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(top);
    } else {
      window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
    }

    window.history.pushState(null, "", href);
    target.focus({ preventScroll: true });
    onNavigate?.();
  }

  return <a href={href} onClick={handleClick} {...rest} />;
}
