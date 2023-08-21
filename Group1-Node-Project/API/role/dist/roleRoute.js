"use strict";
exports.__esModule = true;
var express_1 = require("express");
var router = express_1["default"].Router();
var roleControl_1 = require("./roleControl");
router.search("/get-role-id-by-name", roleControl_1.getRoleIdByName);
exports["default"] = router;
