import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPartnerBySlug } from "@/lib/partners/db";
import FlyerView from "@/components/FlyerView";
import PrintButton from "@/components/PrintButton";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Flyer zum Ausdrucken",
  robots: { index: false, follow: false },
};

/** Public print link for the partner shop — same sheets as the shop desk, nothing private on them. */
export default async function PartnerFlyerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const partner = getPartnerBySlug(slug);
  if (!partner || !partner.active) notFound();

  return (
    <FlyerView
      partner={partner}
      toolbar={
        <>
          <p className="font-display text-2xl">Ihr Flyer, {partner.name}</p>
          <p className="mt-1 text-sm text-[var(--color-ink-mute)]">
            Bitte auf A4 drucken. Seite 1 ist der Aufsteller für die Theke, Seite 2 sind 10 Karten zum
            Ausschneiden. Danke für die Partnerschaft!
          </p>
          <div className="mt-4">
            <PrintButton />
          </div>
        </>
      }
    />
  );
}
