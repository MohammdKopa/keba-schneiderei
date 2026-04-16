"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/lib/services";
import type { Locale } from "@/lib/business";
import { t } from "@/lib/dictionary";

gsap.registerPlugin(ScrollTrigger);

interface Props { locale: Locale; }

export default function ServicesRail({ locale }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [openMobile, setOpenMobile] = useState<number | null>(0);
  const lang = t(locale);

  useGSAP(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-services-head] > *", {
        opacity: 0, y: 40, duration: 1.1, ease: "power3.out", stagger: 0.12,
        scrollTrigger: { trigger: "[data-services-head]", start: "top 80%", toggleActions: "play none none none" },
      });

      const rows = ref.current!.querySelectorAll<HTMLElement>("[data-service-row]");
      rows.forEach((row, i) => {
        gsap.from(row, {
          y: 80, opacity: 0, duration: 1.2, ease: "power4.out", delay: i * 0.05,
          scrollTrigger: { trigger: row, start: "top 88%", toggleActions: "play none none none" },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, { scope: ref });

  return (
    <section ref={ref} id="leistungen" className="bg-[var(--color-paper-warm)] section">
      <div className="wrap">
        <div data-services-head className="mb-16 lg:mb-28 max-w-3xl">
          <p className="eyebrow mb-6">— {lang.services.eyebrow}</p>
          <h2 className="font-display text-[clamp(2.8rem,8vw,6.5rem)] leading-[0.94] tracking-[-0.03em] text-[var(--color-ink)] text-balance">
            {locale === "de" ? (
              <>Vier Disziplinen. <span className="font-italic-display text-[var(--color-cognac)]">Ein</span> Standard.</>
            ) : (
              <>أربع حِرف. <span className="font-italic-display text-[var(--color-cognac)]">معيار</span> واحد.</>
            )}
          </h2>
        </div>

        <div className="hairline hairline-rule" />

        <ul>
          {services.map((s, i) => {
            const copy = s[locale];
            const isActiveDesktop = active === i;
            const isOpen = openMobile === i;
            return (
              <li
                key={s.id}
                data-service-row
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={`group relative border-b border-[var(--color-rule)] overflow-hidden transition-colors duration-500 ${
                  isActiveDesktop ? "lg:bg-[var(--color-ink)] lg:text-[var(--color-paper)]" : ""
                }`}
              >
                {/* Desktop row */}
                <button
                  type="button"
                  onClick={() => setOpenMobile(isOpen ? null : i)}
                  className="block w-full text-start lg:hidden"
                  aria-expanded={isOpen}
                >
                  <div className="grid grid-cols-12 items-center gap-4 py-7">
                    <span className="col-span-2 caption text-[var(--color-ink-mute)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="col-span-9 font-display text-[clamp(2rem,9vw,3.5rem)] leading-[0.98] tracking-[-0.03em] text-[var(--color-ink)]">
                      {copy.title}
                    </h3>
                    <span className={`col-span-1 text-[var(--color-ink)] transition-transform duration-500 ${isOpen ? "rotate-45" : ""}`} aria-hidden>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                        <line x1="12" y1="4" x2="12" y2="20" />
                        <line x1="4" y1="12" x2="20" y2="12" />
                      </svg>
                    </span>
                  </div>
                  <div
                    className="grid transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <div className="pb-10">
                        <div className="relative aspect-[4/3] overflow-hidden mb-6">
                          <Image
                            src={s.image}
                            alt=""
                            fill sizes="100vw"
                            className="object-cover"
                          />
                        </div>
                        <p className="font-italic-display text-xl text-[var(--color-cognac)] mb-4">
                          {copy.tagline}
                        </p>
                        <p className="text-[var(--color-ink-soft)] leading-relaxed text-pretty mb-5">
                          {copy.body}
                        </p>
                        <ul className="space-y-2.5">
                          {copy.bullets.map((b) => (
                            <li key={b} className="flex items-start gap-3 text-sm">
                              <span className="mt-2 w-4 h-px bg-[var(--color-cognac)] shrink-0" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </button>

                {/* Desktop */}
                <a href="#kontakt" data-cursor-hover className="hidden lg:block relative">
                  <div className="grid grid-cols-12 items-center gap-6 py-10 lg:py-14 relative">
                    <span className={`col-span-1 caption transition-colors ${isActiveDesktop ? "text-[var(--color-mushroom)]" : "text-[var(--color-ink-mute)]"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className={`col-span-6 font-display text-[clamp(2rem,6vw,5rem)] leading-[0.96] tracking-[-0.03em] transition-all duration-700 ${
                      isActiveDesktop ? "text-[var(--color-paper)] translate-x-4" : "text-[var(--color-ink)]"
                    }`}>
                      {copy.title}
                    </h3>
                    <p className={`col-span-4 text-[var(--color-ink-soft)] leading-relaxed text-pretty ps-8 transition-colors ${
                      isActiveDesktop ? "text-[var(--color-paper)]/70" : ""
                    }`}>
                      {copy.tagline}
                    </p>
                    <div className="col-span-1 flex items-center justify-end">
                      <svg width="32" height="14" viewBox="0 0 32 14" className={`transition-all duration-700 rtl:scale-x-[-1] ${
                        isActiveDesktop ? "text-[var(--color-cognac)] translate-x-2" : "text-[var(--color-ink-mute)]"
                      }`} fill="none" stroke="currentColor" strokeWidth="1">
                        <line x1="0" y1="7" x2="30" y2="7" />
                        <polyline points="24,2 30,7 24,12" />
                      </svg>
                    </div>
                  </div>

                  {/* Hover preview — desktop */}
                  <div
                    className={`pointer-events-none absolute top-1/2 -translate-y-1/2 end-[18%] w-[20vw] max-w-[340px] aspect-[3/4] overflow-hidden z-10 transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] ${
                      isActiveDesktop ? "opacity-100 scale-100 translate-y-[-50%] rotate-0" : "opacity-0 scale-90 translate-y-[-40%] rotate-3"
                    }`}
                  >
                    <Image
                      src={s.image}
                      alt=""
                      fill sizes="340px"
                      className="object-cover"
                    />
                  </div>
                </a>
              </li>
            );
          })}
        </ul>

        {/* Active body — desktop only */}
        <div className="mt-16 lg:grid lg:grid-cols-12 gap-10 hidden lg:grid">
          <div className="col-span-5 col-start-2">
            <p className="caption text-[var(--color-ink-mute)] mb-4">
              {String(active + 1).padStart(2, "0")} — {services[active][locale].title}
            </p>
            <p className="text-[var(--color-ink-soft)] leading-relaxed text-pretty">
              {services[active][locale].body}
            </p>
          </div>
          <ul className="col-span-5 col-start-8 space-y-3">
            {services[active][locale].bullets.map((b) => (
              <li key={b} className="flex items-start gap-4">
                <span className="mt-2.5 w-5 h-px bg-[var(--color-cognac)] shrink-0" />
                <span className="text-[var(--color-ink)]">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
