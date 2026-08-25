import Image from "next/image";

export default function BentoGrid() {
  return (
    <section className="bg-white py-24 md:py-36 text-[#043c74]">
      <div className="container-x mx-auto max-w-7xl px-6 lg:px-8">
        
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <h2 className="font-display text-4xl font-extrabold uppercase leading-[0.9] tracking-tight md:text-6xl lg:text-7xl">
            Our Magic
          </h2>
          <p className="max-w-md text-sm leading-relaxed opacity-80 md:text-base">
            Behind everything we do at Studio Memento are a few simple principles. We build with substance, bring energy into everything we create, and stay driven by purpose. We believe fine jewelry is ultimately about people.
          </p>
        </div>

        {/* Masonry Layout using Flex Columns */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          
          {/* Column 1 */}
          <div className="flex w-full flex-col gap-4 md:w-1/3 md:gap-6">
            {/* New Image Card to complete grid */}
            <div className="group relative h-[300px] overflow-hidden rounded-[1.5rem] bg-[#f0c5d4] shadow-sm">
              <Image 
                src="/images/all-jewellery.webp" 
                alt="Jewelry Collection" 
                fill 
                className="object-cover grayscale-[0.2] transition-transform duration-700 ease-in-out group-hover:scale-105 group-hover:grayscale-0"
              />
            </div>
            {/* Without Movement Card */}
            <div className="group relative flex h-[250px] flex-col justify-center overflow-hidden rounded-[1.5rem] bg-[#043c74] p-8 text-white shadow-sm">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-[#fecbd7]">There's no change</span>
              <h3 className="font-display text-3xl font-bold uppercase leading-tight text-white lg:text-4xl">Without movement.</h3>
            </div>
          </div>

          {/* Column 2 */}
          <div className="flex w-full flex-col gap-4 md:w-1/3 md:gap-6">
            {/* Tall Card */}
            <div className="group relative h-[450px] md:h-[calc(550px+1.5rem)] overflow-hidden rounded-[1.5rem] bg-[#fecbd7] shadow-sm">
              <Image 
                src="/images/studio-memento-1.png" 
                alt="Studio Memento details" 
                fill 
                className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#043c74]/80 via-[#043c74]/20 to-transparent opacity-90" />
              <div className="absolute bottom-0 left-0 p-8 text-white w-full">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-[#fff0eb]">Discover our workshop</span>
                <h3 className="font-display text-3xl font-bold uppercase leading-tight text-white lg:text-4xl">Let's build good memories.</h3>
                <button className="mt-5 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#043c74] transition-colors hover:bg-[#fff0eb]">More information</button>
              </div>
            </div>
          </div>

          {/* Column 3 */}
          <div className="flex w-full flex-col gap-4 md:w-1/3 md:gap-6">
            {/* Small Image */}
            <div className="group relative h-[250px] overflow-hidden rounded-[1.5rem] bg-[#f0c5d4] shadow-sm">
              <Image 
                src="/images/earrings.png" 
                alt="Earrings" 
                fill 
                className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
              />
            </div>
            {/* Collaborate Card */}
            <div className="group relative h-[300px] overflow-hidden rounded-[1.5rem] bg-[#b9d0e5] shadow-sm">
              <Image 
                src="/images/necklace.png" 
                alt="Necklace" 
                fill 
                className="object-cover grayscale-[0.5] opacity-60 mix-blend-multiply transition-all duration-700 ease-in-out group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#043c74]/90 via-[#043c74]/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 lg:p-8 text-white w-full">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-[#fecbd7]">Designers • Makers</span>
                <h3 className="font-display text-2xl font-bold uppercase leading-tight text-white lg:text-3xl break-words">
                  Collaborate with us and shape what's next.
                </h3>
                <button className="mt-5 rounded-full bg-[#fecbd7] px-5 py-2 text-sm font-bold text-[#043c74] transition-colors hover:bg-white">Say hello 👋</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
