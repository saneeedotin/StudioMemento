import ModularHero from "@/components/ModularHero";
import ModularManifesto from "@/components/ModularManifesto";
import ModularCasesGrid from "@/components/ModularCasesGrid";
import ModularStackedServices from "@/components/ModularStackedServices";
import ModularAbout from "@/components/ModularAbout";
import ModularInsights from "@/components/ModularInsights";
import ModularScrollProgress from "@/components/ModularScrollProgress";
import AmbientBackground from "@/components/AmbientBackground";

export default function Home() {
  return (
    <main id="top" className="flex-1 bg-[#FAF6F0] w-full max-w-full">
      <ModularScrollProgress />
      
      {/* Continuous Ambient Canvas 1: Hero, Permanent Jewellery, Curated Showcase & Atelier Experience/FAQ */}
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

      {/* Continuous Ambient Canvas 3: Notes From The Bench & Consultation Banner */}
      <AmbientBackground variant="peach">
        <ModularInsights />
      </AmbientBackground>
    </main>
  );
}
