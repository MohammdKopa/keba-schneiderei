import { Fredoka } from "next/font/google";
import { brand } from "@/lib/brand";

export { brand };

// The shop-sign wordmark: rounded yellow "Keba" over a dark teal band.
// Fredoka SemiBold matches the letterforms of the sign and of /logo.png.
const fredoka = Fredoka({ subsets: ["latin"], weight: ["600"], display: "swap" });

export default function KebaMark({
  size = 40,
  tagline = true,
  taglineColor = "#FFFFFF",
}: {
  size?: number;
  tagline?: boolean;
  taglineColor?: string;
}) {
  return (
    <span className="inline-flex flex-col items-start leading-none">
      <span
        className={fredoka.className}
        style={{ color: brand.yellow, fontSize: size, letterSpacing: "-0.01em", lineHeight: 0.9 }}
      >
        Keba
      </span>
      {tagline && (
        <span
          style={{
            color: taglineColor,
            fontSize: Math.max(size * 0.22, 8),
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginTop: size * 0.12,
            fontFamily: "var(--font-inter), sans-serif",
            fontWeight: 500,
          }}
        >
          Änderungsschneiderei
        </span>
      )}
    </span>
  );
}
