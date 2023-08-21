"use strict";
exports.__esModule = true;
var express_1 = require("express");
var router = express_1["default"].Router();
var employeeControl_1 = require("./employeeControl");
router
    .post("/add-attendance", employeeControl_1.addAttendance)
    .patch("/get-selected-employee", employeeControl_1.getSelectedEmployee)
    .search("/get-employees-by-role-type", employeeControl_1.getEmployeesByRoleType);
exports["default"] = router;
