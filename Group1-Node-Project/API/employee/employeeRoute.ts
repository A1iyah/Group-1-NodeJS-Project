import express from "express";
const router = express.Router();
import { login, getEmployee, addAttendance, addEmployee } from "./employeeControl";
import { addManager } from "../manager/managerControl";

router
  .get("/get-employee", getEmployee)
  .post("/login", login)
  .post("/add-attendance", addAttendance)
  .post("/add-employee", addEmployee);

export default router;
