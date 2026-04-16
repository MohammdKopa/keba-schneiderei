"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import type { Locale } from "@/lib/business";
import { t } from "@/lib/dictionary";
import { business } from "@/lib/business";

interface Props { locale: Locale; }

export default function Navbar({ locale }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const lang = t(locale);
  const otherLocale: Locale = locale === "de" ? "ar" : "de";
  const otherHome = otherLocale === "de" ? "/" : "/ar";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setIsOpen(false); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  const basePath = locale === "ar" ? "/ar" : "";
  const anchors = [
    { href: `${basePath}#philosophie`, label: lang.nav.atelier },
    { href: `${basePath}#handwerk`, label: locale === "de" ? "Handwerk" : "الحرفة" },
    { href: `${basePath}#leistungen`, label: lang.nav.leistungen },
    { href: `${basePath}#galerie`, label: lang.nav.galerie },
    { href: `${basePath}#stimmen`, label: locale === "de" ? "Stimmen" : "آراء" },
    { href: `${basePath}#kontakt`, label: lang.nav.kontakt },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-[background,border,padding] duration-700 ease-out ${
          scrolled || isOpen
            ? "bg-[var(--color-paper)]/92 backdrop-blur-md border-b border-[var(--color-rule)]/50 py-0"
            : "bg-transparent border-b border-transparent py-2"
        }`}
      >
        <div className="wrap">
          <div className="flex justify-between items-center h-20">
            <Link
              href={locale === "ar" ? "/ar" : "/"}
              className="flex items-center gap-3 group"
              aria-label={business.name}
              data-cursor-hover
            >
              <span className="block w-11 h-11 relative shrink-0">
                <Image src="/logo.png" alt={business.name} fill sizes="44px" priority className="object-contain" />
              </span>
              <span className="font-display text-xl leading-none text-[var(--color-ink)] tracking-[-0.02em] hidden sm:inline">
                Keba <span className="font-italic-display text-[var(--color-ink-mute)]">
                  {locale === "de" ? "Schneiderei" : "للتفصيل"}
                </span>
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              {anchors.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="link-line text-[0.82rem] tracking-wide text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition-colors"
                  data-cursor-hover
                >
                  {link.label}
                </a>
              ))}
              <Link
                href={otherHome}
                className="text-xs tracking-[0.28em] uppercase text-[var(--color-ink-mute)] hover:text-[var(--color-ink)] transition-colors ms-2"
                aria-label={`Switch to ${lang.nav.langLabel}`}
                data-cursor-hover
              >
                {lang.nav.langLabel}
              </Link>
              <a href={`${basePath}#kontakt`} className="btn btn-ink" data-cursor-hover>
                <span>{lang.nav.call}</span>
              </a>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 -mr-2 text-[var(--color-ink)]"
              aria-label="Menu"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {isOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden fixed inset-0 top-20 z-40 bg-[var(--color-paper)] overflow-y-auto"
        >
          <div className="wrap py-12 flex flex-col gap-1">
            {anchors.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="font-display text-5xl text-[var(--color-ink)] py-5 border-b border-[var(--color-rule)] tracking-[-0.02em]"
                style={{ animation: `navIn 0.7s ${0.05 + i * 0.07}s both cubic-bezier(0.33, 1, 0.68, 1)` }}
              >
                {link.label}
              </a>
            ))}
            <div className="mt-10 flex flex-col gap-6">
              <Link
                href={otherHome}
                onClick={() => setIsOpen(false)}
                className="eyebrow"
              >
                → {lang.nav.langLabel}
              </Link>
              <a href={`tel:${business.phoneHref}`} className="btn btn-ink" onClick={() => setIsOpen(false)}>
                <span>{lang.nav.call}</span>
              </a>
            </div>
          </div>
          <style jsx>{`
            @keyframes navIn {
              from { opacity: 0; transform: translateY(28px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </div>
      )}
    </>
  );
}
