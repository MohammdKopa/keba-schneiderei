import Link from "next/link";
import Image from "next/image";
import { business, openingHours } from "@/lib/business";
import type { Locale } from "@/lib/business";
import { t } from "@/lib/dictionary";

interface Props { locale: Locale; }

export default function Footer({ locale }: Props) {
  const lang = t(locale);

  return (
    <footer className="bg-[var(--color-ink)] text-[var(--color-paper)] relative border-t border-[var(--color-paper)]/10">
      <div className="wrap py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-6 items-start">
          <div className="md:col-span-5">
            <div className="flex items-center gap-4 mb-4">
              <span className="block w-14 h-14 relative shrink-0">
                <Image src="/logo.png" alt="Keba" fill sizes="56px" className="object-contain brightness-0 invert opacity-90" />
              </span>
              <h3 className="font-display text-3xl tracking-[-0.02em]">
                Keba <span className="font-italic-display text-[var(--color-cognac)]">Schneiderei</span>
              </h3>
            </div>
            <p className="mt-4 caption text-[var(--color-mushroom)] max-w-md">{lang.footer.tagline}</p>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <p className="eyebrow mb-4 text-[var(--color-mushroom)]">{lang.footer.visit}</p>
            <address className="not-italic text-[var(--color-paper)]/70 text-sm leading-relaxed space-y-1">
              <p>{business.address.street}</p>
              <p>{business.address.zip} {business.address.city}</p>
              <p className="pt-2"><a href={`tel:${business.phoneHref}`} className="link-line">{business.phone}</a></p>
              <p><a href={`mailto:${business.email}`} className="link-line">{business.email}</a></p>
            </address>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow mb-4 text-[var(--color-mushroom)]">{lang.footer.hours}</p>
            <ul className="space-y-1.5 text-sm text-[var(--color-paper)]/75">
              {openingHours.map((oh) => (
                <li key={oh.dayEn} className="flex justify-between items-start gap-3">
                  <span>{locale === "de" ? oh.dayDe : oh.dayAr}</span>
                  {oh.sessions.length === 0 ? (
                    <span className="italic text-[var(--color-paper)]/40">{lang.contact.closed}</span>
                  ) : (
                    <span className="text-right leading-relaxed">
                      {oh.sessions.map((s, i) => (
                        <span key={i} className="block">{s}</span>
                      ))}
                    </span>
                  )}
                </li>
              ))}
            </ul>
            <div className="flex gap-4 mt-6">
              <a href={business.instagram} target="_blank" rel="noopener noreferrer" className="link-line text-xs text-[var(--color-paper)]/80">Instagram →</a>
              <Link href={locale === "de" ? "/ar" : "/"} className="link-line text-xs text-[var(--color-paper)]/80">{lang.nav.langLabel}</Link>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-[var(--color-paper)]/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[var(--color-paper)]/45">
          <p>© {new Date().getFullYear()} Keba Schneiderei · {lang.footer.rights}</p>
          <p className="flex gap-6">
            <a href="#kontakt" className="hover:text-[var(--color-paper)]/80">{lang.footer.impressum}</a>
            <a href="#kontakt" className="hover:text-[var(--color-paper)]/80">{lang.footer.datenschutz}</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
