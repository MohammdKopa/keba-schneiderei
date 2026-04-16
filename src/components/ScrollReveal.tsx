"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Direction = "up" | "down" | "left" | "right" | "scale" | "fade";

interface Props {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  distance?: number;
  stagger?: number;
  className?: string;
  start?: string;
}

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 1.2,
  distance = 40,
  stagger = 0,
  className = "",
  start = "top 85%",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    const fromVars: gsap.TweenVars = {
      opacity: 0,
      duration,
      delay,
      ease: "power3.out",
    };

    switch (direction) {
      case "up":
        fromVars.y = distance;
        break;
      case "down":
        fromVars.y = -distance;
        break;
      case "left":
        fromVars.x = distance;
        break;
      case "right":
        fromVars.x = -distance;
        break;
      case "scale":
        fromVars.scale = 0.92;
        break;
    }

    const targets = stagger > 0 && ref.current.children.length > 0
      ? ref.current.children
      : ref.current;

    gsap.from(targets, {
      ...fromVars,
      stagger: stagger > 0 ? stagger : undefined,
      scrollTrigger: {
        trigger: ref.current,
        start,
        toggleActions: "play none none none",
      },
    });
  }, { scope: ref });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
