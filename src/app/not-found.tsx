import Link from "next/link";
import { SITE } from "@/lib/site";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAF6F0] flex flex-col items-center justify-center p-4">
      <div className="max-w-md text-center space-y-6">
        <h1 className="font-[family-name:var(--font-satisfy)] text-8xl text-[#1B4083] opacity-50">404</h1>
        <h2 className="font-display text-3xl font-bold text-[#1B4083]">Page Not Found</h2>
        <p className="text-[#1B4083]/70 font-mono">
          The memory you are looking for seems to have faded. Let's get you back to the present.
        </p>
        <Link
          href="/"
          className="inline-block mt-8 rounded-full bg-[#1B4083] px-8 py-3.5 text-base font-semibold tracking-tight text-white shadow-md transition-all duration-300 hover:bg-[#0F2753] hover:scale-105"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
