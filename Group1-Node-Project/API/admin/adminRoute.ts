import express from "express";
const router = express.Router();
import { login, getAdmin } from "./adminControl";

router.get("/get-admin", getAdmin).post("/login", login);

export default router;
