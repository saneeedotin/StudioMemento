"use client";

export default function Marquee() {
  const row1 = ["Custom", "Fine Necklaces", "Bridal", "Everyday Elegance", "Diamonds", "Gold", "Heirlooms"];
  const row2 = ["Earrings", "Pendants", "Custom Design", "Engagement Rings", "Ethical Sourcing", "Bracelets", "Charms"];

  return (
    <section className="bg-white py-12 md:py-24 overflow-hidden text-[#043c74]">
      <div className="flex flex-col gap-6">
        
        {/* Row 1 - Left to Right */}
        <div className="relative flex w-full overflow-hidden">
          <div className="flex w-max animate-marquee whitespace-nowrap">
            {[...row1, ...row1, ...row1].map((tag, index) => (
              <div
                key={index}
                className="mx-3 flex items-center justify-center rounded-full bg-[#fecbd7] px-8 py-3 text-sm font-semibold uppercase tracking-widest text-[#043c74]"
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 - Right to Left */}
        <div className="relative flex w-full overflow-hidden">
          <div className="flex w-max animate-marquee-reverse whitespace-nowrap">
            {[...row2, ...row2, ...row2].map((tag, index) => (
              <div
                key={index}
                className="mx-3 flex items-center justify-center rounded-full bg-[#043c74] px-8 py-3 text-sm font-semibold uppercase tracking-widest text-white"
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.3333%);
          }
        }
        @keyframes marquee-reverse {
          0% {
            transform: translateX(-33.3333%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 30s linear infinite;
        }
      `}</style>
    </section>
  );
}
