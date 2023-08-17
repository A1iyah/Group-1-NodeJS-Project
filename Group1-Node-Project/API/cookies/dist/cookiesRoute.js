"use strict";
exports.__esModule = true;
var express_1 = require("express");
var router = express_1["default"].Router();
var cookiesControl_1 = require("./cookiesControl");
router.post("/login", cookiesControl_1.login).get("/get-user", cookiesControl_1.getUser);
exports["default"] = router;
