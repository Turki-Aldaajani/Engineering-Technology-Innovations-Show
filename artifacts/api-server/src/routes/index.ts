import { Router, type IRouter } from "express";
import healthRouter from "./health";
import boothsRouter from "./booths";
import registrationsRouter from "./registrations";

const router: IRouter = Router();

router.use(healthRouter);
router.use(boothsRouter);
router.use(registrationsRouter);

export default router;
