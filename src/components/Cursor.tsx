"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (reduced || !fine) return;

    const el = ref.current;
    if (!el) return;

    const qx = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3" });
    const qy = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      qx(e.clientX);
      qy(e.clientY);
    };

    const onEnter = (e: Event) => {
      if ((e.target as HTMLElement).closest("[data-cursor-hover]")) {
        el.classList.add("hover");
      }
    };
    const onLeave = (e: Event) => {
      if ((e.target as HTMLElement).closest("[data-cursor-hover]")) {
        el.classList.remove("hover");
      }
    };

    gsap.set(el, { xPercent: -50, yPercent: -50 });
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onEnter, true);
    document.addEventListener("mouseout", onLeave, true);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter, true);
      document.removeEventListener("mouseout", onLeave, true);
    };
  }, []);

  return <div ref={ref} className="custom-cursor" aria-hidden />;
}
