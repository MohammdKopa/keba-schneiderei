"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Locale } from "@/lib/business";

gsap.registerPlugin(ScrollTrigger);

interface Props { locale: Locale; }

export default function Philosophy({ locale }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const lines = ref.current!.querySelectorAll<HTMLElement>("[data-phil-line] > span");
      gsap.set(lines, { yPercent: 120, rotate: 4 });

      ScrollTrigger.create({
        trigger: "[data-phil-pin]",
        start: "top top",
        end: "+=90%",
        pin: true,
        anticipatePin: 1,
      });

      gsap.to(lines, {
        yPercent: 0, rotate: 0,
        duration: 1.6, ease: "power4.out", stagger: 0.2,
        scrollTrigger: { trigger: "[data-phil-pin]", start: "top 70%", toggleActions: "play none none none" },
      });

      gsap.from("[data-phil-byline] > *", {
        opacity: 0, y: 20, duration: 1, ease: "power3.out", stagger: 0.12,
        scrollTrigger: { trigger: "[data-phil-pin]", start: "top 40%", toggleActions: "play none none none" },
      });

      // Background zoom + pan during pin
      gsap.fromTo("[data-phil-bg]",
        { scale: 1.25, xPercent: -6 },
        {
          scale: 1, xPercent: 0, ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        }
      );

      // Giant background word
      gsap.fromTo("[data-phil-word]",
        { xPercent: locale === "ar" ? 30 : -30, opacity: 0 },
        {
          xPercent: locale === "ar" ? -30 : 30, opacity: 0.08, ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, { scope: ref });

  const lines = locale === "de"
    ? [
        "Wir nähen nicht schneller,",
        "weil wir es besser können.",
        "Wir nähen langsamer,",
        "damit wir es besser können.",
      ]
    : [
        "لا نخيط أسرع",
        "لأنّنا أمهرُ.",
        "بل أبطأ,",
        "لنكون أمهر.",
      ];

  const bgWord = locale === "de" ? "Handwerk" : "حرفة";

  return (
    <section
      ref={ref}
      id="philosophie"
      className="relative bg-[var(--color-ink)] text-[var(--color-paper)]"
    >
      <div data-phil-pin className="relative h-[100svh] flex items-center justify-center overflow-hidden">
        <div data-phil-bg className="absolute inset-0 opacity-[0.18] will-change-transform">
          <Image
            src="/images/atelier/tools-flatlay.jpg"
            alt="" fill sizes="100vw" className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-ink)] via-[var(--color-ink)]/30 to-[var(--color-ink)]" />

        {/* Giant background word */}
        <div
          data-phil-word
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          aria-hidden
        >
          <span className="font-italic-display text-[28vw] lg:text-[22vw] leading-none text-[var(--color-cognac)]/30 tracking-[-0.04em] whitespace-nowrap">
            {bgWord}
          </span>
        </div>

        <div className="relative wrap-narrow text-center">
          <div className="eyebrow text-[var(--color-mushroom)] mb-10 lg:mb-14">— {locale === "de" ? "Philosophie" : "فلسفتنا"}</div>
          <blockquote className="font-display text-[clamp(2.4rem,7.5vw,6.5rem)] leading-[1.08] tracking-[-0.025em] text-pretty">
            {lines.map((line, i) => (
              <span key={i} data-phil-line className="mask block">
                <span className={`inline-block ${i === 1 || i === 3 ? "font-italic-display text-[var(--color-cognac)]" : ""}`}>
                  {line}
                </span>
              </span>
            ))}
          </blockquote>
          <div data-phil-byline className="mt-12 lg:mt-16 flex items-center justify-center gap-4">
            <span className="hairline w-10 lg:w-16 bg-[var(--color-mushroom)]" />
            <span className="caption text-[var(--color-mushroom)]">
              {locale === "de" ? "Ahmad Keba · Meisterschneider" : "أحمد كيبا · معلّم خياطة"}
            </span>
            <span className="hairline w-10 lg:w-16 bg-[var(--color-mushroom)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
