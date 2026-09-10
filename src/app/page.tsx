import ModularHero from "@/components/ModularHero";
import ModularManifesto from "@/components/ModularManifesto";
import ModularCasesGrid from "@/components/ModularCasesGrid";
import ModularStackedServices from "@/components/ModularStackedServices";
import ModularAbout from "@/components/ModularAbout";
import ModularTestimonials from "@/components/ModularTestimonials";
import ModularInsights from "@/components/ModularInsights";
import ModularFooter from "@/components/ModularFooter";
import ModularScrollProgress from "@/components/ModularScrollProgress";
import AmbientBackground from "@/components/AmbientBackground";

export default function Home() {
  return (
    <main id="top" className="flex-1 bg-[#FAF6F0] w-full max-w-full overflow-x-clip">
      <ModularScrollProgress />
      
      {/* Continuous Ambient Canvas 1: Hero, Permanent Jewellery Manifesto, & Curated Showcase */}
      <AmbientBackground variant="pink">
        <ModularHero />
        <ModularManifesto />
        <ModularCasesGrid />
      </AmbientBackground>

      {/* Continuous Ambient Canvas 2: Solid Dark Atelier Services & Philosophy */}
      <AmbientBackground variant="navy">
        <ModularStackedServices />
        <ModularAbout />
      </AmbientBackground>

      {/* Continuous Ambient Canvas 2: Client Words, Notes From The Bench, & Consultation Banner */}
      <AmbientBackground variant="peach">
        <ModularTestimonials />
        <ModularInsights />
        <ModularFooter />
      </AmbientBackground>
    </main>
  );
}
