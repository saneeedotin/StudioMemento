"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Services() {
  const container = useRef<HTMLElement>(null);

  const services = [
    {
      title: "Bespoke Design",
      description: "Every great piece starts with a vision. Together, we define your style and shape an heirloom that reflects your personal journey, designed with intention and crafted for lasting impact.",
    },
    {
      title: "Ethical Sourcing",
      description: "True luxury is transparent. We guide you through our sourcing process with attention to both the brilliance of the stones and the integrity of their origins.",
    },
    {
      title: "Timeless Craftsmanship",
      description: "Design makes beauty visible. Through a network of master artisans, we translate your ideas into tangible expressions, ensuring your piece doesn't just look beautiful; it endures.",
    },
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".service-item",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".services-list",
            start: "top 80%",
          },
        }
      );
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} className="bg-[#fff0eb] py-24 md:py-36 text-[#043c74] relative">
      <div className="container-x mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-start">
          
          {/* Sticky Left Column */}
          <div className="lg:sticky lg:top-32 lg:pr-12">
            <h2 className="font-display text-4xl font-extrabold uppercase leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
              We help individuals shape their style, guide their journey, and turn moments into stories that last forever.
            </h2>
            <p className="mt-8 text-sm md:text-base leading-relaxed opacity-80">
              Every creation starts with clarity. A clear vision, a shared aesthetic, and the courage to express yourself.
            </p>
          </div>

          {/* Scrolling Right Column */}
          <div className="services-list flex flex-col gap-6 pt-4 lg:pt-0">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="service-item group flex gap-6 rounded-[1.5rem] p-8 transition-colors duration-500 hover:bg-[#fecbd7] border border-transparent hover:border-[#043c74]/10 cursor-default"
              >
                <div className="flex-shrink-0 mt-1">
                  <div className="h-12 w-12 rounded-full border-2 border-[#043c74] flex items-center justify-center bg-white group-hover:bg-[#043c74] group-hover:text-white transition-colors duration-500">
                    <span className="font-display text-sm font-bold">0{index + 1}</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold uppercase tracking-tight mb-4">{service.title}</h3>
                  <p className="text-base leading-relaxed opacity-80">{service.description}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
