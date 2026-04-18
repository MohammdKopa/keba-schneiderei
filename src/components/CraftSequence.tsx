"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Locale } from "@/lib/business";
import { t } from "@/lib/dictionary";

gsap.registerPlugin(ScrollTrigger);

const FRAMES = [
  "/images/atelier/reception.jpg",
  "/images/atelier/tools-flatlay.jpg",
  "/images/atelier/brother-machine.jpg",
  "/images/atelier/suit-buttons.jpg",
  "/images/atelier/workstation.jpg",
];

interface Props { locale: Locale; }

export default function CraftSequence({ locale }: Props) {
  const ref = useRef<HTMLElement>(null);
  const lang = t(locale);
  const steps = lang.craft.steps;

  useGSAP(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const pin = ref.current!.querySelector("[data-craft-pin]") as HTMLElement;
        const rows = ref.current!.querySelectorAll<HTMLElement>("[data-craft-step]");
        const frames = ref.current!.querySelectorAll<HTMLElement>("[data-craft-frame]");
        const counter = ref.current!.querySelector<HTMLElement>("[data-craft-current]");
        const bigNum = ref.current!.querySelector<HTMLElement>("[data-craft-bignum]");

        if (!pin || !rows.length) return;

        ScrollTrigger.create({
          trigger: ref.current,
          start: "top top",
          end: "bottom bottom",
          pin,
          pinSpacing: false,
          invalidateOnRefresh: true,
        });

        gsap.set(frames, { opacity: 0, scale: 1.08 });
        if (frames[0]) gsap.set(frames[0], { opacity: 1, scale: 1 });

        const setActive = (i: number) => {
          gsap.to(frames, { opacity: 0, scale: 1.08, duration: 0.9, ease: "power3.out" });
          if (frames[i]) gsap.to(frames[i], { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" });
          if (counter) counter.textContent = String(i + 1).padStart(2, "0");
          if (bigNum) {
            gsap.fromTo(bigNum,
              { y: 40, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", onStart: () => { bigNum.textContent = String(i + 1).padStart(2, "0"); } }
            );
          }
        };

        rows.forEach((row, i) => {
          ScrollTrigger.create({
            trigger: row,
            start: "top 60%",
            end: "bottom 40%",
            onEnter: () => setActive(i),
            onEnterBack: () => setActive(i),
          });

          const nodes = row.querySelectorAll<HTMLElement>("[data-step-reveal]");
          gsap.from(nodes, {
            y: 40, opacity: 0, duration: 1.1, ease: "power3.out", stagger: 0.1,
            scrollTrigger: { trigger: row, start: "top 80%", toggleActions: "play none none none" },
          });
        });

        const progress = ref.current!.querySelector<HTMLElement>("[data-craft-progress]");
        if (progress) {
          gsap.fromTo(progress, { scaleY: 0 }, {
            scaleY: 1,
            transformOrigin: "top center",
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top 40%", end: "bottom 70%", scrub: true },
          });
        }
      });

      mm.add("(max-width: 1023px)", () => {
        const rows = ref.current!.querySelectorAll<HTMLElement>("[data-craft-step]");
        rows.forEach((row) => {
          const nodes = row.querySelectorAll<HTMLElement>("[data-step-reveal]");
          gsap.from(nodes, {
            y: 24, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.08,
            scrollTrigger: { trigger: row, start: "top 80%", toggleActions: "play none none none" },
          });
          const img = row.querySelector<HTMLElement>("[data-craft-frame-mobile]");
          if (img) {
            gsap.from(img, {
              clipPath: "inset(0 0 100% 0)", duration: 1.3, ease: "power4.out",
              scrollTrigger: { trigger: row, start: "top 85%", toggleActions: "play none none none" },
            });
            gsap.from(img.querySelector("img"), {
              scale: 1.25, duration: 1.8, ease: "power3.out",
              scrollTrigger: { trigger: row, start: "top 85%", toggleActions: "play none none none" },
            });
          }
          const bignum = row.querySelector<HTMLElement>("[data-step-bignum]");
          if (bignum) {
            gsap.from(bignum, {
              y: 80, opacity: 0, duration: 1.2, ease: "power3.out",
              scrollTrigger: { trigger: row, start: "top 80%", toggleActions: "play none none none" },
            });
          }
        });
      });

      return () => mm.revert();
    }, ref);
    return () => ctx.revert();
  }, { scope: ref });

  return (
    <section
      ref={ref}
      id="handwerk"
      className="relative bg-[var(--color-paper)]"
    >
      <div className="wrap pt-24 lg:pt-36 pb-10">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12 lg:mb-16">
          <div className="max-w-xl">
            <p className="eyebrow mb-6">— {lang.craft.eyebrow}</p>
            <h2 className="font-display text-[clamp(2.8rem,7vw,5.5rem)] leading-[0.96] tracking-[-0.03em] text-[var(--color-ink)] text-balance">
              {locale === "de" ? (
                <>Die Handschrift <span className="font-italic-display text-[var(--color-cognac)]">eines</span> Hauses.</>
              ) : (
                <>بصمةُ <span className="font-italic-display text-[var(--color-cognac)]">بيتٍ</span> واحد.</>
              )}
            </h2>
          </div>
          <p className="caption max-w-sm text-pretty">{lang.craft.body}</p>
        </div>
      </div>

      <div className="wrap grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 relative">
        {/* Pinned media — desktop */}
        <div className="hidden lg:block lg:col-span-6 lg:col-start-7 lg:row-start-1">
          <div data-craft-pin className="h-screen flex items-center">
            <div className="relative aspect-[3/4] w-full overflow-hidden">
              {FRAMES.map((src, i) => (
                <div key={i} data-craft-frame className="absolute inset-0 will-change-transform">
                  <Image
                    src={src}
                    alt=""
                    fill sizes="50vw"
                    className="object-cover"
                  />
                </div>
              ))}
              <div className="absolute inset-0 ring-1 ring-inset ring-[var(--color-ink)]/5 pointer-events-none" />

              {/* Giant step number overlay */}
              <div
                data-craft-bignum
                className="absolute -top-2 -start-2 font-display text-[clamp(8rem,16vw,16rem)] leading-none text-[var(--color-paper)] mix-blend-difference tracking-[-0.04em] select-none pointer-events-none"
              >
                01
              </div>

              <div className="absolute bottom-6 start-6 caption text-[var(--color-paper)] mix-blend-difference">
                {locale === "de" ? "Schritt" : "خطوة"}{" "}
                <span data-craft-current>01</span> / 05
              </div>
            </div>
          </div>
        </div>

        {/* Scrolling steps */}
        <div className="lg:col-span-5 lg:row-start-1 relative">
          <div className="relative lg:ps-10">
            <div className="absolute start-3 top-6 bottom-6 w-px bg-[var(--color-rule)] hidden lg:block" aria-hidden />
            <div
              data-craft-progress
              className="absolute start-3 top-6 bottom-6 w-px bg-[var(--color-ink)] hidden lg:block"
              aria-hidden
            />
            <ol className="space-y-16 lg:space-y-[22vh] lg:py-[30vh]">
              {steps.map((step, i) => (
                <li key={step.n} data-craft-step className="relative">
                  <div
                    className="absolute -start-[2.25rem] top-2 w-3 h-3 rounded-full bg-[var(--color-cognac)] ring-4 ring-[var(--color-paper)] hidden lg:block"
                    aria-hidden
                  />

                  {/* Mobile: big number + image + content */}
                  <div className="lg:hidden">
                    <div data-step-bignum className="font-display text-[28vw] leading-[0.85] tracking-[-0.04em] text-[var(--color-paper-deep)] mb-[-0.15em] select-none">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div data-craft-frame-mobile className="relative aspect-[5/6] mb-8 overflow-hidden">
                      <Image
                        src={FRAMES[i % FRAMES.length]}
                        alt=""
                        fill sizes="100vw"
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div className="caption text-[var(--color-ink-mute)] mb-4" data-step-reveal>
                    {step.n} — {String(i + 1).padStart(2, "0")} / 05
                  </div>
                  <h3 className="font-display text-4xl sm:text-5xl lg:text-5xl tracking-[-0.03em] text-[var(--color-ink)]" data-step-reveal>
                    {step.t}
                  </h3>
                  <p className="mt-5 text-[var(--color-ink-soft)] leading-relaxed max-w-md text-pretty" data-step-reveal>
                    {step.d}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
