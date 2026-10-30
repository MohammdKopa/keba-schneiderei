import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/partners/auth";
import { getPartnerBySlug } from "@/lib/partners/db";
import { business } from "@/lib/business";
import FlyerView from "@/components/FlyerView";
import PrintButton from "@/components/PrintButton";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Flyer",
  robots: { index: false, follow: false },
};

export default async function FlyerPage({ params }: { params: Promise<{ slug: string }> }) {
  if (!(await isLoggedIn())) redirect("/laden");
  const { slug } = await params;
  const partner = getPartnerBySlug(slug);
  if (!partner) notFound();

  const printUrl = `${business.siteUrl}/p/${partner.slug}/flyer`;
  const message =
    `Hallo! Hier ist Ihr Flyer von der Keba Schneiderei zum Ausdrucken:\n${printUrl}\n\n` +
    `Einfach öffnen und auf A4 drucken (Seite 1: Aufsteller, Seite 2: Karten zum Ausschneiden). ` +
    `Vielen Dank für die Partnerschaft!`;

  return (
    <FlyerView
      partner={partner}
      toolbar={
        <>
          <Link href="/laden" className="text-xs uppercase tracking-[0.2em] underline underline-offset-4">
            ← Laden
          </Link>
          <p className="font-display mt-2 text-2xl">Flyer für {partner.name}</p>
          <p className="mt-1 text-sm text-[var(--color-ink-mute)]">
            Der Laden druckt ihn am besten selbst: Link per WhatsApp schicken, dort öffnen und auf A4 drucken.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(message)}`}
              target="_blank"
              rel="noopener"
              className="btn !bg-[#1F7A4D] !text-white"
            >
              <span>Per WhatsApp senden</span>
            </a>
            <PrintButton />
          </div>
          <p className="mt-3 break-all text-xs text-[var(--color-ink-mute)]">
            Druck-Link: <span className="font-mono">{printUrl}</span>
          </p>
        </>
      }
    />
  );
}
