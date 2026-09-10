"use client";

import Image from "next/image";
import Link from "next/link";

interface ServiceCard {
  number: string;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  bgColor: string;
  textColor: string;
  pillBg: string;
  pillText: string;
  borderClass: string;
}

const SERVICES: ServiceCard[] = [
  {
    number: "01",
    icon: "✿",
    title: "Bespoke Jewellery Design",
    subtitle: "Custom Casting & One-of-a-Kind Milestones",
    description:
      "Every great piece starts with a personal vision. We translate milestones, love stories, and intimate memories into custom hand-carved gold castings and private commissions.",
    tags: [
      "Custom 3D Prototyping",
      "Lost-Wax Casting",
      "18k Solid Gold & Platinum",
      "Hand Engraved Initials",
      "Private Studio Sessions",
    ],
    bgColor: "bg-[#FFF2EB]",
    textColor: "text-[#1B4083]",
    pillBg: "bg-white",
    pillText: "text-[#1B4083]",
    borderClass: "border-[#1B4083]/15",
  },
  {
    number: "02",
    icon: "✺",
    title: "The Charm Bar & Permanent Links",
    subtitle: "Claspless Micro-Welding & Symbolic Talismans",
    description:
      "Select from over 60 hand-cast symbolic charms, birthstones, and talismans to assemble your bespoke necklace, or experience micro-welded claspless permanent jewellery.",
    tags: [
      "Micro-Welded Permanent Chains",
      "Curated Symbolic Talismans",
      "Baroque Pearl Extensions",
      "Custom Charm Stacking",
      "Live Bar Consultations",
    ],
    bgColor: "bg-[#FFC8D4]",
    textColor: "text-[#1B4083]",
    pillBg: "bg-[#1B4083]",
    pillText: "text-white",
    borderClass: "border-[#1B4083]/20",
  },
  {
    number: "03",
    icon: "⬡",
    title: "Heirloom Redesign & Sourcing",
    subtitle: "Resetting Family Gold & Conflict-Free Gems",
    description:
      "Breathe radiant new life into inherited gold and vintage family jewels. We reset precious stones into sleek, architectural contemporary settings crafted for modern elegance.",
    tags: [
      "Conflict-Free Gemstone Sourcing",
      "Family Gold Melting & Recasting",
      "Diamond & Sapphire Resetting",
      "Prong & Bezel Restoration",
      "Lifetime Craft Guarantee",
    ],
    bgColor: "bg-[#E0693E]",
    textColor: "text-[#FAF6F0]",
    pillBg: "bg-white/20",
    pillText: "text-white",
    borderClass: "border-white/25",
  },
];

export default function ModularStackedServices() {
  return (
    <section 
      id="craft" 
      className="relative w-full max-w-full py-24 sm:py-36 text-[#FAF6F0] scroll-mt-12 bg-transparent"
    >
      <div className="container-modular">
          {/* Large Cinematic Typography Intro (Studio Modular Style) */}
          <div className="relative mb-24 md:mb-36 pt-10 flex flex-col items-center overflow-hidden">
            <h2 className="text-center font-display text-[12vw] sm:text-[10vw] leading-[0.9] font-bold tracking-tighter text-[#FAF6F0]">
              From raw<br />inspiration
            </h2>
            
            {/* Floating Images (Parallax-like static positioning) */}
            <div className="relative h-[280px] sm:h-[380px] md:h-[540px] w-full max-w-5xl mx-auto my-10 md:my-16 flex justify-center items-center overflow-hidden">
              {/* Left float */}
              <div className="absolute top-0 left-0 md:left-[5%] w-[40%] md:w-[30%] aspect-[3/4] rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-2xl -rotate-6 z-0">
                 <Image
                   src="/images/heart-card-editorial.png"
                   alt="Bespoke Design"
                   fill
                   sizes="(max-width: 768px) 40vw, 30vw"
                   className="object-cover"
                 />
              </div>
              
              {/* Right float */}
              <div className="absolute bottom-[-10%] right-0 md:right-[5%] w-[45%] md:w-[35%] aspect-[4/3] rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-2xl rotate-3 z-0">
                 <Image
                   src="/images/all-jewellery.webp"
                   alt="Charm Bar"
                   fill
                   sizes="(max-width: 768px) 45vw, 35vw"
                   className="object-cover"
                 />
              </div>
              
              {/* Center main */}
              <div className="relative z-10 w-[50%] md:w-[35%] aspect-[4/5] rounded-2xl sm:rounded-[2.5rem] overflow-hidden shadow-2xl">
                 <Image
                   src="/images/Soleil_Statement_anti-tarnish_drop_pearl_earrings.png"
                   alt="Soleil Statement"
                   fill
                   sizes="(max-width: 768px) 50vw, 35vw"
                   className="object-cover"
                 />
              </div>
            </div>
            
            <h2 className="text-center font-display text-[12vw] sm:text-[10vw] leading-[0.9] font-bold tracking-tighter text-[#FAF6F0]">
              to lifelong<br />heirloom.
            </h2>

            <div className="mt-10 text-center max-w-xl mx-auto px-4">
              <span className="font-mono text-xs sm:text-sm uppercase tracking-[0.25em] text-[#FFC8D4] block mb-3">
                SERVICES & ATELIER
              </span>
              <p className="text-sm sm:text-base text-[#FAF6F0]/80 leading-relaxed font-sans">
                Three bespoke pathways to celebrate milestones, express devotion, and create timeless modern talismans.
              </p>
            </div>
          </div>

          {/* Sticky Stacked Cards Accordion Container (Studio Modular Signature Interaction) */}
          <div className="relative max-w-5xl mx-auto pb-48 sm:pb-72 lg:pb-96">
            {SERVICES.map((service, index) => (
              <div
                key={service.number}
                className={`sticky rounded-[2rem] sm:rounded-[2.5rem] px-6 sm:px-9 lg:px-11 pt-3.5 sm:pt-4 pb-7 sm:pb-9 ${service.bgColor} ${service.textColor} border ${service.borderClass}`}
                style={{
                  top: `calc(var(--card-stack-base) + ${index} * var(--card-stack-step))`,
                  zIndex: index + 10,
                  marginBottom: index === SERVICES.length - 1 ? "0px" : "18vh",
                  boxShadow: `0 -12px 32px -4px rgba(0, 0, 0, 0.16), 0 25px 50px -12px rgba(0, 0, 0, 0.32)`,
                }}
              >
                {/* Visible Header Tab (Always visible with clear breathing room when stacked) */}
                <div className="flex items-center justify-between gap-4 h-10 sm:h-12 border-b border-current/10 pb-2 sm:pb-2.5 mb-4 sm:mb-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-white/40 text-xs sm:text-base font-bold backdrop-blur-sm shadow-sm">
                      {service.icon}
                    </span>
                    <span className="font-mono text-xs sm:text-sm uppercase tracking-widest opacity-85 font-bold">
                      {service.number} / {service.title}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider opacity-60 hidden md:block">
                    {service.subtitle}
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start pt-1 sm:pt-2">
                  {/* Left Side: Title, Description, CTA */}
                  <div className="lg:col-span-7">
                    <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-3 sm:mb-4">
                      {service.title}
                    </h3>

                    <p className="text-sm sm:text-base leading-relaxed opacity-85 max-w-xl">
                      {service.description}
                    </p>

                    <div className="mt-6 sm:mt-7">
                      <Link
                        href="/appointment"
                        className="group inline-flex items-center gap-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider underline underline-offset-8 transition-opacity hover:opacity-75"
                      >
                        <span>Explore this service</span>
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                      </Link>
                    </div>
                  </div>

                  {/* Right Side: Specific Sub-Pills / Offerings */}
                  <div className="lg:col-span-5 flex flex-col justify-center">
                    <span className="text-[11px] sm:text-xs uppercase tracking-widest font-bold opacity-65 mb-3 block">
                      Atelier Inclusions
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className={`rounded-full px-3 py-1.5 text-xs font-semibold tracking-tight shadow-sm ${service.pillBg} ${service.pillText}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
  );
}
