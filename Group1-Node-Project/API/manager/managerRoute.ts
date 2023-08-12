import express from "express";
const router = express.Router();
import {
  login,
  getManager,
  addAttendance,
  getSelectedManager,
  getEmployeesList,
  getSelectedSalaryUp,
  getSelectedSalaryDown,
  getSelectedSalaryBetween,
} from "./managerControl";

router
  .get("/get-manager", getManager)
  .patch("/get-selected-manager", getSelectedManager)
  .patch("/get-employees-list", getEmployeesList)
  .patch("/get-selected-salaryUp", getSelectedSalaryUp)
  .patch("/get-selected-salaryDown", getSelectedSalaryDown)
  .patch("/get-selected-salaryBetween", getSelectedSalaryBetween)
  .post("/login", login)
  .post("/add-attendance", addAttendance);

export default router;
