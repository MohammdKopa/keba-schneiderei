import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-[var(--color-paper)] px-6">
      <div className="text-center max-w-md">
        <p className="eyebrow mb-8">— 404</p>
        <h1 className="font-display text-7xl text-[var(--color-ink)] leading-[0.95] tracking-[-0.02em]">
          Verloren <span className="font-italic-display text-[var(--color-cognac)]">im</span> Stoff.
        </h1>
        <p className="mt-8 text-[var(--color-ink-soft)]">Diese Seite existiert nicht.</p>
        <Link href="/" className="btn btn-ink mt-10 inline-flex">
          <span>Zur Startseite</span>
        </Link>
      </div>
    </section>
  );
}
