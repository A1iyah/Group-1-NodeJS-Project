"use strict";
exports.__esModule = true;
var express_1 = require("express");
var router = express_1["default"].Router();
var employeesPageControls_1 = require("./employeesPageControls");
router
    .post("/add-manager", employeesPageControls_1.addManager)
    .post("/add-employee", employeesPageControls_1.addEmployee)
    .patch("/get-admin-workers", employeesPageControls_1.getAdminWorkers)
    .patch("/get-manager-employees", employeesPageControls_1.getManagerEmployees)
    .patch("/get-my-team", employeesPageControls_1.getMyTeam);
exports["default"] = router;
