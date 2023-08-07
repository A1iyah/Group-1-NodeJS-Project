"use strict";
exports.__esModule = true;
var express_1 = require("express");
var router = express_1["default"].Router();
var adminControl_1 = require("./adminControl");
router.get("/get-admin", adminControl_1.getAdmin).post("/login", adminControl_1.login);
exports["default"] = router;
