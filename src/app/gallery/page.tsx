import AmbientBackground from "@/components/AmbientBackground";
import InfiniteSpiral from "@/components/InfiniteSpiral";
import SubpageNav from "@/components/SubpageNav";

const images = [
  { src: '/images/earrings.png', alt: 'Gold Drop Earrings' },
  { src: '/images/necklace.png', alt: 'Turquoise Pendant' },
  { src: '/images/Soleil_Statement_anti-tarnish_drop_pearl_earrings.png', alt: 'Pearl Earrings' },
  { src: '/images/heart-card-editorial.png', alt: 'Heart Locket' },
  { src: '/images/18k_Gold_Plated.png', alt: 'Gold Plated' },
  { src: '/images/Soleil_Statement_flower_anti-tarnish_pearl_earrings.png', alt: 'Flower Pearls' },
  { src: '/images/all-jewellery.webp', alt: 'Charm Bar' },
  { src: '/images/heart-collection.png', alt: 'Heart Collection' }
];

export default function GalleryPage() {
  return (
    <main className="flex-1 bg-[#FAF6F0] min-h-screen relative overflow-hidden">
      <AmbientBackground variant="pink">
        
        <SubpageNav theme="light" />

        {/* Gallery Content */}
        <section className="relative pt-32 pb-10 min-h-screen flex flex-col items-center justify-center overflow-hidden">
          
          <div className="text-center z-20 mb-10 pointer-events-none px-4">
             <h1 className="font-display text-5xl sm:text-7xl font-bold text-[#1B4083] tracking-tighter mb-4">
               The Archive
             </h1>
             <p className="text-[#1B4083]/70 max-w-md mx-auto text-sm sm:text-base leading-relaxed">
               An interactive 3D exploration of our past commissions, heirloom redesigns, and signature modular talismans.
             </p>
             <p className="text-[#1B4083]/50 text-[10px] sm:text-xs uppercase tracking-[0.2em] mt-6 font-mono border border-[#1B4083]/10 inline-block px-4 py-2 rounded-full backdrop-blur-sm">
               Scroll or drag to explore
             </p>
          </div>

          {/* Interactive 3D Spiral */}
          <div className="w-full h-[65vh] sm:h-[800px] relative z-10">
            <InfiniteSpiral
              items={images}
              animationMode="all"
              speed={0.8}
              radius={350}
              cardWidth={240}
              cardHeight={340}
              verticalSpacing={60}
              perspective={1500}
              cardRadius={24}
              centerScale={1.2}
              edgeBlur={5}
              cardsPerTurn={8}
              pauseOnHover={true}
              imageFit="cover"
            />
          </div>

        </section>
      </AmbientBackground>
    </main>
  );
}
