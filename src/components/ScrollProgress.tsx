"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        gsap.set(el, { scaleX: self.progress });
      },
    });

    return () => st.kill();
  }, []);

  return (
    <div
      aria-hidden
      className="fixed top-0 inset-x-0 z-[60] h-[2px] bg-transparent pointer-events-none"
    >
      <div
        ref={ref}
        className="h-full bg-[var(--color-ink)] origin-left"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
