"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
  image: string;
}

const SERVICES: ServiceCard[] = [
  {
    number: "01",
    icon: "♥",
    title: "Karim & Aurelie",
    subtitle: "Permanent Jewellery Walk-in",
    description:
      "We fell in love with Studio Memento’s private charm session. It felt less like shopping and more like finding tiny gold reminders of our journey together. My permanent bracelet has not left my wrist for two years.",
    tags: [
      "Custom Charms",
      "Permanent Bracelet",
      "Anniversary Gift",
    ],
    bgColor: "bg-[#FFF2EB]",
    textColor: "text-[#1B4083]",
    pillBg: "bg-white",
    pillText: "text-[#1B4083]",
    borderClass: "border-[#1B4083]/15",
    image: "/images/heart-card-editorial.png",
  },
  {
    number: "02",
    icon: "✧",
    title: "Tara Sharma",
    subtitle: "Everyday Wear Staples",
    description:
      "I was looking for something I could wear every day without worrying about it tarnishing in the shower or at the gym. Their anti-tarnish chains are incredible—still shining bright after months of daily wear!",
    tags: [
      "Water-Resistant",
      "Anti-Tarnish",
      "Everyday Wear",
    ],
    bgColor: "bg-[#FFC8D4]",
    textColor: "text-[#1B4083]",
    pillBg: "bg-[#1B4083]",
    pillText: "text-white",
    borderClass: "border-[#1B4083]/20",
    image: "/images/18k_Gold_Plated.png",
  },
  {
    number: "03",
    icon: "✦",
    title: "Aditi Rao",
    subtitle: "Bridal Party Gifts",
    description:
      "I booked a session for my bridesmaids to each build their own custom charm necklace. It was such a special experience to share with my favorite people, and now we all have a piece that connects us.",
    tags: [
      "Charm Bar",
      "Bridesmaids",
      "Custom Necklaces",
    ],
    bgColor: "bg-[#E0693E]",
    textColor: "text-[#FAF6F0]",
    pillBg: "bg-white/20",
    pillText: "text-white",
    borderClass: "border-white/25",
    image: "/images/necklace.png",
  },
];

export default function ModularStackedServices() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Animate the intro typography
      gsap.from(".stacked-title", {
        scrollTrigger: {
          trigger: ".intro-container",
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out",
      });

      // Animate floating images
      gsap.from(".float-img-1", {
        scrollTrigger: { trigger: ".intro-container", start: "top 80%" },
        y: 100, x: -50, rotation: -15, opacity: 0, duration: 1.5, ease: "power3.out"
      });
      
      gsap.from(".float-img-2", {
        scrollTrigger: { trigger: ".intro-container", start: "top 80%" },
        y: 100, x: 50, rotation: 15, opacity: 0, duration: 1.5, delay: 0.2, ease: "power3.out"
      });

      gsap.from(".float-img-main", {
        scrollTrigger: { trigger: ".intro-container", start: "top 80%" },
        y: 120, scale: 0.9, opacity: 0, duration: 1.5, delay: 0.1, ease: "power3.out"
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="craft" 
      ref={containerRef}
      className="relative w-full max-w-full pt-28 sm:pt-36 pb-10 sm:pb-16 text-[#FAF6F0] scroll-mt-20 bg-transparent"
    >
      <div className="container-modular">
          {/* Large Cinematic Typography Intro (Studio Modular Style) */}
          <div className="intro-container relative mb-20 md:mb-36 pt-6 sm:pt-10 flex flex-col items-center overflow-hidden px-4">
            <h2 className="stacked-title text-center font-display text-[12vw] sm:text-[10vw] leading-[0.9] font-bold tracking-tighter text-[#FAF6F0]">
              Crafting lifelong<br />stories
            </h2>
            
            {/* Floating Images (Parallax-like static positioning) */}
            <div className="relative h-[280px] sm:h-[380px] md:h-[540px] w-full max-w-5xl mx-auto my-10 md:my-16 flex justify-center items-center overflow-hidden">
              {/* Left float */}
              <div className="float-img-1 absolute top-0 left-0 md:left-[5%] w-[40%] md:w-[30%] aspect-[3/4] rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-2xl -rotate-6 z-0">
                 <Image
                   src="/images/heart-card-editorial.png"
                   alt="Bespoke Design"
                   fill
                   sizes="(max-width: 768px) 40vw, 30vw"
                   className="object-cover"
                 />
              </div>
              
              {/* Right float */}
              <div className="float-img-2 absolute bottom-[-10%] right-0 md:right-[5%] w-[45%] md:w-[35%] aspect-[4/3] rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-2xl rotate-3 z-0">
                 <Image
                   src="/images/all-jewellery.webp"
                   alt="Charm Bar"
                   fill
                   sizes="(max-width: 768px) 45vw, 35vw"
                   className="object-cover"
                 />
              </div>
              
              {/* Center main */}
              <div className="float-img-main relative z-10 w-[50%] md:w-[35%] aspect-[4/5] rounded-2xl sm:rounded-[2.5rem] overflow-hidden shadow-2xl">
                 <Image
                   src="/images/Soleil_Statement_anti-tarnish_drop_pearl_earrings.png"
                   alt="Soleil Statement"
                   fill
                   sizes="(max-width: 768px) 50vw, 35vw"
                   className="object-cover"
                 />
              </div>
            </div>
            
            <h2 className="stacked-title text-center font-display text-[12vw] sm:text-[10vw] leading-[0.9] font-bold tracking-tighter text-[#FAF6F0]">
              one piece<br />at a time.
            </h2>

            <div className="mt-10 text-center max-w-xl mx-auto px-4">
              <span className="font-mono text-xs sm:text-sm uppercase tracking-[0.25em] text-[#FFC8D4] block mb-3">
                CLIENT STORIES
              </span>
              <p className="text-sm sm:text-base text-[#FAF6F0]/80 leading-relaxed font-sans">
                Real experiences from our lovely clients who trusted us with their memories.
              </p>
            </div>
          </div>

          {/* Sticky Stacked Cards Accordion Container (Studio Modular Signature Interaction) */}
          <div className="relative max-w-5xl mx-auto pb-8 sm:pb-12 lg:pb-16">
            {SERVICES.map((service, index) => (
              <div
                key={service.number}
                className={`sticky rounded-[2rem] sm:rounded-[2.5rem] px-5 sm:px-9 lg:px-11 pt-3.5 sm:pt-4 pb-6 sm:pb-9 ${service.bgColor} ${service.textColor} border ${service.borderClass}`}
                style={{
                  top: `calc(7rem + ${index * 3}rem)`,
                  zIndex: index + 10,
                  marginBottom: index === SERVICES.length - 1 ? "0px" : "20vh",
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
                        href="/gallery"
                        className="group inline-flex items-center gap-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider underline underline-offset-8 transition-opacity hover:opacity-75"
                      >
                        <span>View our gallery</span>
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                      </Link>
                    </div>
                  </div>

                  {/* Right Side: Image Only */}
                  <div className="lg:col-span-5 flex flex-col justify-center">
                    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-current/10 group">
                      <Image 
                        src={service.image} 
                        alt={service.title} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                      />
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
