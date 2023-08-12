import express from "express";
const router = express.Router();
import {
  login,
  getEmployee,
  addAttendance,
  getSelectedEmployee,
} from "./employeeControl";

router
  .get("/get-employee", getEmployee)
  .post("/login", login)
  .post("/add-attendance", addAttendance)
  .patch("/get-selected-employee", getSelectedEmployee);
export default router;
