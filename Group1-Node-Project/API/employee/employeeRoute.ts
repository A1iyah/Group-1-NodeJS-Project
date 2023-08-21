import express from "express";
const router = express.Router();
import {
  addAttendance,
  getSelectedEmployee,
  getEmployeesByRoleType,
} from "./employeeControl";

router
  .post("/add-attendance", addAttendance)
  .patch("/get-selected-employee", getSelectedEmployee)
  .search("/get-employees-by-role-type", getEmployeesByRoleType);

export default router;
