import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export const boothsTable = pgTable("booths", {
  id: serial("id").primaryKey(),
  number: text("number").notNull().unique(),
  hall: text("hall").notNull(),
  width: integer("width").notNull(),
  height: integer("height").notNull(),
  status: text("status").$type<"available" | "occupied">().notNull().default("available"),
  row: integer("row").notNull(),
  col: integer("col").notNull(),
});

export const registrationsTable = pgTable("registrations", {
  id: serial("id").primaryKey(),
  refNumber: text("ref_number").notNull().unique(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  type: text("type").$type<"visitor" | "exhibitor" | "sponsor">().notNull(),
  boothId: integer("booth_id").references(() => boothsTable.id),
  message: text("message"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type InsertRegistration = Omit<InferInsertModel<typeof registrationsTable>, "id" | "refNumber" | "createdAt">;
export type Registration = InferSelectModel<typeof registrationsTable>;
export type Booth = InferSelectModel<typeof boothsTable>;
export type InsertBooth = InferInsertModel<typeof boothsTable>;
