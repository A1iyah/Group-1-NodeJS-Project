import express from "express";
const router = express.Router();
import {
  addEmployee,
  addManager,
  getAdminEmployees,
  getManagerEmployees,
  getMyTeam,
  deleteEmployee,
  deleteManager,
} from "./employeesPageControls";
import { getRoleIdByName } from "../role/roleControl";

router
  .post("/add-manager", addManager)
  .post("/add-employee", addEmployee)
  .patch("/get-admin-workers", getAdminEmployees)
  .patch("/get-manager-employees", getManagerEmployees)
  .patch("/get-my-team", getMyTeam)
  .post("/get-role-id", getRoleIdByName)
  .delete("/delete-employee", deleteEmployee)
  .delete("/delete-manager", deleteManager);

export default router;
