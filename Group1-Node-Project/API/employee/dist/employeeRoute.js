"use strict";
exports.__esModule = true;
var express_1 = require("express");
var router = express_1["default"].Router();
var employeeControl_1 = require("./employeeControl");
// import { addManager } from "../manager/managerControl";
router
    // .get("/get-employee", getEmployee)
    // .post("/login", login)
    .post("/add-attendance", employeeControl_1.addAttendance)
    .patch("/get-selected-employee", employeeControl_1.getSelectedEmployee);
// .post("/add-employee", addEmployee);
exports["default"] = router;
