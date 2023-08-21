"use strict";
exports.__esModule = true;
var express_1 = require("express");
var router = express_1["default"].Router();
var managerControl_1 = require("./managerControl");
router
    .patch("/get-selected-manager", managerControl_1.getSelectedManager)
    .patch("/get-employees-list", managerControl_1.getEmployeesList)
    .patch("/get-selected-salaryUp", managerControl_1.getSelectedSalaryUp)
    .patch("/get-selected-salaryDown", managerControl_1.getSelectedSalaryDown)
    .patch("/get-selected-salaryBetween", managerControl_1.getSelectedSalaryBetween)
    .post("/add-attendance", managerControl_1.addAttendance);
exports["default"] = router;
