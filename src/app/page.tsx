import Hero from "@/components/Hero";
import Preloader from "@/components/Preloader";
import TextReveal from "@/components/TextReveal";
import Services from "@/components/Services";
import Marquee from "@/components/Marquee";
import BentoGrid from "@/components/BentoGrid";
import Testimonials from "@/components/Testimonials";
import AppointmentBanner from "@/components/AppointmentBanner";
import GiantFooter from "@/components/GiantFooter";

export default function Home() {
  return (
    <>
      <Preloader />
      <main id="top" className="flex-1">
        <Hero />
        <TextReveal />
        <Services />
        <Marquee />
        <BentoGrid />
        <Testimonials />
        <AppointmentBanner />
      </main>
      <GiantFooter />
    </>
  );
}
