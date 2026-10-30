import type { Metadata } from "next";
import Link from "next/link";
import { isConfigured, isLoggedIn } from "@/lib/partners/auth";
import { listPartnerStats, recentRedemptions } from "@/lib/partners/db";
import { formatDate, formatEuro, kindCopy } from "@/lib/partners/codes";
import { logout, togglePartner } from "./actions";
import LoginForm from "./LoginForm";
import RedeemPanel from "./RedeemPanel";
import AddPartnerForm from "./AddPartnerForm";
import DeletePartnerButton from "./DeletePartnerButton";
import KebaMark, { brand } from "@/components/KebaMark";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Laden",
  robots: { index: false, follow: false },
};

export default async function LadenPage({ searchParams }: { searchParams: Promise<{ code?: string }> }) {
  const { code: scanned } = await searchParams;

  if (!isConfigured()) {
    return (
      <Shell>
        <p>Nicht eingerichtet: SHOP_PIN und SESSION_SECRET fehlen in der Server-Umgebung.</p>
      </Shell>
    );
  }

  if (!(await isLoggedIn())) {
    return (
      <Shell>
        <LoginForm scanned={scanned} />
      </Shell>
    );
  }

  const partners = listPartnerStats();
  const recent = recentRedemptions();

  return (
    <Shell
      action={
        <form action={logout}>
          <button className="text-xs uppercase tracking-[0.2em] text-[var(--color-ink-mute)] underline-offset-4 hover:underline">
            Abmelden
          </button>
        </form>
      }
    >
      <RedeemPanel key={scanned} scanned={scanned} />

      <section className="mt-14">
        <SectionTitle de="Partner" ar="الشركاء" />
        {partners.length === 0 ? (
          <p className="text-sm text-[var(--color-ink-mute)]">Noch keine Partner. Unten den ersten anlegen.</p>
        ) : (
          <ul className="divide-y divide-[var(--color-rule)] border-y border-[var(--color-rule)]">
            {partners.map((p) => (
              <li key={p.id} className={`py-4 ${p.active ? "" : "opacity-50"}`}>
                <div className="flex items-baseline justify-between gap-3">
                  <p className="font-medium">
                    {p.name}{" "}
                    <span className="text-xs font-normal text-[var(--color-ink-mute)]">
                      · {kindCopy[p.kind].label} · {p.discount}
                    </span>
                  </p>
                  <Link
                    href={`/laden/partner/${p.slug}/flyer`}
                    className="shrink-0 text-xs uppercase tracking-[0.2em] underline underline-offset-4"
                  >
                    Flyer
                  </Link>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-[var(--color-ink-soft)]">
                  <span>{p.issued} {p.issued === 1 ? "Code" : "Codes"}</span>
                  <span>
                    <strong className="text-[var(--color-ink)]">{p.redeemed}</strong> eingelöst
                  </span>
                  {p.revenueCents > 0 && <span>{formatEuro(p.revenueCents)}</span>}
                  <form action={togglePartner.bind(null, p.id, !p.active)} className="ml-auto">
                    <button className="text-xs text-[var(--color-ink-mute)] underline underline-offset-4">
                      {p.active ? "Pausieren" : "Aktivieren"}
                    </button>
                  </form>
                  <DeletePartnerButton id={p.id} name={p.name} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {recent.length > 0 && (
        <section className="mt-14">
          <SectionTitle de="Zuletzt eingelöst" ar="آخر الأكواد المستخدمة" />
          <ul className="space-y-2 text-sm">
            {recent.map((r) => (
              <li key={r.code} className="flex justify-between gap-3">
                <span className="font-mono">{r.code}</span>
                <span className="truncate text-[var(--color-ink-soft)]">{r.partnerName}</span>
                <span className="shrink-0 text-[var(--color-ink-mute)]">
                  {r.amountCents != null && `${formatEuro(r.amountCents)} · `}
                  {formatDate(r.redeemedAt!)}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-14">
        <SectionTitle de="Neuer Partner" ar="شريك جديد" />
        <AddPartnerForm />
      </section>
    </Shell>
  );
}

function Shell({ children, action }: { children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <section className="min-h-screen bg-[var(--color-paper)]">
      <header style={{ background: brand.teal }}>
        <div className="mx-auto flex max-w-lg items-center justify-between px-5 py-5 [&_button]:!text-white/80">
          <div className="flex items-end gap-3">
            <KebaMark size={34} tagline={false} />
            <span className="pb-0.5 text-sm text-white/80">
              Laden · <span style={{ fontFamily: "var(--font-noto-arabic)" }}>المحل</span>
            </span>
          </div>
          {action}
        </div>
        <div style={{ height: 3, background: brand.yellow }} />
      </header>
      <div className="mx-auto max-w-lg px-5 py-8 sm:py-10">{children}</div>
    </section>
  );
}

function SectionTitle({ de, ar }: { de: string; ar: string }) {
  return (
    <h2 className="mb-4 flex items-baseline justify-between border-b border-[var(--color-ink)] pb-2">
      <span className="eyebrow !text-[var(--color-ink)]">{de}</span>
      <span dir="rtl" className="text-sm text-[var(--color-ink-mute)]" style={{ fontFamily: "var(--font-noto-arabic)" }}>
        {ar}
      </span>
    </h2>
  );
}
