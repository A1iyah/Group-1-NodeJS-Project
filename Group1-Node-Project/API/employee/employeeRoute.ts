import express from "express";
const router = express.Router();
import { login, getEmployee, addAttendance } from "./employeeControl";

router
  .get("/get-employee", getEmployee)
  .post("/login", login)
  .post("/add-attendance", addAttendance);

export default router;
