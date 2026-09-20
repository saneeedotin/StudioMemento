import Link from "next/link";

export default function TermsAndPrivacy() {
  return (
    <div className="min-h-screen bg-[#FAF6F0] pt-32 pb-24 px-4 sm:px-8 text-[#1B4083]">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display text-4xl sm:text-5xl font-bold mb-8">Terms & Privacy Policy</h1>
        
        <div className="space-y-6 text-lg opacity-80 leading-relaxed font-serif">
          
          <h2 className="font-display text-2xl font-bold mt-12 mb-4 text-[#1B4083]/90">Terms of Service</h2>
          <p>
            Welcome to Studio Memento. By accessing or using our website and services, you agree to comply with and be bound by these terms.
          </p>
          <p>
            <strong>Appointments & Cancellations:</strong> When booking an appointment for permanent jewellery or styling consultations, we ask that you arrive on time. Cancellations must be made at least 24 hours in advance.
          </p>
          <p>
            <strong>Returns & Exchanges:</strong> Due to the custom and permanent nature of our bespoke charms and welded pieces, all sales are final once the piece has been fitted or customized. We stand by the quality of our craft and will repair any manufacturer defects within 30 days of purchase.
          </p>

          <div className="w-full h-px bg-[#1B4083]/20 my-10"></div>

          <h2 className="font-display text-2xl font-bold mt-8 mb-4 text-[#1B4083]/90">Privacy Policy</h2>
          <p>
            At Studio Memento, we are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner.
          </p>
          <p>
            <strong>Information We Collect:</strong> We collect information that you provide directly to us, such as when you book an appointment, make a purchase, or subscribe to our newsletter.
          </p>
          <p>
            <strong>How We Use It:</strong> We use the information we collect to process your orders, schedule appointments, send order confirmations, and communicate with you about our products, services, and offers. We do not sell or rent your personal information to third parties.
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
