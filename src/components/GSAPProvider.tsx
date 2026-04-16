"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function GSAPProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const imgs = document.querySelectorAll("img");
    let loaded = 0;
    const total = imgs.length;
    if (total === 0) {
      ScrollTrigger.refresh();
      return;
    }
    const check = () => {
      loaded++;
      if (loaded >= total) ScrollTrigger.refresh();
    };
    imgs.forEach((img) => {
      if (img.complete) check();
      else img.addEventListener("load", check, { once: true });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return <>{children}</>;
}
