"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/site";

interface Testimonial {
  number: string;
  letterLabel: string;
  quote: string;
  author: string;
  role: string;
  location: string;
  highlight: string;
  quoteColor: string;
  inkColor: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    number: "01",
    letterLabel: "LETTER 01 OF 03 · PERMANENT WELD ARCHIVE",
    quote:
      "We fell in love with Studio Memento’s private charm session. It felt less like shopping and more like finding tiny gold reminders of our journey together. My permanent bracelet has not left my wrist for two years.",
    author: "Karim & Aurelie",
    role: "Permanent Jewellery Couple",
    location: "Dombivli East",
    highlight: "Permanent Link Client",
    quoteColor: "text-[#1B4083]",
    inkColor: "text-[#1B4083]",
  },
  {
    number: "02",
    letterLabel: "LETTER 02 OF 03 · HEIRLOOM REDESIGN ARCHIVE",
    quote:
      "I brought in my grandmother’s vintage ring, completely unsure if it could be modernized. Studio Memento reimagined the sapphire into an architectural bezel pendant that I now wear every single day.",
    author: "Tara Sharma",
    role: "Heirloom Redesign Client",
    location: "Custom Bench Commission",
    highlight: "Heirloom Redesign",
    quoteColor: "text-[#1B4083]",
    inkColor: "text-[#1B4083]",
  },
  {
    number: "03",
    letterLabel: "LETTER 03 OF 03 · BRIDAL COMMISSIONS ARCHIVE",
    quote:
      "The Soleil Pearl Drop earrings were the centerpiece of my wedding day. The luster of the baroque pearls and the matte finish of the gold were breathtaking in every photograph.",
    author: "Aditi Rao",
    role: "Bridal Commission",
    location: "Studio Client",
    highlight: "Bridal Commission",
    quoteColor: "text-[#1B4083]",
    inkColor: "text-[#1B4083]",
  },
];

interface FAQItem {
  id: string;
  badge: string;
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    id: "appointment-walkin",
    badge: "Visiting Us",
    question: "Do I need an appointment or can I walk in?",
    answer:
      "Walk-ins are warmly welcomed Tuesday through Sunday from 1:00 PM to 9:00 PM for permanent jewellery and our charm bar! If you are planning to come with a large group of 3+, we recommend booking a dedicated session so our team can give you undivided attention.",
  },
  {
    id: "welding-process",
    badge: "The Process",
    question: "How does permanent jewellery work? Is it safe?",
    answer:
      "It is completely painless, 100% safe, and takes just 10 to 15 minutes. We custom-measure your chain to your wrist or neck, place a small protective guard, and use a micro-welder to spark the jump ring closed. No clasps, no pinching, and no heat reaches your skin.",
  },
  {
    id: "heirloom-timeline",
    badge: "Turnaround",
    question: "How long does a custom charm necklace take?",
    answer:
      "Most custom charm pieces can be assembled right at the bar during your visit! You choose your chain and charms, and we'll link them together on the spot so you can walk out with your new memento.",
  },
  {
    id: "durability-waterproof",
    badge: "Care & Quality",
    question: "Are the chains and metals waterproof & everyday durable?",
    answer:
      "Yes, absolutely. We craft exclusively with premium anti-tarnish waterproof alloys and 925 sterling silver. You can shower, swim, work out, and live in your permanent jewellery every day without tarnishing, fading, or skin discoloration.",
  },
];

// =========================================================================
// THE ATELIER SCRAPBOOK MEMORY JOURNAL: EPHEMERA & STORYTELLING ASSETS
// =========================================================================

function LetterTileHeading({ text }: { text: string }) {
  const rotations = ["-rotate-2", "rotate-2", "-rotate-1", "rotate-3", "rotate-1", "-rotate-3"];
  return (
    <div className="flex flex-wrap items-center gap-1 sm:gap-1.5">
      {text.split("").map((char, i) => {
        if (char === " ") {
          return <span key={i} className="w-1.5 sm:w-2" />;
        }
        const rot = rotations[i % rotations.length];
        return (
          <span
            key={i}
            className={`inline-flex items-center justify-center w-5.5 h-6.5 sm:w-6 sm:h-7 bg-white border border-[#1B4083]/20 shadow-2xs font-mono font-black text-xs sm:text-[13px] text-[#1B4083] rounded-2xs ${rot} hover:scale-110 hover:rotate-0 transition-transform duration-200 select-none`}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
}

function WashiTape({ className = "" }: { className?: string }) {
  return (
    <div
      className={`h-3.5 sm:h-4 bg-[#FFE89E]/85 backdrop-blur-xs border-y border-[#1B4083]/10 shadow-2xs ${className}`}
      style={{
        clipPath: "polygon(0% 0%, 4% 50%, 0% 100%, 96% 100%, 100% 50%, 96% 0%)",
      }}
    />
  );
}

function BulldogBinderClip({ className = "" }: { className?: string }) {
  return (
    <div className={`relative z-20 flex flex-col items-center select-none ${className}`}>
      <div className="w-6 h-5 rounded-t-full border-2 border-[#1B4083]/40 bg-gradient-to-b from-[#FAF6F0] to-[#D5D0C6] shadow-2xs -mb-0.5" />
      <div className="w-10 h-3 rounded-2xs bg-gradient-to-r from-[#D5D0C6] via-[#FAF6F0] to-[#D5D0C6] border border-[#1B4083]/30 shadow-xs flex items-center justify-center">
        <div className="w-6 h-0.5 bg-[#1B4083]/20 rounded-full" />
      </div>
    </div>
  );
}

function Retro90sWindow({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-white border-[1.5px] border-[#1B4083] rounded-2xs shadow-[2px_2px_0px_#1B4083] overflow-hidden ${className}`}
    >
      <div className="bg-[#1B4083] text-[#FAF6F0] px-2 py-0.5 flex items-center justify-between font-mono text-[9px] font-bold tracking-wider">
        <span className="truncate">{title}</span>
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 bg-white/20 border border-white/40 flex items-center justify-center text-[7px] leading-none">
            ?
          </span>
          <span className="w-2.5 h-2.5 bg-white/20 border border-white/40 flex items-center justify-center text-[7px] leading-none">
            ✕
          </span>
        </div>
      </div>
      <div className="p-1.5 bg-[#FAF6F0]">{children}</div>
    </div>
  );
}

function MiniEnvelope({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative w-20 sm:w-22 h-13 sm:h-14 bg-[#FFFDF9] border border-[#1B4083]/20 shadow-sm rounded-2xs p-1 flex items-center justify-center select-none ${className}`}
    >
      <svg
        viewBox="0 0 112 80"
        className="absolute inset-0 w-full h-full pointer-events-none"
        fill="none"
      >
        <path d="M 0 0 L 56 42 L 112 0" stroke="#1B4083" strokeWidth="1" strokeOpacity="0.25" />
        <path d="M 0 80 L 46 36" stroke="#1B4083" strokeWidth="1" strokeOpacity="0.2" />
        <path d="M 112 80 L 66 36" stroke="#1B4083" strokeWidth="1" strokeOpacity="0.2" />
      </svg>
      <div className="relative z-10 w-5.5 h-5.5 rounded-full bg-[#FAF6F0] border border-[#C5A265] shadow-2xs flex items-center justify-center text-[5px] font-mono text-[#1B4083] text-center font-bold tracking-tighter uppercase p-0.5 rotate-[-8deg]">
        MEMENTO
      </div>
    </div>
  );
}

function PressedBotanicalFlower({
  className = "",
  color = "#E598AC",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`w-9 h-9 sm:w-11 sm:h-11 pointer-events-none drop-shadow-2xs select-none opacity-85 ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="50" cy="28" rx="14" ry="24" fill={color} fillOpacity="0.55" transform="rotate(0 50 50)" />
      <ellipse cx="50" cy="28" rx="14" ry="24" fill={color} fillOpacity="0.55" transform="rotate(72 50 50)" />
      <ellipse cx="50" cy="28" rx="14" ry="24" fill={color} fillOpacity="0.55" transform="rotate(144 50 50)" />
      <ellipse cx="50" cy="28" rx="14" ry="24" fill={color} fillOpacity="0.55" transform="rotate(216 50 50)" />
      <ellipse cx="50" cy="28" rx="14" ry="24" fill={color} fillOpacity="0.55" transform="rotate(288 50 50)" />
      <circle cx="50" cy="50" r="7" fill="#8B5A2B" fillOpacity="0.75" />
      <circle cx="50" cy="50" r="4.5" fill="#4A2E12" />
    </svg>
  );
}

function ButtonSticker({ className = "" }: { className?: string }) {
  return (
    <div
      className={`w-5.5 h-5.5 rounded-full bg-[#E5B5B5] border border-[#D49999] shadow-2xs flex items-center justify-center select-none ${className}`}
    >
      <div className="grid grid-cols-2 gap-0.5">
        <span className="w-0.5 h-0.5 rounded-full bg-[#8E5353]" />
        <span className="w-0.5 h-0.5 rounded-full bg-[#8E5353]" />
        <span className="w-0.5 h-0.5 rounded-full bg-[#8E5353]" />
        <span className="w-0.5 h-0.5 rounded-full bg-[#8E5353]" />
      </div>
    </div>
  );
}

const SCRAPBOOK_CHAPTERS = [
  {
    id: "arrival",
    tabNumber: "01",
    tabLabel: "01 · Afternoon Walk-In",
    tabSub: "The Walk-In",
    letterTiles: "S T U D I O",
    pageHeading: "The Spontaneous Afternoon",
    storyTitle: "Step Inside, No Appointment Needed",
    storyText:
      "Some of the sweetest memories begin completely unplanned. You’re walking near Phadke Road on a warm Tuesday afternoon, laughter in the air, and decide on a whim to step inside. No rushing, no rigid bookings—just afternoon golden light, soft music, and our team ready to help you build your story.",
    handwrittenNote:
      "Walk in spontaneously with someone you love. Tuesday through Sunday, 1:00 PM to 9:00 PM.",
    stampLocation: "DOMBIVLI EAST · 2 MIN FROM STATION",
    polaroidImage: "/images/Workshop.png",
    polaroidCaption: "✦ 2:15 PM · Warm sunlight on the bench",
    retroWindowImage: "/images/necklace.png",
    retroWindowTitle: "afternoon_stroll.jpg",
    chips: [
      "⏱ 1:00 PM – 9:00 PM",
      "Tue–Sun (Mondays Closed)",
      "Walk-Ins Warmly Welcomed",
    ],
    accentFlowerColor: "#E598AC",
  },
  {
    id: "curate",
    tabNumber: "02",
    tabLabel: "02 · The Keepsake Tray",
    tabSub: "The Keepsakes",
    letterTiles: "K E E P S A K E",
    pageHeading: "Finding Your Talismans",
    storyTitle: "Little Reminders of Your Journey",
    storyText:
      "Remember collecting beach glass or keeping handwritten letters in a tin box? Choosing your permanent chain and charms feels like that. Run your fingers over high-quality links, organic pearls, and engraved stars—each charm chosen for a whispered chapter only you know.",
    handwrittenNote:
      "Crafted exclusively in high-quality anti-tarnish alloys & 925 sterling silver. 60+ charms to hold your memories.",
    stampLocation: "60+ HAND-CAST TALISMANS & PEARLS",
    polaroidImage: "/images/all-jewellery.webp",
    polaroidCaption: "✦ Touching freshwater baroque pearls",
    retroWindowImage: "/images/Soleil_Statement_anti-tarnish_drop_pearl_earrings.png",
    retroWindowTitle: "curated_talismans.png",
    chips: [
      "Anti-Tarnish & 925 Silver",
      "Freshwater Baroque Pearls",
      "Sized Precisely to Your Drape",
    ],
    accentFlowerColor: "#89AEC8",
  },
  {
    id: "weld",
    tabNumber: "03",
    tabLabel: "03 · The Forever Spark",
    tabSub: "The Forever Weld",
    letterTiles: "F O R E V E R",
    pageHeading: "The Claspless Bond",
    storyTitle: "A Flash of Light, Sealed for Eternity",
    storyText:
      "A quick, gentle flash of golden light—and your link is seamlessly closed forever. No clumsy clasp to fumble with or lose. It stays weightless on your wrist through ocean swims, late-night tea, morning commutes, and every celebration ahead. A silent memento of your becoming.",
    handwrittenNote:
      "15 minutes at the bench. 0% heat to skin. 100% waterproof for every tomorrow.",
    stampLocation: "PERMANENT WELD · LIFETIME BOND",
    polaroidImage: "/images/heart-card-editorial.png",
    polaroidCaption: "✦ The instant the bond is sealed forever",
    retroWindowImage: "/images/necklace.png",
    retroWindowTitle: "lifetime_memento.png",
    chips: [
      "15-Minute Bench Time",
      "Painless Flash · 0% Heat",
      "100% Everyday Waterproof",
    ],
    accentFlowerColor: "#E598AC",
  },
];

export default function ModularReviewsAndFAQ() {
  const [activeStory, setActiveStory] = useState(0);
  const [isPageFlipping, setIsPageFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<"next" | "prev">("next");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [openFaq, setOpenFaq] = useState<string | null>("appointment-walkin");
  const [activeBenchStep, setActiveBenchStep] = useState<number>(0);

  // Envelope Open / Close State (Auto-opens on scroll, auto-closes on 4th click)
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [isAnimatingEnvelope, setIsAnimatingEnvelope] = useState(false);
  const hasAutoOpenedRef = useRef(false);
  const envelopeContainerRef = useRef<HTMLDivElement>(null);



  const currentLetter = TESTIMONIALS[activeStory];

  // Synthesized realistic paper flutter sound using Web Audio API
  const playPaperRustle = () => {
    if (!soundEnabled || typeof window === "undefined") return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof window.AudioContext })
          .webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      // Buffer of gentle white noise
      const bufferSize = Math.floor(ctx.sampleRate * 0.22);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.sin((i / bufferSize) * Math.PI);
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      // Bandpass filter to emulate crisp linen/cotton paper
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1600, ctx.currentTime);
      filter.Q.setValueAtTime(2.2, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.22);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
      noise.stop(ctx.currentTime + 0.22);
    } catch {
      // Graceful fallback if audio context is blocked
    }
  };

  const openEnvelope = () => {
    if (isAnimatingEnvelope) return;
    setIsAnimatingEnvelope(true);
    playPaperRustle();
    setIsEnvelopeOpen(true);
    setTimeout(() => {
      setIsAnimatingEnvelope(false);
    }, 850);
  };

  const closeEnvelope = () => {
    if (isAnimatingEnvelope) return;
    setIsAnimatingEnvelope(true);
    playPaperRustle();
    setIsEnvelopeOpen(false);
    setTimeout(() => {
      setIsAnimatingEnvelope(false);
      setActiveStory(0);
    }, 850);
  };

  // Auto-open on scroll when the user first scrolls into the reviews section
  useEffect(() => {
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasAutoOpenedRef.current) {
          hasAutoOpenedRef.current = true;
          setTimeout(() => {
            openEnvelope();
          }, 350);
        }
      },
      { threshold: 0.25 }
    );

    if (envelopeContainerRef.current) {
      observer.observe(envelopeContainerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleFlip = (direction: "next" | "prev") => {
    if (isPageFlipping) return;
    setFlipDirection(direction);
    setIsPageFlipping(true);
    playPaperRustle();

    setTimeout(() => {
      if (direction === "next") {
        setActiveStory((prev) => (prev + 1) % TESTIMONIALS.length);
      } else {
        setActiveStory(
          (prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length
        );
      }
      setTimeout(() => {
        setIsPageFlipping(false);
      }, 250);
    }, 280);
  };

  // Main interaction button handler (Flips 1 -> 2 -> 3, and auto closes on 4th click!)
  const handleActionClick = () => {
    if (isAnimatingEnvelope || isPageFlipping) return;

    if (!isEnvelopeOpen) {
      openEnvelope();
      return;
    }

    // If currently on the 3rd review (index 2 of 3), the 4th click auto-closes the envelope!
    if (activeStory === TESTIMONIALS.length - 1) {
      closeEnvelope();
    } else {
      handleFlip("next");
    }
  };



  const toggleFaq = (id: string) => {
    setOpenFaq((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="reviews-and-faq"
      className="relative py-20 sm:py-32 text-[#1B4083] scroll-mt-12 overflow-hidden"
    >
      <div className="container-modular max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* =========================================================================
            1. THE ATELIER SCRAPBOOK MEMORY JOURNAL (MEMENTO & MEMORY KEEPING)
           ========================================================================= */}
        <div className="mb-16 sm:mb-24 max-w-4xl lg:max-w-[880px] xl:max-w-[920px] mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-[#1B4083]/15 text-[#1B4083] text-[10px] font-mono font-bold tracking-[0.2em] uppercase shadow-2xs mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              The Memento Pathway
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1B4083]">
              A keepsake woven into your daily life.
            </h2>
            <p className="mt-1.5 text-xs sm:text-[13px] text-[#1B4083]/70 font-mono">
              The official memory-keeping journey at Studio Memento · Dombivli Studio
            </p>
          </div>

          {/* Physical Open Scrapbook Shell */}
          <div className="relative rounded-[1.75rem] bg-[#F4EFEA] p-2 sm:p-3 lg:p-3.5 shadow-xl border border-[#1B4083]/15">
            {/* Two-Page Open Journal Spread (Mini Gallery) */}
            <div className="relative rounded-[1.25rem] bg-[#FFFDF9] border border-[#1B4083]/12 shadow-inner grid grid-cols-1 lg:grid-cols-12 overflow-hidden h-[600px] sm:h-[700px] lg:h-[650px]">
              
              {/* ===================================================================
                  LEFT PAGE: Bullet Journal Paper, Scattered Polaroids
                 =================================================================== */}
              <div
                className="lg:col-span-6 p-4 sm:p-5 lg:p-6 border-b lg:border-b-0 lg:border-r border-[#1B4083]/15 relative flex flex-col justify-between bg-[#FFFDF9]"
                style={{
                  backgroundImage: "radial-gradient(#1B4083 0.8px, transparent 0.8px)",
                  backgroundSize: "16px 16px",
                }}
              >
                {/* Vintage Binder Clip at Top Left */}
                <div className="absolute -top-2.5 left-7 hidden sm:block">
                  <BulldogBinderClip />
                </div>

                {/* Scattered Photo 1 - Top Left */}
                <div className="absolute top-6 sm:top-8 left-4 sm:left-8 w-[150px] sm:w-[220px] z-20 group">
                  <div className="bg-white p-2 sm:p-2.5 pb-4 sm:pb-5 rounded-xs shadow-md border border-[#1B4083]/15 -rotate-3 group-hover:-rotate-1 group-hover:scale-[1.02] transition-all duration-300">
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 sm:w-20">
                      <WashiTape className="rotate-2" />
                    </div>
                    <div className="relative aspect-[4/3] w-full rounded-2xs overflow-hidden bg-[#FAF6F0]">
                      <Image
                        src="/images/Workshop.png"
                        alt="The Studio"
                        fill
                        sizes="(max-width: 768px) 180px, 220px"
                        className="object-cover"
                      />
                    </div>
                    <p className="mt-2 sm:mt-2.5 text-center font-[family-name:var(--font-satisfy)] text-[#1B4083] text-xs sm:text-[13px]">
                      Our Studio, Dombivli
                    </p>
                  </div>
                </div>

                {/* Scattered Photo 2 - Middle Right */}
                <div className="absolute top-[48%] -translate-y-1/2 right-4 sm:right-8 w-[160px] sm:w-[200px] z-30 group hidden sm:block">
                  <div className="bg-white p-2 sm:p-2.5 pb-4 sm:pb-5 rounded-xs shadow-md border border-[#1B4083]/15 rotate-6 group-hover:rotate-4 group-hover:scale-[1.02] transition-all duration-300">
                    <div className="absolute -bottom-2 right-4 w-14">
                      <WashiTape className="-rotate-3" />
                    </div>
                    <div className="relative aspect-square w-full rounded-2xs overflow-hidden bg-[#FAF6F0]">
                      <Image
                        src="/images/earrings.png"
                        alt="Handcrafted Earrings"
                        fill
                        sizes="(max-width: 768px) 160px, 200px"
                        className="object-cover"
                      />
                    </div>
                    <p className="mt-2 text-center font-[family-name:var(--font-satisfy)] text-[#1B4083] text-xs sm:text-[13px]">
                      18k Solid Gold
                    </p>
                  </div>
                  {/* Pressed Flower Sticker overlapping corner */}
                  <div className="absolute -bottom-4 -left-4 z-40">
                    <PressedBotanicalFlower color="#E598AC" />
                  </div>
                </div>

                {/* Scattered Photo 3 - Bottom Right on mobile, Bottom Left on desktop */}
                <div className="absolute bottom-6 sm:bottom-8 right-6 sm:right-auto sm:left-12 w-[140px] sm:w-[190px] z-10 group">
                  <div className="bg-white p-1.5 sm:p-2 pb-3 sm:pb-4 rounded-xs shadow-sm border border-[#1B4083]/15 -rotate-12 group-hover:-rotate-8 transition-all duration-300">
                    <div className="absolute -top-1.5 left-2 w-12">
                      <WashiTape className="rotate-4" />
                    </div>
                    <div className="relative aspect-[3/4] w-full rounded-2xs overflow-hidden bg-[#FAF6F0]">
                      <Image
                        src="/images/all-jewellery.webp"
                        alt="Curated Collection"
                        fill
                        sizes="(max-width: 768px) 160px, 190px"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* STITCHED SPINE DIVIDER (DESKTOP) */}
              <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#1B4083]/20 to-transparent pointer-events-none z-40 shadow-[0_0_8px_rgba(0,0,0,0.06)]" />

              {/* ===================================================================
                  RIGHT PAGE: Blue Gingham Backing, Retro Windows & Polaroids
                 =================================================================== */}
              <div
                className="lg:col-span-6 p-4 sm:p-5 lg:p-6 relative flex flex-col justify-between"
                style={{
                  background:
                    "repeating-linear-gradient(0deg, rgba(27,64,131,0.06), rgba(27,64,131,0.06) 10px, transparent 10px, transparent 20px), repeating-linear-gradient(90deg, rgba(27,64,131,0.06), rgba(27,64,131,0.06) 10px, transparent 10px, transparent 20px)",
                  backgroundColor: "#FAF7F2",
                }}
              >
                {/* Decorative Button Sticker Top Right */}
                <div className="absolute top-5 right-5 z-20">
                  <ButtonSticker className="rotate-12 hover:rotate-[24deg] transition-transform duration-300" />
                </div>
                
                {/* Envelope tucked in Top Right */}
                <div className="absolute top-12 right-8 sm:right-12 z-30">
                  <MiniEnvelope className="-rotate-[12deg] hover:-rotate-[4deg] transition-transform duration-300" />
                </div>

                {/* Retro Window 1 - Top Left */}
                <div className="absolute top-8 sm:top-12 left-4 sm:left-8 w-[170px] sm:w-[280px] z-20 group">
                  <Retro90sWindow title="curated_talismans.png" className="rotate-3 group-hover:rotate-1 group-hover:scale-[1.02] transition-all duration-300">
                    <div className="relative aspect-[16/9] w-full rounded-2xs overflow-hidden bg-[#FAF6F0]">
                      <Image
                        src="/images/necklace.png"
                        alt="Vintage Necklace"
                        fill
                        sizes="(max-width: 768px) 220px, 280px"
                        className="object-cover"
                      />
                    </div>
                  </Retro90sWindow>
                  <div className="absolute -bottom-2 -left-2 w-14 z-30">
                    <WashiTape className="rotate-6" />
                  </div>
                </div>

                {/* Retro Window 2 - Middle Right */}
                <div className="absolute top-[40%] right-4 sm:right-6 w-[180px] sm:w-[240px] z-10 group hidden sm:block">
                  <Retro90sWindow title="pearl_drop_02.jpg" className="-rotate-4 group-hover:-rotate-2 group-hover:scale-[1.02] transition-all duration-300">
                    <div className="relative aspect-square w-full rounded-2xs overflow-hidden bg-[#FAF6F0]">
                      <Image
                        src="/images/Soleil_Statement_anti-tarnish_drop_pearl_earrings.png"
                        alt="Pearl Drop Earrings"
                        fill
                        sizes="(max-width: 768px) 180px, 240px"
                        className="object-cover"
                      />
                    </div>
                  </Retro90sWindow>
                  <div className="absolute -top-3 right-2 z-30">
                    <PressedBotanicalFlower color="#89AEC8" />
                  </div>
                </div>

                {/* Polaroid - Bottom Right on mobile, Bottom Left on desktop */}
                <div className="absolute bottom-8 sm:bottom-12 right-6 sm:right-auto sm:left-12 w-[160px] sm:w-[230px] z-20 group">
                  <div className="bg-white p-2 sm:p-2.5 pb-3 sm:pb-4 rounded-xs shadow-md border border-[#1B4083]/15 rotate-2 group-hover:-rotate-1 group-hover:scale-[1.02] transition-all duration-300">
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16">
                      <WashiTape className="-rotate-2" />
                    </div>
                    <div className="relative aspect-[4/3] w-full rounded-2xs overflow-hidden bg-[#FAF6F0]">
                      <Image
                        src="/images/heart-card-editorial.png"
                        alt="Permanent Weld Memory"
                        fill
                        sizes="(max-width: 768px) 180px, 230px"
                        className="object-cover"
                      />
                    </div>
                    <p className="mt-2 text-center font-[family-name:var(--font-satisfy)] text-[#1B4083] text-[11px] sm:text-[13px]">
                      Permanent Link Client
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            2. 50/50 SPLIT: ENVELOPE LOVE LETTER REVIEWS + ATELIER FAQs
           ========================================================================= */}
        <div className="max-w-4xl lg:max-w-[880px] xl:max-w-[920px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* LEFT COLUMN: Physical Signature Navy Envelope with 3D Page Turn (6 of 12 columns) */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                {/* Header with Navigation & Sound Toggle */}
                <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="inline-block rounded-full bg-[#FFC8D4] px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[#1B4083] shadow-xs">
                      Client Love Notes
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9.5px] font-mono font-bold tracking-wider uppercase border border-[#1B4083]/15 bg-white/90 text-[#1B4083] shadow-xs">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isEnvelopeOpen
                            ? "bg-emerald-500 animate-pulse"
                            : "bg-[#E57390]"
                        }`}
                      />
                      {isEnvelopeOpen
                        ? `Letter 0${activeStory + 1}/03 Open`
                        : "Archive Sealed"}
                    </span>
                  </div>

                  {/* Sound & Controls Bar */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setSoundEnabled(!soundEnabled)}
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-[#1B4083]/20 bg-white/90 text-[10px] font-mono font-semibold text-[#1B4083] shadow-xs hover:bg-[#1B4083] hover:text-white transition-all"
                      title="Toggle paper turning rustle sound"
                    >
                      <span>{soundEnabled ? "🔊" : "🔈"}</span>
                      <span>Sound: {soundEnabled ? "ON" : "OFF"}</span>
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleFlip("prev")}
                        disabled={!isEnvelopeOpen || isPageFlipping}
                        aria-label="Previous review letter"
                        className="h-7 w-7 rounded-full border border-[#1B4083]/20 bg-white text-[#1B4083] flex items-center justify-center text-xs font-bold shadow-xs hover:bg-[#1B4083] hover:text-white transition-all disabled:opacity-40"
                      >
                        ←
                      </button>
                      <button
                        onClick={() => handleFlip("next")}
                        disabled={!isEnvelopeOpen || isPageFlipping}
                        aria-label="Next review letter"
                        className="h-7 w-7 rounded-full border border-[#1B4083]/20 bg-white text-[#1B4083] flex items-center justify-center text-xs font-bold shadow-xs hover:bg-[#1B4083] hover:text-white transition-all disabled:opacity-40"
                      >
                        →
                      </button>
                    </div>
                  </div>
                </div>

                <h3 className="font-display text-xl sm:text-2xl lg:text-[1.65rem] font-extrabold tracking-tight text-[#1B4083] mb-4">
                  Stories worn close to the heart.
                </h3>

                {/* -----------------------------------------------------------------
                    THE AUTHENTIC STUDIO MEMENTO NAVY ENVELOPE
                    - Midnight Navy (#102242 / #1B3B6F)
                    - 3D Folding Top Flap with Luxury Pearl Blush Lining & Monogram
                    - High-sitting cotton stationery card with 100% visible text & signature
                    - Authentic front pocket folds with 3D embossed pink wax seal
                    - Auto-opens on scroll, auto-closes on 4th click, re-opens on seal click
                   ----------------------------------------------------------------- */}
                <div
                  ref={envelopeContainerRef}
                  className="relative w-full max-w-[360px] sm:max-w-[380px] mx-auto pt-1 pb-1 select-none group"
                >
                  {/* Envelope Canvas Container (500x580 Aspect Ratio) */}
                  <div
                    className="relative w-full aspect-[500/580] overflow-visible"
                    style={{ perspective: "1400px" }}
                  >
                  
                  {/* LAYER 1A: Static Envelope Back Wall & Interior Cavity (Behind Letter) */}
                  <svg
                    viewBox="0 0 500 580"
                    className="absolute inset-0 w-full h-full drop-shadow-2xl pointer-events-none"
                    style={{ zIndex: 1 }}
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      {/* Deep Midnight Navy Gradients */}
                      <linearGradient
                        id="backFlapOuterNavy"
                        x1="250"
                        y1="10"
                        x2="250"
                        y2="240"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0%" stopColor="#1E427B" />
                        <stop offset="40%" stopColor="#152E58" />
                        <stop offset="100%" stopColor="#0E1E3A" />
                      </linearGradient>

                      {/* Closed Outer Flap Gradient */}
                      <linearGradient
                        id="closedFlapNavy"
                        x1="250"
                        y1="230"
                        x2="250"
                        y2="10"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0%" stopColor="#0E1E3A" />
                        <stop offset="60%" stopColor="#16325E" />
                        <stop offset="100%" stopColor="#1E427B" />
                      </linearGradient>

                      {/* Luxury Pearl Blush Flap Lining (Contrasting inner paper) */}
                      <linearGradient
                        id="flapLining"
                        x1="250"
                        y1="25"
                        x2="250"
                        y2="235"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0%" stopColor="#FFF7F8" />
                        <stop offset="50%" stopColor="#FBF2F4" />
                        <stop offset="100%" stopColor="#F3DFE4" />
                      </linearGradient>

                      {/* Deep Shadow inside Envelope Pocket Cavity */}
                      <linearGradient
                        id="pocketCavityDark"
                        x1="250"
                        y1="230"
                        x2="250"
                        y2="570"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0%" stopColor="#081426" />
                        <stop offset="35%" stopColor="#0B1A32" />
                        <stop offset="100%" stopColor="#102344" />
                      </linearGradient>

                      {/* Closed Flap Shadow */}
                      <filter id="closedFlapShadow" x="-10%" y="-10%" width="120%" height="130%">
                        <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#040C18" floodOpacity="0.6" />
                      </filter>
                    </defs>

                    {/* Envelope Back Wall & Interior Cavity */}
                    <rect
                      x="25"
                      y="230"
                      width="450"
                      height="330"
                      rx="24"
                      fill="url(#pocketCavityDark)"
                    />

                    {/* Crease line where flap folds */}
                    <path
                      d="M 25,232 L 475,232"
                      stroke="#2B518E"
                      strokeWidth="1.5"
                      opacity="0.7"
                    />
                  </svg>

                  {/* LAYER 1B: 3D FOLDING TOP FLAP (Folds UP when open, folds DOWN over pocket when closed) */}
                  <div
                    className="absolute inset-x-0 top-0 h-[40%] origin-bottom select-none"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: isEnvelopeOpen ? "rotateX(0deg)" : "rotateX(180deg)",
                      zIndex: isEnvelopeOpen ? 5 : 35,
                      transition:
                        "transform 0.75s cubic-bezier(0.4, 0, 0.2, 1), z-index 0s " +
                        (isEnvelopeOpen ? "0.35s" : "0.35s"),
                      cursor: !isEnvelopeOpen ? "pointer" : "default",
                    }}
                    onClick={!isEnvelopeOpen ? openEnvelope : undefined}
                    title={!isEnvelopeOpen ? "Click to break seal & open archive" : undefined}
                  >
                    {/* FACE 1: Open Top Flap (Inner face - Pearl Blush Lining & Watermark, visible at rotateX(0deg)) */}
                    <div
                      className="absolute inset-0 w-full h-full"
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                      }}
                    >
                      <svg
                        viewBox="0 0 500 232"
                        className="w-full h-full overflow-visible drop-shadow-md"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {/* Outer Midnight Navy backing */}
                        <path
                          d="M 25,232 Q 85,160 235,10 Q 250,2 265,10 Q 415,160 475,232 Z"
                          fill="url(#backFlapOuterNavy)"
                        />

                        {/* Luxury Pearl Blush Inner Lining */}
                        <path
                          d="M 45,230 Q 100,165 238,20 Q 250,12 262,20 Q 400,165 455,230 Z"
                          fill="url(#flapLining)"
                        />
                        <path
                          d="M 52,226 Q 104,165 238,26 Q 250,18 262,26 Q 396,165 448,226"
                          stroke="#E5B2BD"
                          strokeWidth="1.2"
                          strokeDasharray="4 3"
                          fill="none"
                          opacity="0.85"
                        />

                        {/* Monogram Watermark */}
                        <text
                          x="250"
                          y="118"
                          textAnchor="middle"
                          fill="#1B4083"
                          opacity="0.16"
                          fontFamily="Cinzel, serif"
                          fontSize="24"
                          fontWeight="bold"
                          letterSpacing="4"
                        >
                          STUDIO MEMENTO
                        </text>
                      </svg>
                    </div>

                    {/* FACE 2: Closed Top Flap (Outer face - Midnight Navy with 3D Pink Wax Seal, visible at rotateX(180deg)) */}
                    <div
                      className="absolute inset-0 w-full h-full"
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                      }}
                    >
                      <svg
                        viewBox="0 0 500 232"
                        className="w-full h-full overflow-visible"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {/* Outer Midnight Navy Flap pointing down */}
                        <path
                          d="M 25,232 Q 85,160 235,10 Q 250,2 265,10 Q 415,160 475,232 Z"
                          fill="url(#closedFlapNavy)"
                          filter="url(#closedFlapShadow)"
                        />

                        {/* Gilded Border Stitching */}
                        <path
                          d="M 40,228 Q 95,162 236,16 Q 250,8 264,16 Q 405,162 460,228"
                          stroke="#FFC8D4"
                          strokeWidth="1.2"
                          strokeDasharray="5 3"
                          fill="none"
                          opacity="0.75"
                        />
                      </svg>

                      {/* 3D PINK WAX SEAL STAMPED AT FLAP APEX (Holding Envelope Closed) */}
                      <div
                        className="absolute flex flex-col items-center group/seal cursor-pointer"
                        style={{
                          left: "50%",
                          top: "10px",
                          transform: "translateX(-50%) translateY(-25%) rotate(180deg)",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          openEnvelope();
                        }}
                      >
                        <div
                          className="relative w-16 h-16 rounded-full group-hover/seal:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center select-none shadow-2xl"
                          style={{
                            background:
                              "radial-gradient(circle at 35% 30%, #FFC8D4 0%, #FFA8BD 45%, #E57390 85%, #C2506D 100%)",
                            boxShadow:
                              "0 8px 24px rgba(4, 12, 24, 0.65), inset 0 2px 5px rgba(255, 255, 255, 0.8), inset 0 -3px 5px rgba(130, 25, 50, 0.4)",
                          }}
                        >
                          <div className="absolute inset-[-2px] rounded-full border border-[#FFD9E2]/60 pointer-events-none opacity-90 animate-pulse" />

                          <div
                            className="w-11 h-11 rounded-full flex flex-col items-center justify-center border border-[#A83854]/40"
                            style={{
                              background:
                                "radial-gradient(circle at 40% 35%, #F79DB2 0%, #EB7794 65%, #CF4D70 100%)",
                              boxShadow:
                                "inset 0 2px 4px rgba(90, 15, 35, 0.4), 0 1px 1px rgba(255, 255, 255, 0.5)",
                            }}
                          >
                            <span className="font-mono text-[10px] font-black tracking-widest text-[#5A1224] drop-shadow-sm select-none">
                              SM
                            </span>
                            <span className="text-[8px] text-[#5A1224]/80 -mt-0.5 select-none">
                              ✦
                            </span>
                          </div>

                          <div
                            className="absolute top-1.5 left-2 w-4 h-2 rounded-full pointer-events-none"
                            style={{
                              background:
                                "radial-gradient(ellipse at center, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 80%)",
                              transform: "rotate(-30deg)",
                            }}
                          />
                        </div>

                        {/* Interactive Click Hint Tag */}
                        <span className="mt-2 text-[10px] font-mono font-bold uppercase tracking-wider text-[#FFC8D4] bg-[#0E1E3A]/90 px-2.5 py-1 rounded-full border border-[#FFC8D4]/30 shadow-md backdrop-blur-sm whitespace-nowrap group-hover/seal:scale-105 transition-transform">
                          ✦ Click to Break Seal
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* LAYER 2: The Letter / Stationery Paper (Slides UP out of pocket when open, tucked inside when closed) */}
                  <div
                    className="absolute z-10 w-[86%] sm:w-[80%] left-[7%] sm:left-[10%] right-[7%] sm:right-[10%] group-hover:-translate-y-2.5 top-[-6px] sm:top-[26px]"
                    style={{
                      perspective: "1200px",
                      transform: isEnvelopeOpen
                        ? "translateY(0px) scale(1)"
                        : "translateY(190px) scale(0.96)",
                      opacity: isEnvelopeOpen ? 1 : 0,
                      pointerEvents: isEnvelopeOpen ? "auto" : "none",
                      transition: isEnvelopeOpen
                        ? "transform 0.65s cubic-bezier(0.34, 1.25, 0.64, 1) 0.18s, opacity 0.4s ease 0.18s"
                        : "transform 0.5s ease-in 0s, opacity 0.35s ease 0s",
                    }}
                  >
                    <div
                      onClick={handleActionClick}
                      className={`w-full bg-[#FFFFFF] rounded-xl p-3 sm:p-4.5 border border-[#1B4083]/15 cursor-pointer select-none transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                        isPageFlipping
                          ? flipDirection === "next"
                            ? "-rotate-y-45 -translate-y-6 opacity-25 scale-95"
                            : "rotate-y-45 -translate-y-6 opacity-25 scale-95"
                          : "rotate-y-0 translate-y-0 opacity-100 scale-100"
                      }`}
                      style={{
                        transformStyle: "preserve-3d",
                        boxShadow: "0 14px 32px -8px rgba(10, 24, 48, 0.28), 0 3px 8px rgba(0,0,0,0.04)",
                        minHeight: "260px",
                      }}
                    >
                      {/* Top Row: Delicate Pink Quotation Mark & Discreet Counter Badge */}
                      <div className="flex items-center justify-between mb-1 sm:mb-1.5">
                        <div className="font-serif text-xl sm:text-3xl text-[#FFC8D4] leading-none drop-shadow-sm select-none">
                          “
                        </div>
                        <span className="text-[9.5px] sm:text-[10px] font-mono font-bold text-[#1B4083]/80 bg-[#FFF0EB] border border-[#1B4083]/15 px-2 py-0.5 rounded-full">
                          {currentLetter.number}/03
                        </span>
                      </div>

                      {/* Testimonial Quote Text */}
                      <p className="text-[11px] sm:text-[12.5px] text-[#152E58] leading-snug italic font-normal opacity-95">
                        {currentLetter.quote}
                      </p>

                      {/* Thin Hairline Divider */}
                      <div className="my-1.5 sm:my-2 h-px bg-gradient-to-r from-transparent via-[#1B4083]/20 to-transparent" />

                      {/* Prominent Author Signature & Name in Caveat Font */}
                      <div className="flex flex-col justify-end">
                        <p className="font-caveat text-xl sm:text-3xl text-[#1B4083] font-bold tracking-wide leading-none drop-shadow-sm">
                          {currentLetter.author}
                        </p>
                        <div className="flex flex-wrap items-center gap-1 mt-1">
                          <span className="text-[8.5px] sm:text-[9.5px] font-mono uppercase tracking-wider text-[#1B4083]/85 font-bold bg-[#FAF6F0] px-1.5 py-0.5 rounded border border-[#1B4083]/10">
                            {currentLetter.role}
                          </span>
                          <span className="text-[9px] text-[#1B4083]/40">•</span>
                          <span className="text-[8.5px] sm:text-[9.5px] font-mono uppercase tracking-wider text-[#1B4083]/70 font-semibold">
                            {currentLetter.location}
                          </span>
                        </div>
                      </div>

                      {/* Extra bottom tuck-in margin so card rests naturally inside envelope pocket */}
                      <div className="h-4 sm:h-8" />
                    </div>
                  </div>

                  {/* LAYER 3: Front Envelope Pocket (Overlays bottom of letter with authentic folds & seal) */}
                  <div className="absolute bottom-0 left-0 w-full h-[225px] z-20 pointer-events-none">
                    <svg
                      viewBox="0 0 500 225"
                      className="w-full h-full overflow-visible"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        {/* Seam shadow filter */}
                        <filter id="pocketSeamShadow" x="-10%" y="-10%" width="120%" height="120%">
                          <feDropShadow dx="0" dy="-3" stdDeviation="4" floodColor="#061020" floodOpacity="0.4" />
                        </filter>

                        {/* Front Flap Gradients */}
                        <linearGradient id="pocketLeftNavy" x1="25" y1="120" x2="250" y2="40" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="#152E58" />
                          <stop offset="100%" stopColor="#1C3F75" />
                        </linearGradient>

                        <linearGradient id="pocketRightNavy" x1="475" y1="120" x2="250" y2="40" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="#12274A" />
                          <stop offset="100%" stopColor="#193766" />
                        </linearGradient>

                        <linearGradient id="pocketBottomNavy" x1="250" y1="70" x2="250" y2="215" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="#1E437C" />
                          <stop offset="60%" stopColor="#16305C" />
                          <stop offset="100%" stopColor="#0E1E3A" />
                        </linearGradient>
                      </defs>

                      {/* Left Triangular Flap */}
                      <path
                        d="M 25,12 L 250,60 L 250,140 L 25,215 Z"
                        fill="url(#pocketLeftNavy)"
                      />

                      {/* Right Triangular Flap */}
                      <path
                        d="M 475,12 L 250,60 L 250,140 L 475,215 Z"
                        fill="url(#pocketRightNavy)"
                      />

                      {/* Bottom Triangular Flap with Authentic Rounded Base */}
                      <path
                        d="M 25,190 Q 25,215 49,215 L 451,215 Q 475,215 475,190 L 250,88 Z"
                        fill="url(#pocketBottomNavy)"
                        filter="url(#pocketSeamShadow)"
                      />

                      {/* Crisp Paper Rim along Top V Opening */}
                      <path
                        d="M 25,12 L 250,60 L 475,12"
                        stroke="#3D6EAF"
                        strokeWidth="1.5"
                        fill="none"
                      />

                      {/* Soft Inner Shadow along the V collar */}
                      <path
                        d="M 25,14 L 250,62 L 475,14"
                        stroke="#071222"
                        strokeWidth="1"
                        opacity="0.5"
                        fill="none"
                      />
                    </svg>

                    {/* 3D EMBOSSED PINK WAX SEAL ON POCKET (Active when envelope is open) */}
                    {isEnvelopeOpen && (
                      <div className="absolute top-[64px] left-1/2 -translate-x-1/2 pointer-events-auto flex items-center justify-center">
                        <div
                          onClick={handleActionClick}
                          className="relative w-14 h-14 rounded-full cursor-pointer hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center select-none"
                          style={{
                            background: "radial-gradient(circle at 35% 30%, #FFC8D4 0%, #FFA8BD 45%, #E57390 85%, #C2506D 100%)",
                            boxShadow: "0 6px 18px rgba(8, 20, 38, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.7), inset 0 -3px 5px rgba(130, 25, 50, 0.4)",
                          }}
                          title={
                            activeStory === TESTIMONIALS.length - 1
                              ? "Click to seal & close envelope"
                              : "Click to unfold next note"
                          }
                        >
                          <div className="absolute inset-[-2px] rounded-full border border-[#FFD9E2]/50 pointer-events-none opacity-80" />

                          <div
                            className="w-10 h-10 rounded-full flex flex-col items-center justify-center border border-[#A83854]/40"
                            style={{
                              background: "radial-gradient(circle at 40% 35%, #F79DB2 0%, #EB7794 65%, #CF4D70 100%)",
                              boxShadow: "inset 0 2px 4px rgba(90, 15, 35, 0.4), 0 1px 1px rgba(255, 255, 255, 0.5)",
                            }}
                          >
                            <span className="font-mono text-[9px] font-black tracking-widest text-[#5A1224] drop-shadow-sm select-none">
                              SM
                            </span>
                            <span className="text-[7px] text-[#5A1224]/80 -mt-0.5 select-none">
                              ✦
                            </span>
                          </div>

                          <div
                            className="absolute top-1.5 left-2 w-4 h-2 rounded-full pointer-events-none"
                            style={{
                              background: "radial-gradient(ellipse at center, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 80%)",
                              transform: "rotate(-30deg)",
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Bar Beneath Envelope */}
              <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                <button
                  onClick={handleActionClick}
                  disabled={isAnimatingEnvelope || isPageFlipping}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#1B4083] px-5 py-2.5 text-xs font-semibold tracking-tight text-white shadow-md transition-all duration-300 hover:bg-[#0F2753] hover:scale-105 active:scale-95 disabled:opacity-75"
                >
                  <span>
                    {!isEnvelopeOpen
                      ? "✦ Break Seal & Open Archive"
                      : activeStory === TESTIMONIALS.length - 1
                      ? "Seal & Close Archive (4th Click)"
                      : `Unfold Next Story (${currentLetter.number}/03)`}
                  </span>
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#FFC8D4] text-[#1B4083] text-[10px] font-bold">
                    {!isEnvelopeOpen ? "✉" : activeStory === TESTIMONIALS.length - 1 ? "✉" : "→"}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Atelier FAQs Accordion (6 of 12 columns) */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="mb-3">
                <span className="inline-block rounded-full bg-[#FAF6F0] border border-[#1B4083]/20 px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[#1B4083]">
                  Common Questions
                </span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl lg:text-[1.65rem] font-extrabold tracking-tight text-[#1B4083] mb-4">
                Everything you need to know.
              </h3>

              {/* Accordion List */}
              <div className="space-y-2.5">
                {FAQS.map((faq) => {
                  const isOpen = openFaq === faq.id;
                  return (
                    <div
                      key={faq.id}
                      className="rounded-xl bg-white border border-[#1B4083]/15 shadow-2xs transition-all duration-300 overflow-hidden"
                    >
                      <button
                        onClick={() => toggleFaq(faq.id)}
                        className="w-full text-left p-3.5 sm:p-4 flex items-center justify-between gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B4083]"
                        aria-expanded={isOpen}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#1B4083]/60 sm:min-w-[72px]">
                            {faq.badge}
                          </span>
                          <span className="font-display text-xs sm:text-sm font-bold text-[#1B4083]">
                            {faq.question}
                          </span>
                        </div>
                        <span
                          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#1B4083]/20 text-[#1B4083] font-bold text-xs transition-transform duration-300 ${
                            isOpen
                              ? "rotate-45 bg-[#FFC8D4] text-[#1B4083]"
                              : "bg-[#FAF6F0]"
                          }`}
                        >
                          +
                        </span>
                      </button>

                      {isOpen && (
                        <div className="px-3.5 pb-3.5 sm:px-4 sm:pb-4 pt-0 text-xs sm:text-[12.5px] text-[#1B4083]/80 leading-relaxed border-t border-[#1B4083]/10 mt-1">
                          <p className="pt-2.5">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Consultation CTA */}
            <div className="mt-5 rounded-xl bg-[#FFF0EB] border border-[#1B4083]/15 p-3.5 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <p className="font-display text-xs sm:text-sm font-bold text-[#1B4083]">
                  Have a custom question or heirloom idea?
                </p>
                <p className="text-[10.5px] sm:text-[11.5px] text-[#1B4083]/75 mt-0.5">
                  Our team is available in-studio Tue–Sun: 1:00 PM – 9:00 PM.
                </p>
              </div>
              <Link
                href="/appointment"
                className="shrink-0 rounded-full bg-[#1B4083] px-3.5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#0F2753] hover:scale-105 transition-all"
              >
                Book Styling Session →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
}
