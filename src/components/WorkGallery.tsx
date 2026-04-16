"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gallery } from "@/lib/gallery";
import type { Locale } from "@/lib/business";
import { t } from "@/lib/dictionary";

gsap.registerPlugin(ScrollTrigger);

interface Props { locale: Locale; }

export default function WorkGallery({ locale }: Props) {
  const ref = useRef<HTMLElement>(null);
  const lang = t(locale);

  useGSAP(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-work-head] > *", {
        opacity: 0, y: 40, duration: 1.1, ease: "power3.out", stagger: 0.12,
        scrollTrigger: { trigger: "[data-work-head]", start: "top 80%", toggleActions: "play none none none" },
      });

      const items = ref.current!.querySelectorAll<HTMLElement>("[data-work-item]");
      items.forEach((item, i) => {
        const inner = item.querySelector<HTMLElement>("img") || item;
        gsap.from(item, {
          clipPath: "inset(30% 15% 30% 15%)",
          opacity: 0,
          duration: 1.4,
          ease: "power4.out",
          delay: (i % 3) * 0.1,
          scrollTrigger: { trigger: item, start: "top 90%", toggleActions: "play none none none" },
        });
        gsap.from(inner, {
          scale: 1.3,
          duration: 1.8,
          ease: "power3.out",
          delay: (i % 3) * 0.1,
          scrollTrigger: { trigger: item, start: "top 90%", toggleActions: "play none none none" },
        });
      });

      // Drift
      items.forEach((item, i) => {
        const offset = (i % 3 === 1 ? -40 : i % 3 === 2 ? 30 : 0);
        if (offset !== 0) {
          gsap.fromTo(item, { y: -offset }, {
            y: offset,
            ease: "none",
            scrollTrigger: { trigger: item, start: "top bottom", end: "bottom top", scrub: 1 },
          });
        }
      });

      // Huge caption reveals
      const bigs = ref.current!.querySelectorAll<HTMLElement>("[data-work-big]");
      bigs.forEach((b) => {
        gsap.from(b, {
          yPercent: 100, duration: 1.4, ease: "power4.out",
          scrollTrigger: { trigger: b, start: "top 85%", toggleActions: "play none none none" },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, { scope: ref });

  const items = gallery;

  return (
    <section ref={ref} id="galerie" className="bg-[var(--color-paper)] section">
      <div className="wrap">
        <div data-work-head className="flex items-end justify-between flex-wrap gap-6 mb-14 lg:mb-20">
          <div>
            <p className="eyebrow mb-6">— {lang.portfolio.eyebrow}</p>
            <h2 className="font-display text-[clamp(2.8rem,8vw,6.5rem)] leading-[0.94] tracking-[-0.03em] text-[var(--color-ink)] text-balance">
              {locale === "de" ? (
                <>Stücke <span className="font-italic-display text-[var(--color-cognac)]">aus</span> unserem Atelier.</>
              ) : (
                <>قطعٌ <span className="font-italic-display text-[var(--color-cognac)]">من</span> أتولييهنا.</>
              )}
            </h2>
          </div>
          <p className="caption max-w-xs text-pretty">{lang.portfolio.body}</p>
        </div>

        {/* Mobile: stacked with big index */}
        <div className="md:hidden space-y-16">
          {items.slice(0, 8).map((item, i) => (
            <figure key={item.id} className="relative">
              <div className="flex items-end justify-between mb-4">
                <div className="mask overflow-hidden">
                  <span data-work-big className="block font-display text-[34vw] leading-[0.8] tracking-[-0.04em] text-[var(--color-ink)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="caption text-[var(--color-ink-mute)] text-right max-w-[40%]">{item.alt[locale]}</p>
              </div>
              <div data-work-item className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.alt[locale]}
                  fill sizes="100vw"
                  className="object-cover"
                />
              </div>
            </figure>
          ))}
        </div>

        {/* Desktop: asymmetric masonry */}
        <div className="hidden md:grid grid-cols-12 gap-4 lg:gap-6">
          {items.map((item, i) => {
            const cfg = [
              "col-span-7 aspect-[4/5]",
              "col-span-5 mt-16 aspect-[3/4]",
              "col-span-4 aspect-[3/4]",
              "col-span-4 mt-20 aspect-square",
              "col-span-4 aspect-[3/4]",
              "col-span-6 aspect-[4/3]",
              "col-span-6 mt-16 aspect-[4/3]",
              "col-span-3 aspect-[3/4]",
              "col-span-5 mt-10 aspect-[4/5]",
              "col-span-4 aspect-[3/4]",
              "col-span-7 aspect-[16/10]",
              "col-span-5 mt-12 aspect-[4/5]",
            ];
            return (
              <figure
                key={item.id}
                data-work-item
                className={`relative image-frame overflow-hidden ${cfg[i % cfg.length]}`}
                data-cursor-hover
              >
                <Image
                  src={item.src}
                  alt={item.alt[locale]}
                  fill sizes="50vw"
                  className="object-cover"
                />
                <figcaption className="absolute bottom-3 start-3 end-3 flex justify-between items-end">
                  <span className="caption text-[var(--color-paper)] mix-blend-difference text-xs">
                    {item.alt[locale]}
                  </span>
                  <span className="caption text-[var(--color-paper)] mix-blend-difference text-xs">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
