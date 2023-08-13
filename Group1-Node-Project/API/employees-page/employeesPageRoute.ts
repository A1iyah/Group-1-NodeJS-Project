import express from "express";
const router = express.Router();
import {
  addEmployee,
  addManager,
  displayWorkers,
} from "./employeesPageControls";

router
  .post("/add-manager", addManager)
  .post("/add-employee", addEmployee)
  .patch("/get-workers", displayWorkers);

export default router;
