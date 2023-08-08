"use strict";
exports.__esModule = true;
var express_1 = require("express");
var router = express_1["default"].Router();
var employeeControl_1 = require("./employeeControl");
router
    .get("/get-employee", employeeControl_1.getEmployee)
    .post("/login", employeeControl_1.login)
    .post("/add-attendance", employeeControl_1.addAttendance);
exports["default"] = router;
