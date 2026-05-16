import type { Metadata, Viewport } from "next";
import { Fraunces, Instrument_Serif, Inter, Noto_Naskh_Arabic, Amiri } from "next/font/google";
import Script from "next/script";
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
  metadataBase: new URL(business.siteUrl),
  title: {
    default: "Keba Schneiderei — Änderungsschneiderei in Marl",
    template: "%s · Keba Schneiderei",
  },
  description:
    "Änderungen, Bestickung, Reparaturen, Vorhänge und Maßanfertigung in Marl. Das Atelier von Ahmad Keba — über 30 Jahre Erfahrung. Deutsch · Arabisch · Englisch.",
  applicationName: "Keba Schneiderei",
  authors: [{ name: business.owner }],
  creator: business.owner,
  publisher: business.name,
  keywords: [
    "Änderungsschneiderei Marl",
    "Schneider Marl",
    "Hosen kürzen Marl",
    "Reißverschluss wechseln Marl",
    "Bestickung Marl",
    "Logo sticken Marl",
    "Vorhänge nähen Marl",
    "Maßschneiderei Marl",
    "Maßanzug Marl",
    "Brautkleid Änderung Marl",
    "Ahmad Keba",
    "Schneider Recklinghausen",
    "Schneider Ruhrgebiet",
    "خياط مارل",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Keba Schneiderei — Änderungsschneiderei in Marl",
    description:
      "Änderungen, Bestickung, Reparaturen und Maßanfertigung. Das Atelier von Ahmad Keba in Marl — seit 2022.",
    url: business.siteUrl,
    type: "website",
    locale: "de_DE",
    alternateLocale: "ar",
    siteName: business.name,
    images: [
      {
        url: "/images/atelier/yellow-suit-form.jpg",
        width: 1200,
        height: 1600,
        alt: "Atelier Keba — Zweiteiler auf der Schneiderpuppe mit Maßband",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Keba Schneiderei — Änderungsschneiderei in Marl",
    description:
      "Änderungen, Bestickung, Reparaturen und Maßanfertigung. Ahmad Keba · Marl · seit 2022.",
    images: ["/images/atelier/yellow-suit-form.jpg"],
  },
  alternates: {
    canonical: "/",
    languages: {
      "de-DE": "/",
      "ar": "/ar",
      "x-default": "/",
    },
  },
  category: "clothing alteration",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
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
  "@id": `${business.siteUrl}/#business`,
  name: business.name,
  alternateName: "Keba Änderungsschneiderei",
  description:
    "Änderungsschneiderei und Maßschneiderei in Marl. Änderungen, Bestickung, Reparaturen, Vorhänge und Maßanfertigung — seit 2022.",
  founder: business.owner,
  foundingDate: String(business.founded),
  image: [`${business.siteUrl}/images/atelier/yellow-suit-form.jpg`],
  logo: `${business.siteUrl}/logo.png`,
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
  priceRange: "€€",
  currenciesAccepted: "EUR",
  paymentAccepted: "Cash, EC, Überweisung",
  areaServed: [
    { "@type": "City", name: "Marl" },
    { "@type": "City", name: "Recklinghausen" },
    { "@type": "City", name: "Haltern am See" },
    { "@type": "City", name: "Dorsten" },
    { "@type": "AdministrativeArea", name: "Ruhrgebiet" },
  ],
  knowsLanguage: ["de", "ar", "en"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Leistungen",
    itemListElement: [
      { "@type": "OfferCatalog", name: "Änderungen & Anpassungen" },
      { "@type": "OfferCatalog", name: "Reparaturen & Reißverschlüsse" },
      { "@type": "OfferCatalog", name: "Bestickung (Namen & Logos)" },
      { "@type": "OfferCatalog", name: "Vorhänge nach Maß" },
      { "@type": "OfferCatalog", name: "Maßanfertigung (Anzüge & Kleider)" },
    ],
  },
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
        <Script
          defer
          src="https://analytics.kametrix.com/script.js"
          data-website-id="4b60ccdd-9b38-4f1a-b772-c95699ab8543"
          strategy="afterInteractive"
        />
        <div className="noise" aria-hidden />
        <GSAPProvider>
          <LocalizedShell>{children}</LocalizedShell>
        </GSAPProvider>
      </body>
    </html>
  );
}
