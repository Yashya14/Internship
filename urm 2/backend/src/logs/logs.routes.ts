import { Router } from "express";
import { getAllLogs } from "./logs.controllers";

const router = Router();

router.get("/logs", getAllLogs);

export default router;