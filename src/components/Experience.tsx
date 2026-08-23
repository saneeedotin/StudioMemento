import Image from "next/image";

const testimonials = [
  { quote: "I came in looking for one pair of earrings and left with a whole new way of seeing my wardrobe.", name: "Aditi M.", detail: "styling consultation" },
  { quote: "It felt less like shopping and more like finding tiny reminders of myself.", name: "Naina R.", detail: "private studio visit" },
];

const gallery = [
  { src: "/images/studio-memento-1.png", alt: "Studio Memento jewellery styling detail", tone: "aspect-[4/5]" },
  { src: "/images/earrings.png", alt: "Statement earrings from Studio Memento", tone: "aspect-square" },
  { src: "/images/necklace.png", alt: "Layered necklace styling from Studio Memento", tone: "aspect-[4/5]" },
  { src: "/images/all-jewellery.webp", alt: "Studio Memento jewellery collection", tone: "aspect-square" },
];

export default function Experience() {
  return (
    <>
      <section id="experience" data-nav-theme="light" className="bg-paper-blush py-24 md:py-36">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div><p className="font-script text-3xl text-pink md:text-4xl">not just an accessory —</p><h2 className="mt-3 max-w-3xl font-display text-5xl font-extrabold uppercase leading-[0.92] tracking-tight text-ink md:text-7xl">Find the pieces that find you.</h2></div>
            <p className="max-w-xs text-sm leading-relaxed text-ink-soft">A quiet, considered hour to try on, layer up, and leave with something that feels unmistakably yours.</p>
          </div>
          <div className="mt-16 grid gap-px overflow-hidden rounded-[1.5rem] bg-ink/10 md:grid-cols-3">
            {["Start with a feeling", "Play with the unexpected", "Leave with a memory"].map((title, index) => <article key={title} className="group bg-paper p-7 transition-colors duration-500 hover:bg-blue hover:text-white md:p-9"><span className="text-sm text-pink group-hover:text-pink-soft">0{index + 1}</span><h3 className="mt-16 font-display text-2xl font-bold uppercase leading-tight">{title}</h3><p className="mt-4 text-sm leading-relaxed text-ink-soft transition-colors group-hover:text-white/75">Your style, your pace, and a little room for surprise.</p></article>)}
          </div>
        </div>
      </section>

      <section id="stories" data-nav-theme="light" className="bg-paper py-24 md:py-36">
        <div className="container-x"><div className="flex items-end justify-between gap-8"><div><p className="font-script text-3xl text-pink">from the memento moodboard —</p><h2 className="mt-3 font-display text-4xl font-extrabold uppercase tracking-tight text-ink md:text-6xl">A little shimmer, lately.</h2></div><span className="hidden text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft md:block">@studiomemento</span></div><div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">{gallery.map((image, index) => <figure key={image.src} className={`group relative overflow-hidden bg-paper-blue ${image.tone} ${index % 2 === 0 ? "md:translate-y-8" : ""}`}><Image src={image.src} alt={image.alt} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover grayscale-[0.15] transition duration-700 ease-luxe group-hover:scale-105 group-hover:grayscale-0" /></figure>)}</div></div>
      </section>

      <section data-nav-theme="light" className="bg-paper-blue py-24 md:py-32"><div className="container-x"><div className="mb-12 flex items-end justify-between"><h2 className="font-display text-4xl font-extrabold uppercase tracking-tight text-ink md:text-6xl">They remember it.</h2><span className="font-script text-2xl text-blue">and so will you —</span></div><div className="grid gap-5 md:grid-cols-2">{testimonials.map((testimonial) => <blockquote key={testimonial.name} className="rounded-[1.25rem] border border-ink/10 bg-white/50 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-pink/40 hover:shadow-card md:p-10"><p className="font-display text-2xl font-semibold leading-tight text-ink md:text-3xl">“{testimonial.quote}”</p><footer className="mt-10 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft"><span>{testimonial.name}</span><span>{testimonial.detail}</span></footer></blockquote>)}</div></div></section>
    </>
  );
}
