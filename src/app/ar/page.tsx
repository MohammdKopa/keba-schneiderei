import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import CraftSequence from "@/components/CraftSequence";
import FabricMarquee from "@/components/FabricMarquee";
import ServicesRail from "@/components/ServicesRail";
import WorkGallery from "@/components/WorkGallery";
import AtelierPortrait from "@/components/AtelierPortrait";
import Reviews from "@/components/Reviews";
import ContactSection from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "كيبا — خياطة التعديلات في مارل",
  description:
    "تعديلات، تطريز، إصلاحات، ستائر وتفصيل حسب الطلب في مدينة مارل. أتولييه أحمد كيبا — أكثر من ثلاثين سنة خبرة.",
  alternates: {
    canonical: "/ar",
    languages: {
      "de-DE": "/",
      "ar": "/ar",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "كيبا — خياطة التعديلات في مارل",
    description:
      "تعديلات، تطريز، إصلاحات وتفصيل. أتولييه أحمد كيبا في مارل — منذ ٢٠٢٢.",
    locale: "ar",
    alternateLocale: "de_DE",
    type: "website",
    images: [
      {
        url: "/images/atelier/yellow-suit-form.jpg",
        width: 1200,
        height: 1600,
        alt: "أتولييه كيبا — طقم على الكرّاكة مع متر التفصيل",
      },
    ],
  },
};

export default function HomeAr() {
  return (
    <>
      <Hero locale="ar" />
      <Philosophy locale="ar" />
      <CraftSequence locale="ar" />
      <FabricMarquee locale="ar" />
      <ServicesRail locale="ar" />
      <WorkGallery locale="ar" />
      <AtelierPortrait locale="ar" />
      <Reviews locale="ar" />
      <ContactSection locale="ar" />
    </>
  );
}
