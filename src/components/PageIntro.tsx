"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function PageIntro() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      if (ref.current) ref.current.style.display = "none";
      return;
    }
    const el = ref.current;
    if (!el) return;

    if (typeof window !== "undefined" && sessionStorage.getItem("keba-intro-seen")) {
      el.style.display = "none";
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        if (el) el.style.display = "none";
        document.body.style.overflow = "";
        sessionStorage.setItem("keba-intro-seen", "1");
      },
    });

    tl.set(el, { autoAlpha: 1 });
    tl.from("[data-intro-logo]", {
      scale: 0.4, opacity: 0, duration: 1.1, ease: "power4.out",
    });
    tl.from("[data-intro-line]", {
      scaleX: 0, transformOrigin: "left center", duration: 0.9, ease: "power3.inOut",
    }, "-=0.4");
    tl.from("[data-intro-caption] > span", {
      yPercent: 110, duration: 0.9, ease: "power3.out", stagger: 0.04,
    }, "-=0.6");
    tl.to("[data-intro-mark]", {
      opacity: 0, y: -24, duration: 0.7, ease: "power2.in",
    }, "+=0.4");
    tl.to("[data-intro-top]", {
      yPercent: -100, duration: 1.05, ease: "power4.inOut",
    }, "-=0.3");
    tl.to("[data-intro-bottom]", {
      yPercent: 100, duration: 1.05, ease: "power4.inOut",
    }, "<");

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-[999] pointer-events-none"
      style={{ visibility: "hidden" }}
      aria-hidden
    >
      <div data-intro-top className="absolute top-0 left-0 right-0 h-1/2 bg-[var(--color-ink)]" />
      <div data-intro-bottom className="absolute bottom-0 left-0 right-0 h-1/2 bg-[var(--color-ink)]" />
      <div data-intro-mark className="absolute inset-0 flex items-center justify-center flex-col gap-8 text-[var(--color-paper)]">
        <div data-intro-logo className="relative w-[40vw] h-[40vw] max-w-[260px] max-h-[260px]">
          <Image src="/logo.png" alt="Keba" fill sizes="260px" priority className="object-contain" />
        </div>
        <div data-intro-line className="h-px w-32 bg-[var(--color-cognac)]" />
        <div data-intro-caption className="eyebrow text-[var(--color-mushroom)] flex gap-1">
          {"KEBA · SCHNEIDEREI".split("").map((c, i) => (
            <span key={i} className="mask-inline">
              <span className="inline-block">{c === " " ? "\u00A0" : c}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
