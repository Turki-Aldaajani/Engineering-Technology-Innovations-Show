import { Router } from "express";
import { db, boothsTable, registrationsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const registrationsRouter = Router();

function generateRef(): string {
  return "REG-" + Math.floor(10000 + Math.random() * 90000);
}

registrationsRouter.post("/registrations", async (req, res) => {
  const { name, email, phone, type, boothId, message } = req.body as {
    name?: string;
    email?: string;
    phone?: string;
    type?: string;
    boothId?: number | null;
    message?: string | null;
  };

  if (!name || !email || !phone || !type) {
    res.status(400).json({ message: "name, email, phone, and type are required" });
    return;
  }

  if (!["visitor", "exhibitor", "sponsor"].includes(type)) {
    res.status(400).json({ message: "Invalid participation type" });
    return;
  }

  if (type === "exhibitor" && !boothId) {
    res.status(400).json({ message: "Exhibitors must select a booth" });
    return;
  }

  let resolvedBoothId: number | null = null;

  if (type === "exhibitor" && boothId) {
    const booth = await db
      .select()
      .from(boothsTable)
      .where(eq(boothsTable.id, boothId))
      .limit(1);

    if (!booth[0]) {
      res.status(400).json({ message: "Invalid booth selected" });
      return;
    }

    if (booth[0].status === "occupied") {
      res.status(409).json({ message: "This booth has already been reserved. Please choose another." });
      return;
    }

    resolvedBoothId = boothId;
  }

  const refNumber = generateRef();

  const [registration] = await db
    .insert(registrationsTable)
    .values({
      refNumber,
      name,
      email,
      phone,
      type: type as "visitor" | "exhibitor" | "sponsor",
      boothId: resolvedBoothId,
      message: message ?? null,
    })
    .returning();

  if (resolvedBoothId) {
    await db
      .update(boothsTable)
      .set({ status: "occupied" })
      .where(eq(boothsTable.id, resolvedBoothId));
  }

  let boothNumber: string | null = null;
  let boothHall: string | null = null;

  if (resolvedBoothId) {
    const booth = await db
      .select()
      .from(boothsTable)
      .where(eq(boothsTable.id, resolvedBoothId))
      .limit(1);
    boothNumber = booth[0]?.number ?? null;
    boothHall = booth[0]?.hall ?? null;
  }

  res.status(201).json({
    id: registration.id,
    refNumber: registration.refNumber,
    name: registration.name,
    email: registration.email,
    phone: registration.phone,
    type: registration.type,
    boothId: registration.boothId,
    boothNumber,
    boothHall,
    message: registration.message,
    createdAt: registration.createdAt,
  });
});

registrationsRouter.get("/registrations", async (req, res) => {
  try {
    const rows = await db
      .select({
        id: registrationsTable.id,
        refNumber: registrationsTable.refNumber,
        name: registrationsTable.name,
        email: registrationsTable.email,
        phone: registrationsTable.phone,
        type: registrationsTable.type,
        boothId: registrationsTable.boothId,
        boothNumber: boothsTable.number,
        boothHall: boothsTable.hall,
        message: registrationsTable.message,
        createdAt: registrationsTable.createdAt,
      })
      .from(registrationsTable)
      .leftJoin(boothsTable, eq(registrationsTable.boothId, boothsTable.id))
      .orderBy(registrationsTable.createdAt);

    res.json(rows);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ message: "Failed to fetch registrations" });
  }
});

registrationsRouter.get("/registrations/export", async (req, res) => {
  try {
    const rows = await db
      .select({
        id: registrationsTable.id,
        refNumber: registrationsTable.refNumber,
        name: registrationsTable.name,
        email: registrationsTable.email,
        phone: registrationsTable.phone,
        type: registrationsTable.type,
        boothNumber: boothsTable.number,
        boothHall: boothsTable.hall,
        message: registrationsTable.message,
        createdAt: registrationsTable.createdAt,
      })
      .from(registrationsTable)
      .leftJoin(boothsTable, eq(registrationsTable.boothId, boothsTable.id))
      .orderBy(registrationsTable.createdAt);

    const header = "ref_number,name,email,phone,type,booth_number,booth_hall,message,created_at";
    const csvRows = rows.map((r) => {
      const fields = [
        r.refNumber,
        r.name,
        r.email,
        r.phone,
        r.type,
        r.boothNumber ?? "",
        r.boothHall ?? "",
        (r.message ?? "").replace(/"/g, '""'),
        r.createdAt instanceof Date ? r.createdAt.toISOString() : String(r.createdAt),
      ];
      return fields.map((f) => `"${f}"`).join(",");
    });

    const csv = [header, ...csvRows].join("\n");

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename="registrations-${Date.now()}.csv"`);
    res.send(csv);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ message: "Failed to export registrations" });
  }
});

export default registrationsRouter;
