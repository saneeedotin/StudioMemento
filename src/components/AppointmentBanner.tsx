import Image from "next/image";
import Link from "next/link";

export default function AppointmentBanner() {
  return (
    <section className="bg-white py-24 md:py-36">
      <div className="container-x mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#043c74] text-white shadow-2xl">
          
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.2),transparent_70%)]" />

          <div className="relative z-10 grid gap-12 lg:grid-cols-2 lg:gap-8 p-8 md:p-16 lg:p-24 items-center">
            
            <div>
              <span className="mb-4 block text-xs font-semibold uppercase tracking-widest text-[#fecbd7]">Your Personal Consultation</span>
              <h2 className="font-display text-4xl font-extrabold uppercase leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
                Ready to romanticize your becoming?
              </h2>
              <p className="mt-6 max-w-lg text-lg opacity-80 font-serif italic">
                Book a private styling session and let us craft a narrative that you can wear.
              </p>
              
              <Link href="/appointment" className="group mt-10 inline-flex items-center gap-4 rounded-full bg-[#fecbd7] px-8 py-4 text-sm font-bold uppercase tracking-widest text-[#043c74] transition-all hover:scale-105 hover:bg-white shadow-[0_0_20px_rgba(254,203,215,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]">
                Book an Appointment
                <svg className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="relative hidden lg:block aspect-square h-[400px] w-full max-w-[400px] justify-self-end rounded-full overflow-hidden border-8 border-white/10 ml-auto">
              <Image 
                src="/images/necklace.png" 
                alt="Studio Memento Jewelry" 
                fill 
                className="object-cover"
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
