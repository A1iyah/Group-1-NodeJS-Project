import express from "express";
import { updateAvailability,    getAllAvailableEmployees,
getEmployeesByRoleAndWeekday,
getCommentByEmployeeIdAndWeekday } from "./availabilityControls";

const router = express.Router();

router
.post("/update", updateAvailability)
.get("/get-all-available-employees", getAllAvailableEmployees)
.search("/get-employees-by-role-and-weekday", getEmployeesByRoleAndWeekday)
.search("/get-comment-by-employee-id-and-weekday", getCommentByEmployeeIdAndWeekday);

export default router;
