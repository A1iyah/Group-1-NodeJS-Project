import express from "express";
const router = express.Router();
import {
  // login,
  // getEmployee,
  addAttendance,
  getSelectedEmployee,
  getEmployeesByRoleType,
  // addEmployee,
} from "./employeeControl";
// import { addManager } from "../manager/managerControl";

router
  // .get("/get-employee", getEmployee)
  // .post("/login", login)
  .post("/add-attendance", addAttendance)
  .patch("/get-selected-employee", getSelectedEmployee)
  .search("/get-employees-by-role-type", getEmployeesByRoleType);
// .post("/add-employee", addEmployee);

export default router;
