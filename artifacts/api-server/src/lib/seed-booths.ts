import { db, boothsTable } from "@workspace/db";
import { eq, sql } from "drizzle-orm";
import { logger } from "./logger";

const INITIAL_BOOTHS = [
  { number: "A01", hall: "القاعة أ", width: 3, height: 3, status: "available" as const, row: 0, col: 0 },
  { number: "A02", hall: "القاعة أ", width: 3, height: 3, status: "occupied"  as const, row: 0, col: 1 },
  { number: "A03", hall: "القاعة أ", width: 3, height: 3, status: "available" as const, row: 0, col: 2 },
  { number: "A04", hall: "القاعة أ", width: 4, height: 4, status: "available" as const, row: 0, col: 3 },
  { number: "A05", hall: "القاعة أ", width: 4, height: 4, status: "occupied"  as const, row: 0, col: 4 },
  { number: "A06", hall: "القاعة أ", width: 3, height: 3, status: "available" as const, row: 1, col: 0 },
  { number: "A07", hall: "القاعة أ", width: 4, height: 4, status: "available" as const, row: 1, col: 1 },
  { number: "A08", hall: "القاعة أ", width: 3, height: 3, status: "occupied"  as const, row: 1, col: 2 },
  { number: "A09", hall: "القاعة أ", width: 3, height: 3, status: "available" as const, row: 1, col: 3 },
  { number: "A10", hall: "القاعة أ", width: 4, height: 4, status: "available" as const, row: 1, col: 4 },
  { number: "A11", hall: "القاعة أ", width: 6, height: 4, status: "available" as const, row: 2, col: 0 },
  { number: "A12", hall: "القاعة أ", width: 4, height: 4, status: "occupied"  as const, row: 2, col: 1 },
  { number: "A13", hall: "القاعة أ", width: 3, height: 3, status: "available" as const, row: 2, col: 2 },
  { number: "A14", hall: "القاعة أ", width: 3, height: 3, status: "available" as const, row: 2, col: 3 },
  { number: "A15", hall: "القاعة أ", width: 4, height: 4, status: "occupied"  as const, row: 2, col: 4 },
  { number: "B01", hall: "القاعة ب", width: 4, height: 4, status: "available" as const, row: 0, col: 0 },
  { number: "B02", hall: "القاعة ب", width: 3, height: 3, status: "occupied"  as const, row: 0, col: 1 },
  { number: "B03", hall: "القاعة ب", width: 3, height: 3, status: "available" as const, row: 0, col: 2 },
  { number: "B04", hall: "القاعة ب", width: 6, height: 4, status: "available" as const, row: 0, col: 3 },
  { number: "B05", hall: "القاعة ب", width: 4, height: 4, status: "occupied"  as const, row: 0, col: 4 },
  { number: "B06", hall: "القاعة ب", width: 3, height: 3, status: "available" as const, row: 1, col: 0 },
  { number: "B07", hall: "القاعة ب", width: 4, height: 4, status: "available" as const, row: 1, col: 1 },
  { number: "B08", hall: "القاعة ب", width: 3, height: 3, status: "occupied"  as const, row: 1, col: 2 },
  { number: "B09", hall: "القاعة ب", width: 4, height: 4, status: "available" as const, row: 1, col: 3 },
  { number: "B10", hall: "القاعة ب", width: 3, height: 3, status: "available" as const, row: 1, col: 4 },
  { number: "B11", hall: "القاعة ب", width: 4, height: 4, status: "available" as const, row: 2, col: 0 },
  { number: "B12", hall: "القاعة ب", width: 3, height: 3, status: "occupied"  as const, row: 2, col: 1 },
  { number: "B13", hall: "القاعة ب", width: 6, height: 4, status: "available" as const, row: 2, col: 2 },
  { number: "B14", hall: "القاعة ب", width: 3, height: 3, status: "available" as const, row: 2, col: 3 },
  { number: "B15", hall: "القاعة ب", width: 4, height: 4, status: "available" as const, row: 2, col: 4 },
];

export async function seedBooths() {
  const count = await db
    .select({ count: sql<number>`count(*)` })
    .from(boothsTable);

  if (Number(count[0]?.count) > 0) {
    return;
  }

  logger.info("Seeding booths table with initial data");
  await db.insert(boothsTable).values(INITIAL_BOOTHS);
  logger.info("Booths seeded successfully");
}
