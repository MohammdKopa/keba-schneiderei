import type { Metadata, Viewport } from "next";
import { Fraunces, Instrument_Serif, Inter, Noto_Naskh_Arabic, Amiri } from "next/font/google";
import "./globals.css";
import GSAPProvider from "@/components/GSAPProvider";
import LocalizedShell from "@/components/LocalizedShell";
import { business, openingHours } from "@/lib/business";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const notoArabic = Noto_Naskh_Arabic({
  variable: "--font-noto-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kebaschneiderei.com"),
  title: {
    default: "Keba Schneiderei — Maßschneiderei in Marl",
    template: "%s · Keba Schneiderei",
  },
  description:
    "Maßgeschneiderte Anzüge, Kleider nach Maß und Änderungen. Das Atelier von Ahmad Keba in Marl — traditionelles Handwerk, modernes Design. Seit 2022.",
  keywords: [
    "Maßschneiderei Marl",
    "Schneider Marl",
    "Maßanzug Marl",
    "Änderungsschneiderei Marl",
    "Ahmad Keba",
    "Brautkleid Marl",
    "Bespoke Tailor NRW",
  ],
  openGraph: {
    title: "Keba Schneiderei — Maßschneiderei in Marl",
    description: "Das Atelier von Ahmad Keba — traditionelles Handwerk, modernes Design.",
    type: "website",
    locale: "de_DE",
    alternateLocale: "ar",
    siteName: "Keba Schneiderei",
  },
  alternates: {
    languages: { de: "/", ar: "/ar" },
  },
};

export const viewport: Viewport = {
  themeColor: "#F5EFE4",
  width: "device-width",
  initialScale: 1,
};

const dayMap: Record<string, string> = {
  Monday: "Monday", Tuesday: "Tuesday", Wednesday: "Wednesday",
  Thursday: "Thursday", Friday: "Friday", Saturday: "Saturday", Sunday: "Sunday",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TailorShop",
  name: business.name,
  founder: business.owner,
  foundingDate: String(business.founded),
  image: `${business.siteUrl}/og.jpg`,
  telephone: business.phoneHref,
  email: business.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: business.address.street,
    addressLocality: business.address.city,
    postalCode: business.address.zip,
    addressCountry: business.address.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: business.coordinates.lat,
    longitude: business.coordinates.lng,
  },
  url: business.siteUrl,
  sameAs: [business.instagram],
  priceRange: "€€€",
  openingHoursSpecification: openingHours.flatMap((oh) =>
    oh.sessions.map((s) => {
      const [opens, closes] = s.split("–").map((x) => x.trim());
      return {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: dayMap[oh.dayEn] || oh.dayEn,
        opens,
        closes,
      };
    })
  ),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="de"
      dir="ltr"
      data-scroll-behavior="smooth"
      className={`${fraunces.variable} ${instrument.variable} ${inter.variable} ${notoArabic.variable} ${amiri.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="noise" aria-hidden />
        <GSAPProvider>
          <LocalizedShell>{children}</LocalizedShell>
        </GSAPProvider>
      </body>
    </html>
  );
}
