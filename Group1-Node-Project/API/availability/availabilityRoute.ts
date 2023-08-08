import express from "express";
import { updateAvailability } from "./availabilityControls";

const router = express.Router();

router.post("/api/availability/update", updateAvailability);

export default router;
