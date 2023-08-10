import express from "express";
const router = express.Router();
import { login, getManager, addAttendance, addManager } from "./managerControl";

router
  .get("/get-manager", getManager)
  .post("/login", login)
  .post("/add-attendance", addAttendance)
  .post("/add-manager", addManager);
export default router;
