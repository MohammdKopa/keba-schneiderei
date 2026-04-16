"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { reviews, reviewsMeta } from "@/lib/reviews";
import type { Locale } from "@/lib/business";

gsap.registerPlugin(ScrollTrigger);

interface Props { locale: Locale; }

function Stars({ count }: { count: number }) {
  return (
    <span className="inline-flex gap-[3px]" aria-label={`${count} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          data-star
          className={`block w-[12px] h-[1.5px] ${i < count ? "bg-[var(--color-cognac)]" : "bg-[var(--color-rule)]"}`}
        />
      ))}
    </span>
  );
}

export default function Reviews({ locale }: Props) {
  const ref = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-rev-head] > *", {
        opacity: 0, y: 30, duration: 1.1, ease: "power3.out", stagger: 0.12,
        scrollTrigger: { trigger: "[data-rev-head]", start: "top 80%", toggleActions: "play none none none" },
      });

      const featured = ref.current!.querySelector<HTMLElement>("[data-rev-featured]");
      if (featured) {
        gsap.from(featured.querySelectorAll<HTMLElement>("[data-rev-line] > span"), {
          yPercent: 120, rotate: 4,
          duration: 1.4, ease: "power4.out", stagger: 0.12,
          scrollTrigger: { trigger: featured, start: "top 80%", toggleActions: "play none none none" },
        });
        gsap.from(featured.querySelectorAll<HTMLElement>("[data-star]"), {
          scaleX: 0, transformOrigin: "left center",
          duration: 0.6, ease: "power3.out", stagger: 0.08, delay: 0.8,
          scrollTrigger: { trigger: featured, start: "top 80%", toggleActions: "play none none none" },
        });
      }

      const cards = ref.current!.querySelectorAll<HTMLElement>("[data-rev-card]");
      cards.forEach((c, i) => {
        gsap.from(c, {
          opacity: 0, y: 50, duration: 1, ease: "power3.out", delay: (i % 3) * 0.08,
          scrollTrigger: { trigger: c, start: "top 88%", toggleActions: "play none none none" },
        });
      });

      // Giant background word drift
      gsap.to("[data-rev-bg]", {
        xPercent: locale === "ar" ? 10 : -10,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
      });

      // Cursor-follow on featured quote
      const quote = quoteRef.current;
      if (quote && window.matchMedia("(hover: hover)").matches) {
        const qx = gsap.quickTo(quote, "x", { duration: 0.8, ease: "power3" });
        const qy = gsap.quickTo(quote, "y", { duration: 0.8, ease: "power3" });
        const onMove = (e: MouseEvent) => {
          const rect = quote.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          qx((e.clientX - cx) * 0.02);
          qy((e.clientY - cy) * 0.02);
        };
        window.addEventListener("mousemove", onMove);
        return () => window.removeEventListener("mousemove", onMove);
      }

      gsap.from("[data-rev-footer]", {
        opacity: 0, y: 20, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: "[data-rev-footer]", start: "top 90%", toggleActions: "play none none none" },
      });
    }, ref);
    return () => ctx.revert();
  }, { scope: ref });

  const featured = reviews.find((r) => r.featured) || reviews[0];
  const rest = reviews.filter((r) => r !== featured).slice(0, 6);
  const shown = rest.length + 1;

  const headTitle = locale === "de" ? (
    <>Was <span className="font-italic-display text-[var(--color-cognac)]">Kunden</span> sagen.</>
  ) : (
    <>ماذا يقول <span className="font-italic-display text-[var(--color-cognac)]">زبائننا</span>.</>
  );

  const bgWord = locale === "de" ? "Kunst" : "فنّ";
  const headEyebrow = locale === "de" ? "Stimmen" : "آراء";
  const scale = locale === "de" ? "von 5" : "من ٥";
  const moreLabel = locale === "de" ? "Alle Bewertungen auf Google" : "كل التقييمات على Google";

  return (
    <section ref={ref} id="stimmen" className="relative bg-[var(--color-paper-deep)] section overflow-hidden">
      {/* Giant background word */}
      <div
        data-rev-bg
        className="absolute top-1/2 -translate-y-1/2 inset-x-0 pointer-events-none select-none flex justify-center"
        aria-hidden
      >
        <span className="font-italic-display text-[32vw] lg:text-[24vw] leading-none text-[var(--color-cognac)]/10 tracking-[-0.04em] whitespace-nowrap">
          {bgWord}
        </span>
      </div>

      <div className="wrap relative z-10">
        <div data-rev-head className="flex items-end justify-between flex-wrap gap-6 mb-20 lg:mb-28">
          <div className="max-w-2xl">
            <p className="eyebrow mb-6">— {headEyebrow}</p>
            <h2 className="font-display text-[clamp(2.8rem,7vw,6rem)] leading-[0.95] tracking-[-0.03em] text-[var(--color-ink)] text-balance">
              {headTitle}
            </h2>
          </div>
          <div className="flex items-center gap-4 lg:gap-6 flex-wrap">
            <div className="flex items-center gap-3">
              <Stars count={Math.round(reviewsMeta.rating)} />
              <span className="font-display text-4xl text-[var(--color-ink)] tracking-[-0.02em]">
                {reviewsMeta.rating.toFixed(1)}
              </span>
            </div>
            <span className="hairline w-8 hairline-rule" />
            <span className="caption">
              {reviewsMeta.total} {locale === "de" ? "Bewertungen · Google" : "تقييم · Google"}
            </span>
          </div>
        </div>

        {/* Featured */}
        <figure
          ref={quoteRef}
          data-rev-featured
          className="relative mx-auto max-w-5xl text-center mb-28 lg:mb-40 px-4 will-change-transform"
        >
          <svg
            width="72" height="60" viewBox="0 0 60 50"
            className="mx-auto mb-10 text-[var(--color-cognac)]"
            fill="currentColor" aria-hidden
          >
            <path d="M0 50V30C0 13.4 10.8 2.2 24 0l3 7.3c-7.6 1.8-13.6 7.2-14.5 14.7H25V50H0zm35 0V30C35 13.4 45.8 2.2 59 0l3 7.3c-7.6 1.8-13.6 7.2-14.5 14.7H60V50H35z"/>
          </svg>
          <blockquote className="font-display text-[clamp(1.8rem,4.6vw,3.6rem)] leading-[1.18] tracking-[-0.02em] text-[var(--color-ink)] text-pretty">
            {featured.quote[locale].split(". ").map((sentence, i, arr) => (
              <span key={i} data-rev-line className="mask block">
                <span className="inline-block">
                  {sentence}{i < arr.length - 1 ? "." : ""}
                </span>
              </span>
            ))}
          </blockquote>
          <figcaption className="mt-12 flex flex-col items-center gap-3">
            <Stars count={featured.stars} />
            <span className="caption text-[var(--color-ink)]">{featured.name}</span>
            {featured.context && (
              <span className="eyebrow">— {featured.context}</span>
            )}
          </figcaption>
        </figure>

        {/* Rest */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {rest.map((r, i) => (
            <figure
              key={i}
              data-rev-card
              className="relative flex flex-col gap-6 p-8 lg:p-10 bg-[var(--color-paper)] border-t-2 border-[var(--color-ink)]"
            >
              <Stars count={r.stars} />
              <blockquote className="font-display text-xl lg:text-2xl leading-[1.3] tracking-[-0.015em] text-[var(--color-ink)] text-pretty flex-1">
                „{r.quote[locale]}"
              </blockquote>
              <figcaption className="flex flex-col gap-1">
                <span className="caption text-[var(--color-ink)]">{r.name}</span>
                {r.context && <span className="eyebrow">— {r.context}</span>}
              </figcaption>
            </figure>
          ))}
        </div>

        <div data-rev-footer className="mt-16 flex flex-col md:flex-row md:items-center md:justify-between gap-6 pt-8 border-t border-[var(--color-rule)]">
          <p className="caption max-w-md">
            {locale === "de"
              ? `${shown} von ${reviewsMeta.total} Google-Bewertungen — alle mit ${reviewsMeta.rating.toFixed(1)} ${scale}.`
              : `${shown} من ${reviewsMeta.total} تقييم على Google — كلّها بمعدّل ${reviewsMeta.rating.toFixed(1)} ${scale}.`}
          </p>
          <a
            href={reviewsMeta.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline self-start"
            data-cursor-hover
          >
            <span>{moreLabel}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
