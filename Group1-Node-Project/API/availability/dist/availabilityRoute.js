"use strict";
exports.__esModule = true;
var express_1 = require("express");
var availabilityControls_1 = require("./availabilityControls");
var router = express_1["default"].Router();
router
    .post("/update", availabilityControls_1.updateAvailability)
    .get("/get-all-available-employees", availabilityControls_1.getAllAvailableEmployees)
    .search("/get-employees-by-role-and-weekday", availabilityControls_1.getEmployeesByRoleAndWeekday);
exports["default"] = router;
