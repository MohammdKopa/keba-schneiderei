"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  locale?: string;
}

export default function CountUp({
  to,
  suffix = "",
  prefix = "",
  duration = 2,
  className = "",
  locale = "de-DE",
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    const obj = { v: 0 };
    const formatter = new Intl.NumberFormat(locale);
    gsap.to(obj, {
      v: to,
      duration,
      ease: "power2.out",
      onUpdate: () => {
        if (ref.current) {
          ref.current.textContent = `${prefix}${formatter.format(Math.round(obj.v))}${suffix}`;
        }
      },
      scrollTrigger: {
        trigger: ref.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  }, { scope: ref });

  return <span ref={ref} className={className}>{prefix}0{suffix}</span>;
}
