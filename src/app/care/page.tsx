import Link from "next/link";

export default function CareInstructions() {
  return (
    <div className="min-h-screen bg-[#FAF6F0] pt-32 pb-24 px-4 sm:px-8 text-[#1B4083]">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display text-4xl sm:text-5xl font-bold mb-8">Care Instructions</h1>
        
        <div className="space-y-6 text-lg opacity-80 leading-relaxed font-serif">
          <p>
            Your Studio Memento pieces are designed to be a little more of you, every day. While our jewellery is high-quality and anti-tarnish, a little care goes a long way in preserving those memories.
          </p>
          
          <h2 className="font-display text-2xl font-bold mt-8 mb-4">Everyday Wear & Permanent Jewellery</h2>
          <p>
            Our permanent pieces are designed to live on you. You can shower, swim, and sweat in them. However, we recommend rinsing them with fresh water after exposure to chlorine or saltwater to keep them sparkling.
          </p>
          
          <h2 className="font-display text-2xl font-bold mt-8 mb-4">Cleaning Your Charms</h2>
          <p>
            To clean your charms and chains, gently wash them with warm water and a mild, fragrance-free soap. Use a soft toothbrush to gently scrub away any dirt or oils that may have accumulated, then pat dry with a soft cloth.
          </p>
          
          <h2 className="font-display text-2xl font-bold mt-8 mb-4">Avoiding Chemicals</h2>
          <p>
            Avoid direct contact with harsh chemicals, strong perfumes, and heavy lotions, as these can dull the finish of your jewellery over time. We recommend applying lotions and perfumes before putting on any non-permanent pieces.
          </p>
          
          <div className="mt-12 pt-8 border-t border-[#1B4083]/20">
            <Link href="/" className="font-mono text-sm uppercase tracking-widest hover:text-red-500 transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
