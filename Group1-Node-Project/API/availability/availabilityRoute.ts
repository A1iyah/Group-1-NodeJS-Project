import express from "express";
import { updateAvailability,    getAllAvailableEmployees,
getEmployeesByRoleAndWeekday } from "./availabilityControls";

const router = express.Router();

router
.post("/update", updateAvailability)
.get("/get-all-available-employees", getAllAvailableEmployees)
.search("/get-employees-by-role-and-weekday", getEmployeesByRoleAndWeekday);

export default router;
