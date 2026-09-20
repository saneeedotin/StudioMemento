export const SITE = {
  name: "Studio Memento",
  tagline: "wear your own story.",
  hours: "11:30 AM – 9:00 PM",
  slotMinutes: 30,
  // Real contact details
  phone: "+91 96190 69460",
  phoneHref: "tel:+919619069460",
  whatsapp: "https://wa.me/919619069460",
  addressLine1: "Shop 10, The Signature Building, near Ganpati Mandir Road",
  addressLine2: "Opp. Mantra Restaurant & Bar, Pendse Nagar, Dombivli East, Kalyan, Maharashtra 421201",
  fullAddress: "Shop 10, The Signature Building, near Ganpati Mandir Road, opposite Mantra Restaurant & Bar, Dombivli, Pendse Nagar, Dombivli East, Dombivli, Kalyan, Maharashtra 421201",
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
