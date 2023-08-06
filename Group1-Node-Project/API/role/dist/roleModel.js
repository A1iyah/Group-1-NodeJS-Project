"use strict";
exports.__esModule = true;
exports.RoleModel = void 0;
var mongoose_1 = require("mongoose");
var roleSchema = new mongoose_1.Schema({ name: String });
exports.RoleModel = mongoose_1["default"].model("Role", roleSchema);
exports["default"] = exports.RoleModel;
