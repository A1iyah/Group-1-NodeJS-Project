import express from "express";
const router = express.Router();
import {getRoleIdByName} from "./roleControl";

// router.post("/add-user", addUsers);
// router.post("/login", login);
// router.get("/get-user", getUser);

router.search("/get-role-id-by-name", getRoleIdByName);

export default router;
