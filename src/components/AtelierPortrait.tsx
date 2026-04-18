"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CountUp from "./CountUp";
import type { Locale } from "@/lib/business";
import { t } from "@/lib/dictionary";

gsap.registerPlugin(ScrollTrigger);

interface Props { locale: Locale; }

export default function AtelierPortrait({ locale }: Props) {
  const ref = useRef<HTMLElement>(null);
  const lang = t(locale);

  useGSAP(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-at-eyebrow]", {
        opacity: 0, y: 24, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 70%", toggleActions: "play none none none" },
      });

      const letters = ref.current!.querySelectorAll<HTMLElement>("[data-at-letter]");
      gsap.set(letters, { yPercent: 120, rotate: 6 });
      gsap.to(letters, {
        yPercent: 0, rotate: 0,
        duration: 1.6, ease: "power4.out", stagger: 0.05,
        scrollTrigger: { trigger: "[data-at-title]", start: "top 75%", toggleActions: "play none none none" },
      });

      gsap.from("[data-at-body] > p", {
        opacity: 0, y: 24, duration: 1, ease: "power3.out", stagger: 0.12,
        scrollTrigger: { trigger: "[data-at-body]", start: "top 80%", toggleActions: "play none none none" },
      });

      gsap.from("[data-at-image-mask]", {
        clipPath: "inset(100% 0 0 0)", duration: 1.8, ease: "power4.out",
        scrollTrigger: { trigger: "[data-at-image-mask]", start: "top 85%", toggleActions: "play none none none" },
      });
      gsap.from("[data-at-image-inner]", {
        scale: 1.3, duration: 2.4, ease: "power3.out",
        scrollTrigger: { trigger: "[data-at-image-mask]", start: "top 85%", toggleActions: "play none none none" },
      });
      gsap.to("[data-at-image-inner]", {
        yPercent: -15, ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
      });

      gsap.from("[data-at-stat]", {
        opacity: 0, y: 30, duration: 1, ease: "power3.out", stagger: 0.1,
        scrollTrigger: { trigger: "[data-at-stats]", start: "top 80%", toggleActions: "play none none none" },
      });

      gsap.to("[data-at-bgname]", {
        xPercent: locale === "ar" ? -10 : 10,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
      });
    }, ref);
    return () => ctx.revert();
  }, { scope: ref });

  const titleWords = lang.atelier.title.split(" ");

  const splitLetters = (s: string) =>
    s.split("").map((ch, i) => (
      <span key={i} className="mask-inline">
        <span data-at-letter className="inline-block">{ch === " " ? "\u00A0" : ch}</span>
      </span>
    ));

  return (
    <section ref={ref} id="atelier" className="bg-[var(--color-paper)] section relative overflow-hidden">
      {/* Giant background name */}
      <div
        data-at-bgname
        className="absolute bottom-[-6vw] inset-x-0 pointer-events-none select-none z-0 flex justify-center"
        aria-hidden
      >
        <span className="font-italic-display text-[24vw] leading-none text-[var(--color-paper-deep)] tracking-[-0.04em] whitespace-nowrap">
          Ahmad Keba
        </span>
      </div>

      <div className="wrap relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        <div className="lg:col-span-5 lg:col-start-1 lg:sticky lg:top-28">
          <div data-at-image-mask className="relative aspect-[4/5] overflow-hidden">
            <div data-at-image-inner className="absolute inset-0 will-change-transform">
              <Image
                src="/images/atelier/brother-machine.jpg"
                alt={`${lang.atelier.title} — ${lang.atelier.subtitle}`}
                fill sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
          <p className="caption mt-5 text-[var(--color-ink-mute)]">
            — {lang.atelier.subtitle}
          </p>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <p data-at-eyebrow className="eyebrow mb-8">— {lang.atelier.eyebrow}</p>
          <h2 data-at-title className="font-display text-[clamp(3.5rem,11vw,9rem)] leading-[0.86] tracking-[-0.035em] text-[var(--color-ink)]">
            {titleWords.map((w, i) => (
              <span key={i} className={`mask inline-block ${i > 0 ? "ms-[0.12em]" : ""}`}>
                <span className={`inline-block ${i === 1 ? "font-italic-display text-[var(--color-cognac)]" : ""}`}>
                  {splitLetters(w)}
                </span>
              </span>
            ))}
          </h2>
          <div data-at-body className="mt-10 lg:mt-14 space-y-6 max-w-xl">
            {lang.atelier.body.map((p, i) => (
              <p key={i} className="text-[var(--color-ink-soft)] leading-relaxed text-[1.05rem] text-pretty">{p}</p>
            ))}
          </div>

          <div data-at-stats className="mt-14 lg:mt-20 pt-10 border-t border-[var(--color-rule)] grid grid-cols-2 md:grid-cols-4 gap-8">
            {lang.atelier.stats.map((s, i) => (
              <div key={i} data-at-stat>
                <p className="font-display text-5xl lg:text-6xl text-[var(--color-ink)] tracking-[-0.03em]">
                  <CountUp to={s.n} suffix={s.suffix} locale={locale === "ar" ? "ar-EG" : "de-DE"} />
                </p>
                <p className="eyebrow mt-3 text-[var(--color-ink-mute)]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
