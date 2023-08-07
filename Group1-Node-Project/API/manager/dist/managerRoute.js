"use strict";
exports.__esModule = true;
var express_1 = require("express");
var router = express_1["default"].Router();
var managerControl_1 = require("./managerControl");
router
    .get("/get-manager", managerControl_1.getManager)
    .post("/login", managerControl_1.login)
    .post("/add-attendance", managerControl_1.addAttendance);
exports["default"] = router;
