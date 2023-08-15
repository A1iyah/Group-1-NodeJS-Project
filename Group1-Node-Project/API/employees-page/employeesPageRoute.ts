import express from "express";
const router = express.Router();
import {
  addEmployee,
  addManager,
  getAdminWorkers,
  getManagerEmployees,
} from "./employeesPageControls";

router
  .post("/add-manager", addManager)
  .post("/add-employee", addEmployee)
  .patch("/get-admin-workers", getAdminWorkers)
  .patch("/get-manager-employees", getManagerEmployees);

export default router;
