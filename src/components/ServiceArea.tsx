import { business } from "@/lib/business";
import type { Locale } from "@/lib/business";
import { t } from "@/lib/dictionary";

interface Props { locale: Locale; }

export default function ServiceArea({ locale }: Props) {
  const lang = t(locale);
  const a = lang.area;
  const districts: readonly string[] = a.marl;
  const around: readonly { city: string; time: string }[] = a.around;

  return (
    <section id="einzugsgebiet" className="bg-[var(--color-paper)] section">
      <div className="wrap grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20">
        <div className="lg:col-span-5">
          <p className="eyebrow mb-6">— {a.eyebrow}</p>
          <h2 className="font-display text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.96] tracking-[-0.03em] text-[var(--color-ink)] text-balance">
            {a.title}
          </h2>
          <p className="mt-8 text-[var(--color-ink-soft)] leading-relaxed max-w-md text-pretty">
            {a.body}
          </p>
          <div className="mt-8 flex items-start gap-4">
            <span className="hairline w-10 mt-3 shrink-0 bg-[var(--color-mushroom)]" />
            <span className="caption text-[var(--color-ink-mute)]">{a.note}</span>
          </div>
          <a
            href={business.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="link-line inline-block mt-8 text-sm text-[var(--color-ink)]"
          >
            {business.address.full} →
          </a>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <p className="eyebrow mb-5 text-[var(--color-ink-mute)]">{a.marlLabel}</p>
          <ul className="flex flex-wrap gap-x-2.5 gap-y-2 mb-14">
            {districts.map((d) => (
              <li
                key={d}
                className="text-sm text-[var(--color-ink-soft)] border border-[var(--color-rule)] rounded-full px-4 py-1.5"
              >
                {d}
              </li>
            ))}
          </ul>

          <p className="eyebrow mb-5 text-[var(--color-ink-mute)]">{a.aroundLabel}</p>
          <ul className="border-t border-[var(--color-rule)]">
            {around.map((c) => (
              <li
                key={c.city}
                className="flex items-baseline justify-between gap-4 py-3.5 border-b border-[var(--color-rule)]"
              >
                <span className="text-[var(--color-ink)]">{c.city}</span>
                <span className="caption text-[var(--color-ink-mute)] whitespace-nowrap">{c.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
