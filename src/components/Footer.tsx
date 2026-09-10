"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SITE } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const wordmark = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.from("[data-memento-letter]", {
        yPercent: 110,
        rotate: 5,
        stagger: 0.07,
        ease: "power4.out",
        scrollTrigger: { trigger: wordmark.current, start: "top 92%", end: "top 55%", scrub: 1 },
      });
    }, wordmark);
    return () => context.revert();
  }, []);

  return (
    <footer
      id="contact"
      data-nav-theme="dark"
      className="relative overflow-hidden bg-night text-cream"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px [background:linear-gradient(90deg,transparent,rgba(244,81,155,0.7),rgba(64,89,241,0.7),transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[120%] -translate-x-1/2 opacity-25 [background:radial-gradient(45%_60%_at_30%_50%,rgba(64,89,241,0.55),transparent_70%),radial-gradient(40%_55%_at_70%_45%,rgba(244,81,155,0.5),transparent_70%)]"
      />

      <div className="container-x relative pb-12 pt-24 md:pt-32">
        <p className="font-script text-3xl text-pink-soft md:text-4xl">
          come, write your chapter —
        </p>
        <h2 className="mt-3 max-w-xl font-display text-4xl font-extrabold uppercase leading-[1.02] tracking-tight md:text-6xl">
          Ready when you are.
        </h2>

        <div className="mt-16 grid gap-10 border-t border-night-line pt-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-mist">
              Visit
            </h3>
            <a 
              href={SITE.mapsLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mt-4 block text-sm leading-relaxed text-cream/85 transition-colors hover:text-pink hover:underline"
            >
              {SITE.addressLine1}
              <br />
              {SITE.addressLine2}
            </a>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-mist">
              Hours
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-cream/85">
              {SITE.hours}
              <br />
              Every day
            </p>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-mist">
              Talk to us
            </h3>
            <a
              href={SITE.phoneHref}
              className="mt-4 block w-fit text-sm text-cream/85 transition-colors duration-300 hover:text-pink"
            >
              {SITE.phone}
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="block w-fit text-sm text-cream/85 transition-colors duration-300 hover:text-pink"
            >
              {SITE.email}
            </a>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-mist">
              Follow
            </h3>
            <div className="mt-4 flex flex-col gap-1.5">
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noreferrer"
                className="group w-fit text-sm text-cream/85 transition-colors duration-300 hover:text-pink"
              >
                Instagram
                <span className="block h-px max-w-0 bg-current transition-all duration-300 ease-luxe group-hover:max-w-full" />
              </a>
              <a
                href={SITE.pinterest}
                target="_blank"
                rel="noreferrer"
                className="group w-fit text-sm text-cream/85 transition-colors duration-300 hover:text-blue"
              >
                Pinterest
                <span className="block h-px max-w-0 bg-current transition-all duration-300 ease-luxe group-hover:max-w-full" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-3 text-xs text-mist sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {SITE.name}. Made with love.</p>
          <div className="flex items-center gap-5">
            <span>Jewellery styling consultations</span>
            <a href="/admin" className="transition-colors duration-300 hover:text-cream">
              Admin
            </a>
          </div>
        </div>

        <div ref={wordmark} aria-label="memento" className="mt-24 flex overflow-hidden border-t border-night-line pt-8 font-display text-[clamp(4.5rem,18vw,16rem)] font-extrabold lowercase leading-[0.72] tracking-[-0.08em] text-cream/90" role="img">
          {"memento".split("").map((letter, index) => (
            <span key={`${letter}-${index}`} data-memento-letter className="inline-block transition-colors duration-500 hover:text-pink">{letter}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}
