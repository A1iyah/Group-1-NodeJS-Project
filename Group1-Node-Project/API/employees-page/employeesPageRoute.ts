import express from "express";
const router = express.Router();
import {
  addEmployee,
  addManager,
  getAdminWorkers,
  getManagerEmployees,
  getMyTeam,
} from "./employeesPageControls";
import { getRoleIdByName } from "../role/roleControl";

router
  .post("/add-manager", addManager)
  .post("/add-employee", addEmployee)
  .patch("/get-admin-workers", getAdminWorkers)
  .patch("/get-manager-employees", getManagerEmployees)
  .patch("/get-my-team", getMyTeam)
  .post("/get-role-id", getRoleIdByName);

export default router;
