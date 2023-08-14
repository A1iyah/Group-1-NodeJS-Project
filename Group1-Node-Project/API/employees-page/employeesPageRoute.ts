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

// if (userType === UserType.Admin || userType === UserType.Manager) {
//   openAddButton.style.display = "block";
// } else if (userType === UserType.Employee) {
//   openAddButton.style.display = "none";
// }
