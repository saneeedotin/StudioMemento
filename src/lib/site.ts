export const SITE = {
  name: "Studio Memento",
  tagline: "wear your own story.",
  hours: "11:30 AM – 9:00 PM",
  slotMinutes: 30,
  // PLACEHOLDER — replace with real details before launch
  phone: "+91 90000 00000",
  phoneHref: "tel:+919000000000",
  addressLine1: "Shop 10, The Signature Building, near Ganpati Mandir Road",
  addressLine2: "opposite Mantra Restaurant & Bar, Dombivli East, Maharashtra 421201",
  mapsLink: "https://maps.app.goo.gl/xswWsu3GhsrDhhwW9",
  email: "hello@studiomemento.in",
  instagram: "https://www.instagram.com/studiomemento.in_/",
  pinterest: "https://pinterest.com/studiomemento",
} as const;

export const BOOKING = {
  openMinute: 11 * 60 + 30,
  closeMinute: 21 * 60,
  stepMinutes: 30,
  horizonDays: 14,
  timezone: "Asia/Kolkata",
} as const;

export function formatSlot(minute: number): string {
  const h24 = Math.floor(minute / 60);
  const m = minute % 60;
  const suffix = h24 >= 12 ? "PM" : "AM";
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${suffix}`;
}
