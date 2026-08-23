import { BOOKING, formatSlot } from "@/lib/site";

export type Slot = {
  value: string;
  label: string;
  available: boolean;
  blocked: boolean;
};

export function getStudioToday(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: BOOKING.timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export function getBookingDates(): string[] {
  const today = getStudioToday();
  const start = new Date(`${today}T00:00:00Z`);
  return Array.from({ length: BOOKING.horizonDays + 1 }, (_, index) => {
    const date = new Date(start);
    date.setUTCDate(start.getUTCDate() + index);
    return date.toISOString().slice(0, 10);
  });
}

export function getSlotValues(): string[] {
  return Array.from(
    { length: (BOOKING.closeMinute - BOOKING.openMinute) / BOOKING.stepMinutes },
    (_, index) => {
      const minute = BOOKING.openMinute + index * BOOKING.stepMinutes;
      return `${String(Math.floor(minute / 60)).padStart(2, "0")}:${String(minute % 60).padStart(2, "0")}`;
    },
  );
}

export function getCurrentStudioMinute(): number {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: BOOKING.timezone,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  return Number(parts.find((part) => part.type === "hour")?.value ?? 0) * 60 + Number(parts.find((part) => part.type === "minute")?.value ?? 0);
}

export function isBookableDate(date: string): boolean {
  return getBookingDates().includes(date);
}

export function createSlots(date: string, booked: Set<string>, blocked: Set<string>): Slot[] {
  const today = getStudioToday();
  const currentMinute = getCurrentStudioMinute();
  return getSlotValues().map((value) => {
    const [hour, minute] = value.split(":").map(Number);
    const isPast = date === today && hour * 60 + minute <= currentMinute;
    const isBlocked = blocked.has(value) || blocked.has("*");
    return { value, label: formatSlot(hour * 60 + minute), available: !booked.has(value) && !isBlocked && !isPast, blocked: isBlocked };
  });
}
