import { integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const appointments = sqliteTable(
  "appointments",
  {
    id: text("id").primaryKey(),
    date: text("date").notNull(),
    slot: text("slot").notNull(),
    name: text("name").notNull(),
    phone: text("phone").notNull(),
    email: text("email"),
    notes: text("notes"),
    createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
  },
  (table) => ({
    dateSlotUnique: uniqueIndex("appointments_date_slot_unique").on(table.date, table.slot),
  }),
);

export const blockedSlots = sqliteTable("blocked_slots", {
  id: text("id").primaryKey(),
  date: text("date").notNull(),
  slot: text("slot"),
  reason: text("reason"),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
});
