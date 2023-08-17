"use strict";
exports.__esModule = true;
var express_1 = require("express");
var router = express_1["default"].Router();
var adminControl_1 = require("./adminControl");
router
    // .get("/get-admin", getAdmin)
    .get("/get-employees-list", adminControl_1.getEmployeesList)
    .get("/get-managers-list", adminControl_1.getManagersList)
    // .post("/login", login)
    .patch("/get-selected-salaryUp", adminControl_1.getSelectedSalaryUp)
    .patch("/get-selected-salaryDown", adminControl_1.getSelectedSalaryDown)
    .patch("/get-selected-salaryBetween", adminControl_1.getSelectedSalaryBetween);
exports["default"] = router;
