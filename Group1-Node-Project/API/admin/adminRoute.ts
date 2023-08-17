import express from "express";
const router = express.Router();
import {
  // login,
  // getAdmin,
  getEmployeesList,
  getManagersList,
  getSelectedSalaryUp,
  getSelectedSalaryDown,
  getSelectedSalaryBetween,
} from "./adminControl";

router
  // .get("/get-admin", getAdmin)
  .get("/get-employees-list", getEmployeesList)
  .get("/get-managers-list", getManagersList)
  // .post("/login", login)
  .patch("/get-selected-salaryUp", getSelectedSalaryUp)
  .patch("/get-selected-salaryDown", getSelectedSalaryDown)
  .patch("/get-selected-salaryBetween", getSelectedSalaryBetween);

export default router;
