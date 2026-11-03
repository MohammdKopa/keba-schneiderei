import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { getCode, getPartnerBySlug } from "@/lib/partners/db";
import {
  alterationPrices,
  codeCookieName,
  discountPercent,
  formatPrice,
  isCodeUsable,
  kindCopy,
} from "@/lib/partners/codes";
import { business, openingHours } from "@/lib/business";
import ClaimCode from "./ClaimCode";
import KebaMark, { brand } from "@/components/KebaMark";
import { Navigation } from "lucide-react";

// Opens turn-by-turn directions in the Maps app (or browser) from wherever the customer is.
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  `${business.name}, ${business.address.full}`,
)}`;

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Ihr Rabattcode",
  robots: { index: false, follow: false },
};

export default async function PartnerLanding({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const partner = getPartnerBySlug(slug);
  if (!partner) notFound();

  const saved = (await cookies()).get(codeCookieName(slug))?.value;
  const savedCode = saved ? getCode(saved) : null;
  const initial =
    savedCode && savedCode.partnerId === partner.id && isCodeUsable(savedCode, true) ? savedCode : null;

  const copy = kindCopy[partner.kind];
  // A paused partner's offer has ended, so its page lists normal prices only.
  const percent = partner.active ? discountPercent(partner.discount) : null;

  return (
    <section className="min-h-screen bg-[var(--color-paper)]">
      <header style={{ background: brand.teal }}>
        <div className="mx-auto flex max-w-md items-end justify-between px-5 pb-6 pt-8">
          <KebaMark size={52} />
          <p className="text-right text-xs leading-snug text-white/75">
            Empfohlen von
            <br />
            <span className="text-sm font-medium text-white">{partner.name}</span>
          </p>
        </div>
        <div style={{ height: 4, background: brand.yellow }} />
      </header>

      <div className="mx-auto max-w-md px-5 pb-12 pt-8">
        <h1 className="font-display text-[2.6rem] leading-[1.02] text-[var(--color-ink)]">
          {copy.headline[0]}
          <br />
          {copy.headline[1]}{" "}
          <span className="font-italic-display" style={{ color: brand.teal }}>
            {copy.headline[2]}
          </span>
        </h1>
        <p className="mt-5 text-[var(--color-ink-soft)]">{copy.pitch}</p>

        {partner.active ? (
          <ClaimCode slug={slug} discount={partner.discount} initial={initial} />
        ) : (
          <div className="mt-8 border border-[var(--color-rule)] bg-[var(--color-paper-warm)] p-6">
            <p className="font-medium">Diese Aktion ist beendet.</p>
            <p className="mt-2 text-sm text-[var(--color-ink-soft)]">
              Wir sind trotzdem gern für Sie da — kommen Sie einfach vorbei.
            </p>
          </div>
        )}

        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener"
          className="mt-4 flex w-full items-center justify-center gap-3 py-4 text-base font-semibold text-white"
          style={{ background: brand.teal }}
        >
          <Navigation size={20} style={{ color: brand.yellow }} aria-hidden />
          Route planen
        </a>

        {partner.kind === "mode" && (
          <div className="mt-10">
            <p className="eyebrow mb-3">Unsere Preise</p>
            <ul className="divide-y divide-[var(--color-rule)] border-y border-[var(--color-rule)]">
              {alterationPrices.map((item) => (
                <li key={item.label} className="flex items-center justify-between gap-3 py-3">
                  <span>{item.label}</span>
                  {percent !== null ? (
                    <span className="flex shrink-0 items-center gap-2 tabular-nums">
                      <del className="whitespace-nowrap text-sm text-[var(--color-ink-mute)]">
                        {formatPrice(item.cents)}
                      </del>
                      <span
                        className="whitespace-nowrap rounded-full px-2.5 py-1 text-sm font-semibold leading-none"
                        style={{ background: brand.yellow, color: brand.teal }}
                      >
                        {formatPrice(Math.round((item.cents * (100 - percent)) / 100), item.from)}
                      </span>
                    </span>
                  ) : (
                    <span className="whitespace-nowrap font-semibold tabular-nums">
                      {formatPrice(item.cents, item.from)}
                    </span>
                  )}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs leading-relaxed text-[var(--color-ink-mute)]">
              Endpreise.{percent !== null && " Der gelbe Preis gilt mit Ihrem Code."} Bei „ab“-Preisen kommt es auf das
              Stück an.
            </p>
          </div>
        )}

        <div className="mt-10 border-t border-[var(--color-rule)] pt-8 text-sm">
          <p className="eyebrow mb-3">So finden Sie uns</p>
          <a href={business.googleMaps} className="underline underline-offset-4">
            {business.address.full}
          </a>
          <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-5 gap-y-1 text-[var(--color-ink-soft)]">
            {openingHours.map((oh) => (
              <div key={oh.dayDe} className="contents">
                <dt>{oh.dayDe}</dt>
                <dd>{oh.sessions.length ? oh.sessions.join(" · ") : "geschlossen"}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={`tel:${business.phoneHref}`} className="btn btn-ink">
              <span>Anrufen</span>
            </a>
            <a href={`https://wa.me/${business.whatsappHref}`} className="btn btn-outline">
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        <p className="mt-10 text-xs leading-relaxed text-[var(--color-ink-mute)]">
          Ein Code pro Auftrag, einmal einlösbar. Nicht mit anderen Rabatten kombinierbar. Barauszahlung
          ausgeschlossen.
        </p>
      </div>
    </section>
  );
}
