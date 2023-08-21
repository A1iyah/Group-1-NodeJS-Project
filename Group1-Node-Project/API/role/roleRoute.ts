import express from "express";
const router = express.Router();
import {getRoleIdByName} from "./roleControl";



router.search("/get-role-id-by-name", getRoleIdByName);

export default router;
