import express from "express";
import { updateAvailability } from "./availabilityControls";

const router = express.Router();

router.post("/update", updateAvailability);

export default router;
