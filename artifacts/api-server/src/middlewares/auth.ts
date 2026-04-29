import type { Request, Response, NextFunction } from "express";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const adminToken = process.env.ADMIN_TOKEN;

  if (!adminToken) {
    res.status(500).json({ message: "Server misconfiguration: ADMIN_TOKEN not set" });
    return;
  }

  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const token = authHeader.slice(7);
  if (token !== adminToken) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  next();
}
