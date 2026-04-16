"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Locale } from "@/lib/business";

gsap.registerPlugin(ScrollTrigger);

interface Props { locale: Locale; }

export default function FabricMarquee({ locale }: Props) {
  const ref = useRef<HTMLElement>(null);

  const row1De = ["Super 150's Wolle", "Cashmere & Seide", "Mohair-Blend", "Leinen aus Irland"];
  const row2De = ["Englischer Flanell", "Venetianischer Satin", "Handgewebte Baumwolle", "Italienische Wolle"];
  const row1Ar = ["صوف سوبر ١٥٠", "كشمير وحرير", "مزيج الموهير", "كتّان إيرلندي"];
  const row2Ar = ["فلانيل إنجليزي", "ساتان فينيسيّ", "قطن منسوج يدوياً", "صوف إيطالي"];

  const row1 = locale === "de" ? row1De : row1Ar;
  const row2 = locale === "de" ? row2De : row2Ar;

  useGSAP(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const a = ref.current!.querySelector<HTMLElement>("[data-mq-a]");
      const b = ref.current!.querySelector<HTMLElement>("[data-mq-b]");
      if (!a || !b) return;

      const baseA = -a.scrollWidth / 2;
      const baseB = -b.scrollWidth / 2;

      gsap.set(a, { x: 0 });
      gsap.set(b, { x: baseB });

      gsap.to(a, {
        x: baseA, duration: 36, ease: "none", repeat: -1,
      });
      gsap.to(b, {
        x: 0, duration: 42, ease: "none", repeat: -1,
      });

      // Extra drift on scroll
      gsap.to(a, {
        xPercent: locale === "ar" ? 8 : -8, ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
      });
      gsap.to(b, {
        xPercent: locale === "ar" ? -8 : 8, ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
      });
    }, ref);
    return () => ctx.revert();
  }, { scope: ref });

  const RowLeft = (items: string[]) => [...items, ...items, ...items];
  const RowRight = (items: string[]) => [...items, ...items, ...items];

  return (
    <section
      ref={ref}
      className="bg-[var(--color-ink)] text-[var(--color-paper)] py-10 lg:py-14 overflow-hidden select-none"
    >
      <div className="overflow-hidden">
        <div data-mq-a className="flex gap-14 lg:gap-20 whitespace-nowrap will-change-transform">
          {RowLeft(row1).map((l, i) => (
            <span key={i} className="font-display text-[clamp(3rem,9vw,8rem)] leading-none tracking-[-0.03em] inline-flex items-center gap-8">
              <span className="font-italic-display text-[var(--color-cognac)]">·</span>{l}
            </span>
          ))}
        </div>
      </div>
      <div className="overflow-hidden mt-4 lg:mt-6">
        <div data-mq-b className="flex gap-14 lg:gap-20 whitespace-nowrap will-change-transform">
          {RowRight(row2).map((l, i) => (
            <span key={i} className="font-italic-display text-[clamp(2.4rem,7vw,6.5rem)] leading-none tracking-[-0.02em] inline-flex items-center gap-8 text-[var(--color-mushroom)]">
              <span className="text-[var(--color-cognac)]">—</span>{l}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
