import { Suspense } from "react";
import type { Metadata } from "next";
import { Baskervville, Bricolage_Grotesque, Epilogue, Playfair_Display, Satisfy } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import PageTransitionLoader from "@/components/PageTransitionLoader";
import HeartCursorEffect from "@/components/HeartCursorEffect";
import { MenuProvider } from "@/components/MenuContext";
import MenuLayoutWrapper from "@/components/MenuLayoutWrapper";
import ModularFooter from "@/components/ModularFooter";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bricolage",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const baskervville = Baskervville({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-baskervville",
  display: "swap",
});

const epilogue = Epilogue({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-epilogue",
  display: "swap",
});

const satisfy = Satisfy({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-satisfy",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Studio Memento",
  description:
    "Intimate jewellery styling consultations at Studio Memento. Book a private session and let every charm hold a chapter of your story.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bricolage.variable} ${baskervville.variable} ${epilogue.variable} ${satisfy.variable} ${playfair.variable} antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Baskervville:ital@0;1&family=Bricolage+Grotesque:opsz,wght@12..96,400;500;600;700&family=Caveat:wght@400..700&family=Epilogue:ital,wght@0,500;0,600;0,700;0,800;1,400&family=Satisfy&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-svh flex-col bg-black text-[#1B4083] font-sans selection:bg-[#FFC8D4] selection:text-[#1B4083] w-full max-w-full relative">
        <MenuProvider>
          <MenuLayoutWrapper>
            <HeartCursorEffect />
            <Preloader />
            <Suspense fallback={null}>
              <PageTransitionLoader />
            </Suspense>
            <SmoothScroll>
              {children}
              <ModularFooter />
            </SmoothScroll>
          </MenuLayoutWrapper>
        </MenuProvider>
      </body>
    </html>
  );
}
