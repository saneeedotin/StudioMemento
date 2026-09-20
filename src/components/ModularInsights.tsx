"use client";

import Image from "next/image";
import Link from "next/link";

const ARTICLES = [
  {
    category: "Styling Guide",
    title: "How to Build a Meaningful Charm Bracelet Over a Lifetime",
    date: "August 2026",
    image: "/images/18k_Gold_Plated.png",
    readTime: "4 min read",
  },
  {
    category: "Craft & Material",
    title: "Gold That Remembers: Why Solid 18k & Anti-Tarnish Alloys Last Forever",
    date: "July 2026",
    image: "/images/Soleil_Statement_anti-tarnish_drop_pearl_earrings.png",
    readTime: "5 min read",
  },
  {
    category: "Behind the Bench",
    title: "From Inherited Keepsakes to Daily Wear: Preserving Memories in Modern Gold",
    date: "June 2026",
    image: "/images/heart-card-editorial.png",
    readTime: "6 min read",
  },
];

export default function ModularInsights() {
  return (
    <section className="relative py-24 sm:py-36 text-[#1B4083]">
      <div className="container-modular max-w-[85rem]">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="inline-block rounded-full bg-[#FFC8D4] px-4 py-1 text-xs font-bold uppercase tracking-widest text-[#1B4083] mb-4">
              ✦ The Memento Journal ✦
            </span>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1B4083]">
              Stories gathered at the bench.
            </h2>
          </div>
          <Link
            href="/appointment"
            className="group hidden sm:inline-flex items-center gap-2 text-base font-bold text-[#1B4083] hover:text-[#0F2753]"
          >
            <span>Read all articles</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARTICLES.map((article, idx) => (
            <Link
              href="/about"
              key={idx}
              className="group flex flex-col overflow-hidden rounded-[2rem] bg-white border border-[#1B4083]/10 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="relative aspect-[1.35] w-full overflow-hidden bg-[#FFF0EB]">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#1B4083]/60 mb-3">
                    <span>{article.category}</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="font-display text-xl font-bold tracking-tight text-[#1B4083] leading-snug group-hover:text-[#0F2753]">
                    {article.title}
                  </h3>
                </div>

                <div className="mt-6 pt-4 border-t border-[#1B4083]/10 flex items-center justify-between text-xs font-medium text-[#1B4083]/70">
                  <span>{article.date}</span>
                  <span className="font-bold text-[#1B4083] group-hover:translate-x-1 transition-transform">
                    Read story →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
