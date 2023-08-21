import express from "express";
const router = express.Router();
import {
  addAttendance,
  getSelectedManager,
  getEmployeesList,
  getSelectedSalaryUp,
  getSelectedSalaryDown,
  getSelectedSalaryBetween,
} from "./managerControl";

router
  .patch("/get-selected-manager", getSelectedManager)
  .patch("/get-employees-list", getEmployeesList)
  .patch("/get-selected-salaryUp", getSelectedSalaryUp)
  .patch("/get-selected-salaryDown", getSelectedSalaryDown)
  .patch("/get-selected-salaryBetween", getSelectedSalaryBetween)
  .post("/add-attendance", addAttendance);
export default router;
