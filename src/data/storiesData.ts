export type StorySize = "compact" | "medium" | "large";
export type NoteFont = "caveat" | "estonia" | "indieflower";

export interface StoryItem {
  id: string;
  size: StorySize;
  author: string;
  roleOrBadge: string;
  date: string;
  rating: number;
  quote: string; // 4-5 word punchy handwritten quote on the note
  highlight: string;
  story: string; // Full story displayed in the modal
  isBlue: boolean; // true = Brand Blue, false = Brand Pink
  font: NoteFont; // Caveat | Estonia | Indie Flower
  color: {
    bg: string;
    border: string;
    text: string;
    accent: string;
    pin: "pink" | "blue";
  };
  // Percentage coordinates within the static viewport (0-100)
  xPct: number;
  yPct: number;
  // Mobile-specific percentage coordinates (0-100)
  mobileXPct: number;
  mobileYPct: number;
  rotation: number;
  mobileFeatured: boolean; // top 7 featured on mobile
}

export const STORIES_DATA: StoryItem[] = [
  // 1. Blue Note (Top-Left) - Caveat
  {
    id: "story-1",
    size: "medium",
    author: "Aarav & Meera",
    roleOrBadge: "Mixtape Keepsake Pendant",
    date: "October 2024",
    rating: 5,
    quote: "Pure magic coordinates ✨",
    highlight: "Mixtape Keepsake",
    story:
      "The custom cassette pendant with our anniversary song coordinates brought tears to her eyes. The level of detail on the tiny spools is simply unmatched.",
    isBlue: true,
    font: "caveat",
    color: {
      bg: "#1B4083", // Studio Memento Signature Blue
      border: "#132E62",
      text: "#FFC8D4", // Studio Memento Signature Pink
      accent: "#FFC8D4",
      pin: "pink",
    },
    xPct: 7,
    yPct: 17,
    mobileXPct: 6,
    mobileYPct: 15,
    rotation: -4,
    mobileFeatured: true,
  },

  // 2. Pink Note (Top-Center-Left) - Estonia
  {
    id: "story-2",
    size: "large",
    author: "Karim & Aurelie",
    roleOrBadge: "Permanent Bracelet Link",
    date: "August 2024",
    rating: 5,
    quote: "Worn two years straight 🔒",
    highlight: "Permanent Link",
    story:
      "We fell in love with Studio Memento’s private charm session. The weld is seamless and hasn't left my wrist for two years.",
    isBlue: false,
    font: "estonia",
    color: {
      bg: "#FFC8D4", // Studio Memento Signature Pink
      border: "#F4A6B8",
      text: "#1B4083", // Studio Memento Signature Blue
      accent: "#1B4083",
      pin: "blue",
    },
    xPct: 29,
    yPct: 20,
    mobileXPct: 48,
    mobileYPct: 21,
    rotation: 5,
    mobileFeatured: true,
  },

  // 3. Blue Note (Top-Center-Right) - Indie Flower
  {
    id: "story-3",
    size: "medium",
    author: "Tara Sharma",
    roleOrBadge: "Grandmother's Sapphire Ring Reset",
    date: "November 2024",
    rating: 5,
    quote: "Grandmother's sapphire reimagined 💍",
    highlight: "Heirloom Reset",
    story:
      "I brought in my grandmother's vintage ring; Studio Memento reimagined the sapphire into an everyday heirloom I never take off.",
    isBlue: true,
    font: "indieflower",
    color: {
      bg: "#1B4083",
      border: "#132E62",
      text: "#FFC8D4",
      accent: "#FFC8D4",
      pin: "pink",
    },
    xPct: 53,
    yPct: 16,
    mobileXPct: 10,
    mobileYPct: 34,
    rotation: -3,
    mobileFeatured: true,
  },

  // 4. Pink Note (Top-Right) - Caveat
  {
    id: "story-4",
    size: "medium",
    author: "Kavya S.",
    roleOrBadge: "Secret Locket Charm",
    date: "September 2024",
    rating: 5,
    quote: "Obsessed with every detail 💌",
    highlight: "Secret Locket",
    story:
      "Obsessed with every detail! The miniature photo fitting into the locket charm was sheer perfection. Such warm, personal service.",
    isBlue: false,
    font: "caveat",
    color: {
      bg: "#FFC8D4",
      border: "#F4A6B8",
      text: "#1B4083",
      accent: "#1B4083",
      pin: "blue",
    },
    xPct: 75,
    yPct: 19,
    mobileXPct: 50,
    mobileYPct: 40,
    rotation: 6,
    mobileFeatured: true,
  },

  // 5. Pink Note (Mid-Left) - Estonia
  {
    id: "story-5",
    size: "medium",
    author: "Ishita & Kabir",
    roleOrBadge: "Brutalist Wedding Bands",
    date: "December 2024",
    rating: 5,
    quote: "Clean brutalist lines forever 🔨",
    highlight: "Brutalist Bands",
    story:
      "Clean brutalist lines with organic hand-hammered gold. We wanted bands that felt architectural and authentic, not cookie-cutter.",
    isBlue: false,
    font: "estonia",
    color: {
      bg: "#FFC8D4",
      border: "#F4A6B8",
      text: "#1B4083",
      accent: "#1B4083",
      pin: "blue",
    },
    xPct: 11,
    yPct: 43,
    mobileXPct: 8,
    mobileYPct: 53,
    rotation: 4,
    mobileFeatured: true,
  },

  // 6. Blue Note (Center) - Indie Flower
  {
    id: "story-6",
    size: "large",
    author: "Vikramaditya S.",
    roleOrBadge: "Textured Molten Gold Band",
    date: "January 2025",
    rating: 5,
    quote: "Replaced all commercial rings 💫",
    highlight: "Molten Gold",
    story:
      "My wife has stopped wearing all her other jewelry. The textured molten gold band has soul that commercial luxury completely lacks.",
    isBlue: true,
    font: "indieflower",
    color: {
      bg: "#1B4083",
      border: "#132E62",
      text: "#FFC8D4",
      accent: "#FFC8D4",
      pin: "pink",
    },
    xPct: 35,
    yPct: 42,
    mobileXPct: 48,
    mobileYPct: 60,
    rotation: -5,
    mobileFeatured: true,
  },

  // 7. Pink Note (Mid-Right) - Caveat
  {
    id: "story-7",
    size: "medium",
    author: "Aditi Rao",
    roleOrBadge: "Soleil Baroque Pearl Drops",
    date: "July 2024",
    rating: 5,
    quote: "Centerpiece of wedding day 🌸",
    highlight: "Soleil Pearls",
    story:
      "The Soleil Pearl Drop earrings were the centerpiece of my wedding day. The luster of baroque pearls and matte gold caught every spotlight.",
    isBlue: false,
    font: "caveat",
    color: {
      bg: "#FFC8D4",
      border: "#F4A6B8",
      text: "#1B4083",
      accent: "#1B4083",
      pin: "blue",
    },
    xPct: 59,
    yPct: 44,
    mobileXPct: 26,
    mobileYPct: 73,
    rotation: 5,
    mobileFeatured: true,
  },

  // 8. Blue Note (Far-Right) - Estonia
  {
    id: "story-8",
    size: "medium",
    author: "Zoya Merchant",
    roleOrBadge: "Handwriting Micro-Scroll Pendant",
    date: "November 2024",
    rating: 5,
    quote: "Fitted dad's handwriting scroll ✒️",
    highlight: "Handwriting Scroll",
    story:
      "They fitted a micro-scroll of my dad's handwritten poem inside a sleek brushed pendant. Tears every time I hold it close.",
    isBlue: true,
    font: "estonia",
    color: {
      bg: "#1B4083",
      border: "#132E62",
      text: "#FFC8D4",
      accent: "#FFC8D4",
      pin: "pink",
    },
    xPct: 80,
    yPct: 45,
    mobileXPct: 50,
    mobileYPct: 50,
    rotation: -4,
    mobileFeatured: false,
  },

  // 9. Blue Note (Lower-Left) - Indie Flower
  {
    id: "story-9",
    size: "medium",
    author: "Ananya & Rishabh",
    roleOrBadge: "Interlocking Heirloom Bands",
    date: "May 2024",
    rating: 5,
    quote: "Melted parents' vintage gold 💛",
    highlight: "Vintage Gold",
    story:
      "We combined vintage gold from both our families into interlocking wedding bands. Studio Memento handled it with such reverence.",
    isBlue: true,
    font: "indieflower",
    color: {
      bg: "#1B4083",
      border: "#132E62",
      text: "#FFC8D4",
      accent: "#FFC8D4",
      pin: "pink",
    },
    xPct: 19,
    yPct: 69,
    mobileXPct: 10,
    mobileYPct: 70,
    rotation: -3,
    mobileFeatured: false,
  },

  // 10. Pink Note (Lower-Center) - Caveat
  {
    id: "story-10",
    size: "large",
    author: "Farhan & Sania",
    roleOrBadge: "Geometric Connecting Pendants",
    date: "September 2024",
    rating: 5,
    quote: "Two pendants that connect 🤍",
    highlight: "Connecting Pendants",
    story:
      "Geometric silhouettes that fit together seamlessly when held together. A stunning testament to our long-distance journey.",
    isBlue: false,
    font: "caveat",
    color: {
      bg: "#FFC8D4",
      border: "#F4A6B8",
      text: "#1B4083",
      accent: "#1B4083",
      pin: "blue",
    },
    xPct: 43,
    yPct: 67,
    mobileXPct: 43,
    mobileYPct: 67,
    rotation: 4,
    mobileFeatured: false,
  },

  // 11. Blue Note (Lower-Right) - Estonia
  {
    id: "story-11",
    size: "medium",
    author: "Nandita K.",
    roleOrBadge: "Daily Wear Solid Gold Bangle",
    date: "August 2024",
    rating: 5,
    quote: "Zero tarnish after months ✨",
    highlight: "Solid Gold Bangle",
    story:
      "Zero tarnish after 6 months of daily wear, even with hand sanitizer and showers. Solid craftsmanship through and through.",
    isBlue: true,
    font: "estonia",
    color: {
      bg: "#1B4083",
      border: "#132E62",
      text: "#FFC8D4",
      accent: "#FFC8D4",
      pin: "pink",
    },
    xPct: 69,
    yPct: 68,
    mobileXPct: 69,
    mobileYPct: 68,
    rotation: -2,
    mobileFeatured: false,
  },
];
