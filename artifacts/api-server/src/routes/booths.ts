import { Router } from "express";
import { db, boothsTable } from "@workspace/db";

const boothsRouter = Router();

boothsRouter.get("/booths", async (req, res) => {
  try {
    const booths = await db.select().from(boothsTable).orderBy(boothsTable.hall, boothsTable.row, boothsTable.col);
    res.json(booths);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ message: "Failed to fetch booths" });
  }
});

export default boothsRouter;
