"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MobileActionBar from "./MobileActionBar";
import SmoothScroll from "./SmoothScroll";
import Cursor from "./Cursor";
import ScrollProgress from "./ScrollProgress";
import CookieBanner from "./CookieBanner";
import type { Locale } from "@/lib/business";

function localeFromPath(pathname: string | null): Locale {
  if (pathname && pathname.startsWith("/ar")) return "ar";
  return "de";
}

export default function LocalizedShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const locale = localeFromPath(pathname);

  useEffect(() => {
    const html = document.documentElement;
    html.lang = locale;
    html.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  // Partner landing pages and the shop desk are utility screens: no nav, cursor or cookie banner.
  if (pathname && (pathname.startsWith("/p/") || pathname.startsWith("/laden"))) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <>
      <SmoothScroll />
      <Cursor />
      <ScrollProgress />
      <Navbar locale={locale} />
      <main className="flex-1 pb-20 lg:pb-0">{children}</main>
      <MobileActionBar locale={locale} />
      <Footer locale={locale} />
      <CookieBanner locale={locale} />
    </>
  );
}
