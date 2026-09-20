import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

const firestore = getFirestore();
// Return Firestore Timestamps as JS Date objects automatically
firestore.settings({
  timestampsInSnapshots: true,
  ignoreUndefinedProperties: true,
});

export const db = firestore;

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
  verifiedAt: Date;
  createdAt: Date;
}

export interface BlockedSlot {
  id: string;
  date: string;
  slot: string | null;
  reason: string | null;
  createdAt: Date;
}
