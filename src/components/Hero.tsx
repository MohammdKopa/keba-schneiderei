"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Locale } from "@/lib/business";
import { t } from "@/lib/dictionary";
import { business } from "@/lib/business";

gsap.registerPlugin(ScrollTrigger);

interface Props { locale: Locale; }

export default function Hero({ locale }: Props) {
  const ref = useRef<HTMLElement>(null);
  const lang = t(locale);

  useGSAP(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      // Letter-by-letter reveal
      const letters = ref.current!.querySelectorAll<HTMLElement>("[data-hero-letter]");
      gsap.set(letters, { yPercent: 120, rotate: 8 });
      gsap.to(letters, {
        yPercent: 0,
        rotate: 0,
        duration: 1.6,
        ease: "power4.out",
        stagger: 0.03,
        delay: 0.4,
      });

      gsap.from("[data-hero-fade]", {
        opacity: 0, y: 24, duration: 1.2, ease: "power3.out", stagger: 0.12, delay: 1.4,
      });

      // Background mark drift
      gsap.from("[data-hero-mark]", {
        opacity: 0, scale: 1.3, duration: 2.5, ease: "power3.out", delay: 0.3,
      });
      gsap.to("[data-hero-mark]", {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Media
      gsap.from("[data-hero-media-inner]", {
        scale: 1.35, duration: 2.6, ease: "power2.out",
      });
      gsap.from("[data-hero-media-mask]", {
        clipPath: "inset(100% 0 0 0)", duration: 1.8, ease: "power4.out",
      });

      gsap.to("[data-hero-media-inner]", {
        yPercent: 25, ease: "none",
        scrollTrigger: {
          trigger: ref.current, start: "top top", end: "bottom top", scrub: true,
        },
      });

      // Title exit on scroll
      gsap.to("[data-hero-title]", {
        yPercent: -40, opacity: 0.2, scale: 0.96, ease: "none",
        scrollTrigger: {
          trigger: ref.current, start: "top top", end: "bottom top", scrub: true,
        },
      });

      // Bottom marquee slow drift
      gsap.to("[data-hero-mq]", {
        xPercent: locale === "ar" ? 30 : -30,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current, start: "top top", end: "bottom top", scrub: true,
        },
      });

      // Scroll indicator loop
      gsap.to("[data-hero-scroll]", {
        y: 12, duration: 1.4, ease: "sine.inOut", yoyo: true, repeat: -1,
      });
    }, ref);
    return () => ctx.revert();
  }, { scope: ref });

  const line1 = locale === "de" ? "Maßarbeit" : "تفصيلٌ";
  const line2 = locale === "de" ? "die bleibt" : "يبقى معك";

  const splitLetters = (s: string) =>
    s.split("").map((ch, i) => (
      <span key={i} className="mask-inline">
        <span data-hero-letter className="inline-block">{ch === " " ? "\u00A0" : ch}</span>
      </span>
    ));

  const marqueeText = locale === "de"
    ? ["Maßschneiderei", "· Marl · 2022 —", "Ahmad Keba", "· Handwerk"]
    : ["تفصيل راقٍ", "· مارل · ٢٠٢٢ —", "أحمد كيبا", "· حرفة"];

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] bg-[var(--color-paper)] overflow-hidden"
    >
      {/* Giant background mark */}
      <div
        data-hero-mark
        className="absolute -top-[8vw] left-1/2 -translate-x-1/2 pointer-events-none select-none z-0"
        aria-hidden
      >
        <span className="font-display text-[48vw] lg:text-[32vw] leading-none text-[var(--color-paper-deep)] tracking-[-0.04em]">
          K
        </span>
      </div>

      {/* Top eyebrow */}
      <div className="absolute top-24 sm:top-28 inset-x-0 z-20 wrap">
        <div className="flex items-center justify-between gap-6 flex-wrap">
          <p data-hero-fade className="eyebrow">— {business.address.city} · {business.founded}</p>
          <p data-hero-fade className="eyebrow hidden md:inline">{lang.hero.eyebrow}</p>
        </div>
      </div>

      {/* Full-bleed media */}
      <div data-hero-media-mask className="absolute inset-0 z-[1]">
        <div data-hero-media-inner className="absolute inset-0 will-change-transform">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay muted loop playsInline
            poster="https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=2400&q=90"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
          <Image
            src="https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=2400&q=90"
            alt={locale === "de" ? "Atelier Keba — Maßanfertigung Detail" : "أتولييه كيبا — تفصيل"}
            fill priority sizes="100vw" className="object-cover -z-10"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-paper)]/40 via-[var(--color-paper)]/0 to-[var(--color-paper)]/90" />
        <div className="absolute inset-0 bg-[var(--color-ink)]/15 mix-blend-multiply" />
      </div>

      {/* Title */}
      <div data-hero-title className="relative z-10 wrap pt-[32vh] sm:pt-[38vh] lg:pt-[44vh] pb-28 sm:pb-32">
        <h1 className="font-display text-[clamp(5rem,22vw,17rem)] leading-[0.85] tracking-[-0.04em] text-[var(--color-ink)]">
          <span className="mask block">
            <span className="inline-block">{splitLetters(line1)}</span>
          </span>
          <span className="mask block mt-[-0.05em]">
            <span className="font-italic-display inline-block text-[var(--color-cognac)]">{splitLetters(line2)}.</span>
          </span>
        </h1>

        <div className="mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-12 items-end gap-8">
          <p data-hero-fade className="lg:col-span-5 lg:col-start-1 text-[var(--color-ink-soft)] leading-relaxed text-[1.05rem] lg:text-[1.12rem] max-w-xl text-pretty">
            {lang.hero.lede}
          </p>
          <div data-hero-fade className="lg:col-span-5 lg:col-start-8 flex items-center gap-6 sm:gap-8 justify-start lg:justify-end flex-wrap">
            <a href="#kontakt" className="btn btn-ink" data-cursor-hover>
              <span>{lang.hero.cta}</span>
            </a>
            <a href="#philosophie" className="link-line text-sm text-[var(--color-ink)]" data-cursor-hover>
              {lang.hero.ctaSecondary}
            </a>
          </div>
        </div>
      </div>

      {/* Bottom marquee band */}
      <div className="absolute bottom-16 sm:bottom-20 inset-x-0 z-10 overflow-hidden pointer-events-none">
        <div data-hero-mq className="flex gap-10 whitespace-nowrap will-change-transform">
          {[...marqueeText, ...marqueeText, ...marqueeText].map((w, i) => (
            <span key={i} className={`font-display text-[clamp(3rem,8vw,7rem)] leading-none tracking-[-0.02em] ${
              i % 4 === 1 ? "font-italic-display text-[var(--color-cognac)]" : "text-[var(--color-ink)]"
            }`}>
              {w}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div data-hero-fade className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none">
        <span className="eyebrow text-[var(--color-ink-mute)]">{lang.hero.scrollHint}</span>
        <div data-hero-scroll>
          <svg width="1" height="18" className="text-[var(--color-ink)]">
            <line x1="0.5" y1="0" x2="0.5" y2="18" stroke="currentColor" />
          </svg>
        </div>
      </div>
    </section>
  );
}
