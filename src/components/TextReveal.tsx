"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  children: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  splitBy?: "chars" | "words" | "lines";
  animation?: "fadeUp" | "slideUp" | "clipReveal";
  scrollTrigger?: boolean;
  style?: React.CSSProperties;
}

export default function TextReveal({
  children,
  as: Tag = "h2",
  className = "",
  delay = 0,
  duration = 1,
  stagger = 0.04,
  splitBy = "words",
  animation = "slideUp",
  scrollTrigger = true,
  style,
}: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null);

  useGSAP(() => {
    if (!ref.current) return;

    const text = ref.current.textContent || "";
    ref.current.innerHTML = "";

    const elements: HTMLSpanElement[] = [];

    if (splitBy === "words") {
      const words = text.split(/\s+/);
      words.forEach((word: string, i: number) => {
        const wrap = document.createElement("span");
        wrap.style.display = "inline-block";
        wrap.style.overflow = "hidden";
        wrap.style.verticalAlign = "baseline";
        const inner = document.createElement("span");
        inner.style.display = "inline-block";
        inner.textContent = word;
        wrap.appendChild(inner);
        ref.current!.appendChild(wrap);
        if (i < words.length - 1) {
          ref.current!.appendChild(document.createTextNode("\u00A0"));
        }
        elements.push(inner);
      });
    } else if (splitBy === "lines") {
      const lines = text.split("\n");
      lines.forEach((line: string) => {
        const wrap = document.createElement("span");
        wrap.style.display = "block";
        wrap.style.overflow = "hidden";
        const inner = document.createElement("span");
        inner.style.display = "block";
        inner.textContent = line;
        wrap.appendChild(inner);
        ref.current!.appendChild(wrap);
        elements.push(inner);
      });
    } else {
      const chars = text.split("");
      chars.forEach((char: string) => {
        if (char === " ") {
          ref.current!.appendChild(document.createTextNode("\u00A0"));
          return;
        }
        const span = document.createElement("span");
        span.style.display = "inline-block";
        span.textContent = char;
        ref.current!.appendChild(span);
        elements.push(span);
      });
    }

    const fromVars: gsap.TweenVars = {
      duration,
      delay,
      stagger,
      ease: "power4.out",
    };

    switch (animation) {
      case "fadeUp":
        fromVars.opacity = 0;
        fromVars.y = 40;
        break;
      case "slideUp":
        fromVars.y = "110%";
        break;
      case "clipReveal":
        fromVars.opacity = 0;
        fromVars.y = 24;
        fromVars.filter = "blur(8px)";
        break;
    }

    if (scrollTrigger) {
      fromVars.scrollTrigger = {
        trigger: ref.current,
        start: "top 85%",
        toggleActions: "play none none none",
      };
    }

    gsap.from(elements, fromVars);
  }, { scope: ref });

  return <Tag ref={ref} className={className} style={style}>{children}</Tag>;
}
