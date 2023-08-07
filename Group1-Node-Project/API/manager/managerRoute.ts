import express from "express";
const router = express.Router();
import { login, getManager, addAttendance } from "./managerControl";

router
  .get("/get-manager", getManager)
  .post("/login", login)
  .post("/add-attendance", addAttendance);

export default router;
