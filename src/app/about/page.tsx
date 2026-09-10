import Image from "next/image";
import SubpageNav from "@/components/SubpageNav";

export default function AboutPage() {
  return (
    <main className="flex-1 bg-[#1A4083] text-[#FAF6F0] min-h-screen relative overflow-hidden">
      
      <SubpageNav theme="dark" />

      {/* Hero Section */}
      <section className="relative pt-32 sm:pt-48 pb-20 px-6 sm:px-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 sm:gap-20">
        <div className="flex-1 z-10">
          <span className="text-[#FFC8D4] font-mono text-xs sm:text-sm tracking-[0.2em] uppercase mb-6 block border border-[#FFC8D4]/30 inline-block px-4 py-1.5 rounded-full">
            The Atelier
          </span>
          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 leading-[0.9]">
            Crafted for <br />
            <span className="text-[#FFC8D4] italic font-light tracking-tight">lifelong</span> stories.
          </h1>
          <p className="text-lg sm:text-xl opacity-80 leading-relaxed max-w-md">
            At Studio Memento, we believe jewelry should be more than an accessory. It should be a tangible memory—a vessel for vows, chapters, and the beautiful becoming of you.
          </p>
        </div>

        {/* Feature Image */}
        <div className="flex-1 relative w-full aspect-[4/5] max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl shadow-[#0F2753] border border-white/5 group">
          <Image
            src="/images/Workshop.png"
            alt="Studio Workshop"
            fill
            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A4083]/60 via-transparent to-transparent mix-blend-overlay" />
        </div>
      </section>

      {/* Details Section */}
      <section className="py-20 px-6 sm:px-10 max-w-6xl mx-auto border-t border-white/10 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-24">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xl backdrop-blur-sm">✿</span>
              <h3 className="font-display text-3xl font-bold">Our Materials</h3>
            </div>
            <p className="opacity-70 leading-relaxed text-lg">
              We exclusively use conflict-free 18k solid gold, anti-tarnish alloys, and ethically sourced baroque pearls. Every piece is hypoallergenic, meticulously forged, and rigorously tested for absolute longevity.
            </p>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFC8D4]/10 text-[#FFC8D4] text-xl backdrop-blur-sm">✦</span>
              <h3 className="font-display text-3xl font-bold">Our Process</h3>
            </div>
            <p className="opacity-70 leading-relaxed text-lg">
              From raw 3D prototyping to the ancient art of lost-wax casting, our artisans hand-finish each heirloom. We invite clients into our studio for collaborative, bespoke design sessions.
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}
