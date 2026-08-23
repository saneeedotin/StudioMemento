import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Booking from "@/components/Booking";
import Experience from "@/components/Experience";

export default function Home() {
  return (
    <>
      <main id="top" className="flex-1">
        <Hero />
        <Booking />
        <Experience />
      </main>
      <Footer />
    </>
  );
}
