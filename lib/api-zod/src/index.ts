import { z } from "zod";

// ── Health ────────────────────────────────────────────────────────────────────

export const HealthCheckResponse = z.object({
  status: z.literal("ok"),
});

// ── Booths ────────────────────────────────────────────────────────────────────

export const BoothResponse = z.object({
  id: z.number(),
  number: z.string(),
  hall: z.string(),
  width: z.number(),
  height: z.number(),
  status: z.enum(["available", "occupied"]),
  row: z.number(),
  col: z.number(),
});

// ── Registrations ─────────────────────────────────────────────────────────────

export const CreateRegistrationRequest = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(1, "Phone is required"),
  type: z.enum(["visitor", "exhibitor", "sponsor"]),
  boothId: z.number().nullable().optional(),
  message: z.string().nullable().optional(),
});

export const RegistrationResponse = z.object({
  id: z.number(),
  refNumber: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  type: z.enum(["visitor", "exhibitor", "sponsor"]),
  boothId: z.number().nullable(),
  boothNumber: z.string().nullable(),
  boothHall: z.string().nullable(),
  message: z.string().nullable(),
  createdAt: z.union([z.string(), z.date()]).nullable(),
});

// ── Inferred types ────────────────────────────────────────────────────────────

export type HealthCheck = z.infer<typeof HealthCheckResponse>;
export type Booth = z.infer<typeof BoothResponse>;
export type CreateRegistrationInput = z.infer<typeof CreateRegistrationRequest>;
export type Registration = z.infer<typeof RegistrationResponse>;
