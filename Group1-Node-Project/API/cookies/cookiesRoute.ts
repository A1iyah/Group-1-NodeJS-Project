import express from "express";
const router = express.Router();
import { login, getUser } from "./cookiesControl";

router.post("/login", login).get("/get-user", getUser);

export default router;
