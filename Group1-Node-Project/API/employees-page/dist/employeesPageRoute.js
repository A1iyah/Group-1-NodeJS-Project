"use strict";
exports.__esModule = true;
var express_1 = require("express");
var router = express_1["default"].Router();
var employeesPageControls_1 = require("./employeesPageControls");
router
    .post("/add-manager", employeesPageControls_1.addManager)
    .post("/add-employee", employeesPageControls_1.addEmployee)
    .patch("/get-workers", employeesPageControls_1.displayWorkers);
exports["default"] = router;
