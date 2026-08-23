import type { Metadata } from "next";
import { Inter, Montserrat, Parisienne } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-montserrat",
});

const parisienne = Parisienne({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-parisienne",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Studio Memento — Wear Your Own Story",
  description:
    "Intimate jewellery styling consultations at Studio Memento. Book a private session and let every charm hold a chapter of your story.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${montserrat.variable} ${parisienne.variable} ${inter.variable} antialiased`}
    >
      <body className="flex min-h-svh flex-col">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
