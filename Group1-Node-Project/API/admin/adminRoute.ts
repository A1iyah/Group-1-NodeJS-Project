import express from "express";
const router = express.Router();
import {
  getEmployeesList,
  getManagersList,
  getSelectedSalaryUp,
  getSelectedSalaryDown,
  getSelectedSalaryBetween,
} from "./adminControl";

router
  .get("/get-employees-list", getEmployeesList)
  .get("/get-managers-list", getManagersList)
  .patch("/get-selected-salaryUp", getSelectedSalaryUp)
  .patch("/get-selected-salaryDown", getSelectedSalaryDown)
  .patch("/get-selected-salaryBetween", getSelectedSalaryBetween);

export default router;
