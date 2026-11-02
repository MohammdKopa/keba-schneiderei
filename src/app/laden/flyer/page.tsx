import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/partners/auth";
import { listPartnerStats } from "@/lib/partners/db";
import FlyerView from "@/components/FlyerView";
import PrintButton from "@/components/PrintButton";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Alle Flyer",
  robots: { index: false, follow: false },
};

/** One A4 sign per active partner, in the same order as the list on /laden. */
export default async function AllFlyersPage() {
  if (!(await isLoggedIn())) redirect("/laden");
  const partners = listPartnerStats().filter((p) => p.active);

  return (
    <div className="bg-[var(--color-paper-deep)]">
      <div className="no-print mx-auto max-w-[210mm] px-4 pt-8">
        <Link href="/laden" className="text-xs uppercase tracking-[0.2em] underline underline-offset-4">
          ← Laden
        </Link>
        <p className="font-display mt-2 text-2xl">Alle Flyer</p>
        <p className="mt-1 text-sm text-[var(--color-ink-mute)]">
          {partners.length} Flyer · {partners.length} {partners.length === 1 ? "Seite" : "Seiten"} A4. Pausierte
          Partner werden nicht gedruckt.
        </p>
        <div className="mt-4">
          <PrintButton />
        </div>
      </div>
      {partners.map((p) => (
        <FlyerView key={p.id} partner={p} signOnly />
      ))}
    </div>
  );
}
