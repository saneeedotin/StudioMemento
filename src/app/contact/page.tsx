"use client";

import SubpageNav from "@/components/SubpageNav";

export default function ContactPage() {
  return (
    <main className="flex-1 bg-[#1A4083] text-[#FAF6F0] min-h-screen relative overflow-hidden">
      
      <SubpageNav theme="dark" />

      {/* Hero / Contact Form Section */}
      <section className="relative pt-32 sm:pt-48 pb-20 px-6 sm:px-10 max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Left: Text & Info */}
        <div className="flex-1 lg:max-w-xl z-10">
          <span className="text-[#FFC8D4] font-mono text-xs sm:text-sm tracking-[0.2em] uppercase mb-6 block border border-[#FFC8D4]/30 inline-block px-4 py-1.5 rounded-full">
            Private Commissions
          </span>
          <h1 className="font-display text-5xl sm:text-7xl lg:text-[5.5rem] font-bold tracking-tighter mb-8 leading-[0.9]">
            Let&apos;s shape your <br />
            <span className="text-[#FFC8D4] italic font-light tracking-tight">next chapter.</span>
          </h1>
          <p className="text-lg sm:text-xl opacity-80 leading-relaxed mb-12">
            Whether you&apos;re looking to design a bespoke engagement ring, reset a family heirloom, or curate your own modular charm necklace, our studio doors are open.
          </p>

          <div className="space-y-8 font-mono text-sm tracking-wide opacity-90">
            <div>
              <p className="uppercase tracking-[0.2em] opacity-60 text-xs mb-2">Studio Location</p>
              <p>42 Atelier Row, Creative District</p>
              <p>New York, NY 10012</p>
            </div>
            <div>
              <p className="uppercase tracking-[0.2em] opacity-60 text-xs mb-2">Direct Inquiries</p>
              <p>hello@studiomemento.com</p>
              <p>+1 (555) 019-8234</p>
            </div>
          </div>
        </div>

        {/* Right: The Form */}
        <div className="flex-1 z-10 w-full max-w-2xl">
          <div className="bg-[#FAF6F0] rounded-[2.5rem] p-8 sm:p-12 shadow-2xl text-[#1B4083]">
            <h3 className="font-display text-3xl font-bold mb-2">Request a Consultation</h3>
            <p className="opacity-70 mb-8 text-sm">We typically respond to bespoke inquiries within 48 hours.</p>
            
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Thank you! Your inquiry has been submitted. We will get back to you shortly."); }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] sm:text-xs uppercase font-bold tracking-widest opacity-60 ml-2">First Name</label>
                  <input type="text" className="w-full bg-[#1A4083]/5 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#1B4083]/20 outline-none transition-all" placeholder="Jane" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] sm:text-xs uppercase font-bold tracking-widest opacity-60 ml-2">Last Name</label>
                  <input type="text" className="w-full bg-[#1A4083]/5 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#1B4083]/20 outline-none transition-all" placeholder="Doe" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] sm:text-xs uppercase font-bold tracking-widest opacity-60 ml-2">Email Address</label>
                <input type="email" className="w-full bg-[#1A4083]/5 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#1B4083]/20 outline-none transition-all" placeholder="jane@example.com" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] sm:text-xs uppercase font-bold tracking-widest opacity-60 ml-2">Inquiry Type</label>
                <select className="w-full bg-[#1A4083]/5 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#1B4083]/20 outline-none transition-all appearance-none cursor-pointer">
                  <option>Bespoke Commission</option>
                  <option>Heirloom Redesign</option>
                  <option>Permanent Jewelry Booking</option>
                  <option>General Inquiry</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] sm:text-xs uppercase font-bold tracking-widest opacity-60 ml-2">Your Story / Vision</label>
                <textarea rows={4} className="w-full bg-[#1A4083]/5 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#1B4083]/20 outline-none transition-all resize-none" placeholder="Tell us what you have in mind..."></textarea>
              </div>

              <button className="w-full bg-[#1B4083] text-white rounded-full py-5 font-bold tracking-wider uppercase text-sm mt-4 hover:bg-[#0F2753] transition-colors">
                Submit Inquiry
              </button>
            </form>
          </div>
        </div>

      </section>

    </main>
  );
}
