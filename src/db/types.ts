export interface Appointment {
  id: string;
  date: string;
  slot: string;
  name: string;
  phone: string;
  email: string | null;
  notes: string | null;
  status: string;
  verificationToken: string | null;
  verifiedAt: Date | null;
  createdAt: { toMillis: () => number } | Date;
}

export interface BlockedSlot {
  id: string;
  date: string;
  slot: string | null;
  reason: string | null;
  createdAt: { toMillis: () => number } | Date;
}
