import QRCode from "qrcode";
import type { Partner } from "@/lib/partners/db";
import { kindCopy } from "@/lib/partners/codes";
import { business, openingHours } from "@/lib/business";
import KebaMark, { brand } from "@/components/KebaMark";

const SHORT_DAY: Record<string, string> = {
  Montag: "Mo", Dienstag: "Di", Mittwoch: "Mi", Donnerstag: "Do", Freitag: "Fr", Samstag: "Sa", Sonntag: "So",
};

/** "Mo, Di, Do, Fr 09:00–13:00 & 14:30–18:00 · Mi, Sa 09:00–13:00" */
function compactHours(): string {
  const groups = new Map<string, string[]>();
  for (const oh of openingHours) {
    if (!oh.sessions.length) continue;
    const key = oh.sessions.map((s) => s.replace(/\s/g, "")).join(" & ");
    groups.set(key, [...(groups.get(key) ?? []), SHORT_DAY[oh.dayDe]]);
  }
  return [...groups].map(([hours, days]) => `${days.join(", ")} ${hours}`).join(" · ");
}

/** The printable A4 sheets (counter sign + 10 business cards, or only the sign). `toolbar` is screen-only. */
export default async function FlyerView({
  partner,
  toolbar,
  signOnly = false,
}: {
  partner: Partner;
  toolbar?: React.ReactNode;
  signOnly?: boolean;
}) {
  const url = `${business.siteUrl}/p/${partner.slug}`;
  const qr = await QRCode.toString(url, { type: "svg", margin: 0, errorCorrectionLevel: "M", color: { dark: "#0A0908", light: "#0000" } });
  const copy = kindCopy[partner.kind];
  const hours = compactHours();
  const service = partner.kind === "braut" ? "Brautkleid-Änderung" : "Änderung";

  return (
    <div className="flyer-root bg-[var(--color-paper-deep)] py-8 print:bg-white print:py-0">
      <style>{`
        @page { size: A4 portrait; margin: 0; }
        @media print {
          .noise, .no-print { display: none !important; }
          html, body { background: #fff !important; }
          .sheet { box-shadow: none !important; margin: 0 !important; break-after: page; }
        }
        .sheet { width: 210mm; height: 297mm; background: #fff; color: #0A0908; overflow: hidden; }
        .qr svg { width: 100%; height: 100%; display: block; }
      `}</style>

      {toolbar && <div className="no-print mx-auto mb-8 max-w-[210mm] px-4">{toolbar}</div>}

      {/* Sheet 1 — counter sign, in the shop-sign colours */}
      <section className="sheet mx-auto mb-8 flex flex-col shadow-xl">
        <header
          className="flex items-end justify-between"
          style={{ background: brand.teal, padding: "14mm 16mm 10mm", WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" }}
        >
          <KebaMark size={88} />
          <p className="pb-1 text-right text-[10.5pt] leading-snug text-white/80">
            Empfohlen von
            <br />
            <strong className="text-[13pt] text-white">{partner.name}</strong>
          </p>
        </header>
        <div style={{ height: "3mm", background: brand.yellow, printColorAdjust: "exact", WebkitPrintColorAdjust: "exact" }} />

        <div className="flex flex-1 flex-col" style={{ padding: "14mm 16mm 12mm" }}>
          <h1 className="font-display text-[52pt] leading-[0.98]">
            {copy.headline[0]}
            <br />
            {copy.headline[1]}{" "}
            <span className="font-italic-display" style={{ color: brand.teal }}>
              {copy.headline[2]}
            </span>
          </h1>

          <p className="mt-[9mm] text-[15pt] leading-snug text-[#2A2522]">{copy.pitch}</p>

          <div className="mt-auto flex items-center gap-[10mm]">
            <div className="qr shrink-0" style={{ width: "66mm", height: "66mm" }} dangerouslySetInnerHTML={{ __html: qr }} />
            <div>
              <p
                className="inline-block rounded-full px-[6mm] py-[2mm] text-[40pt] font-semibold leading-none"
                style={{ background: brand.yellow, color: brand.teal, printColorAdjust: "exact", WebkitPrintColorAdjust: "exact" }}
              >
                {partner.discount}
              </p>
              <p className="mt-3 text-[14pt] font-medium">Rabatt auf Ihre {service}</p>
              <ol className="mt-4 space-y-1 text-[12pt] text-[#2A2522]">
                <li>1 · QR-Code scannen</li>
                <li>2 · Persönlichen Code erhalten</li>
                <li>3 · Im Laden zeigen</li>
              </ol>
            </div>
          </div>

          <div className="mt-[10mm] grid grid-cols-[1fr_auto] gap-x-6 border-t-2 pt-4 text-[10.5pt] text-[#2A2522]" style={{ borderColor: brand.teal }}>
            <p>
              <strong>{business.address.full}</strong>
              <br />
              {hours}
            </p>
            <p className="text-right">
              Tel. {business.phone}
              <br />
              WhatsApp {business.whatsapp}
            </p>
          </div>
        </div>
      </section>

      {/* Sheet 2 — 10 business cards, 85 × 55 mm, with hairline cut guides */}
      {!signOnly && (
        <section
          className="sheet mx-auto grid shadow-xl"
          style={{
            gridTemplateColumns: "repeat(2, 85mm)",
            gridTemplateRows: "repeat(5, 55mm)",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} className="flex flex-col overflow-hidden border border-dashed border-[#C7BDA9]">
              <div
                className="flex items-center justify-between"
                style={{ background: brand.teal, padding: "2.5mm 4mm", printColorAdjust: "exact", WebkitPrintColorAdjust: "exact" }}
              >
                <KebaMark size={22} tagline={false} />
                <span className="text-[5.8pt] uppercase tracking-[0.16em] text-white/85">Änderungsschneiderei</span>
              </div>
              <div className="flex flex-1 gap-[4mm]" style={{ padding: "3mm 4mm" }}>
                <div className="qr shrink-0 self-center" style={{ width: "27mm", height: "27mm" }} dangerouslySetInnerHTML={{ __html: qr }} />
                <div className="flex min-w-0 flex-col text-[7pt] leading-snug text-[#2A2522]">
                  <p
                    className="self-start rounded-full px-[2.5mm] py-[0.6mm] text-[14pt] font-semibold leading-none"
                    style={{ background: brand.yellow, color: brand.teal, printColorAdjust: "exact", WebkitPrintColorAdjust: "exact" }}
                  >
                    {partner.discount}
                  </p>
                  <p className="mt-[1.2mm] font-medium text-[#0A0908]">auf Ihre {service}</p>
                  <p className="mt-[0.8mm]">QR scannen, Code im Laden zeigen.</p>
                  <p className="mt-auto text-[6pt] text-[#635B52]">
                    Empfohlen von {partner.name}
                    <br />
                    {business.address.full} · {business.phone}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
