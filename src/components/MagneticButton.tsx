"use client";

import { useRef, useCallback } from "react";
import gsap from "gsap";

interface Props {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  as?: "a" | "button" | "div";
}

export default function MagneticButton({
  children,
  className = "",
  strength = 0.25,
  as = "div",
  href,
  target,
  rel,
  onClick,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(ref.current, {
        x: x * strength,
        y: y * strength,
        duration: 0.4,
        ease: "power3.out",
      });
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
    });
  }, []);

  if (as === "a") {
    return (
      <div
        ref={ref}
        className="inline-block"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <a href={href} target={target} rel={rel} className={className} onClick={onClick}>
          {children}
        </a>
      </div>
    );
  }

  if (as === "button") {
    return (
      <div
        ref={ref}
        className="inline-block"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <button className={className} onClick={onClick}>
          {children}
        </button>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
