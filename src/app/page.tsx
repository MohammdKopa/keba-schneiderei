import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import CraftSequence from "@/components/CraftSequence";
import FabricMarquee from "@/components/FabricMarquee";
import ServicesRail from "@/components/ServicesRail";
import WorkGallery from "@/components/WorkGallery";
import AtelierPortrait from "@/components/AtelierPortrait";
import Reviews from "@/components/Reviews";
import ServiceArea from "@/components/ServiceArea";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <>
      <Hero locale="de" />
      <Philosophy locale="de" />
      <CraftSequence locale="de" />
      <FabricMarquee locale="de" />
      <ServicesRail locale="de" />
      <WorkGallery locale="de" />
      <AtelierPortrait locale="de" />
      <Reviews locale="de" />
      <ServiceArea locale="de" />
      <ContactSection locale="de" />
    </>
  );
}
