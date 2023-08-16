"use strict";
exports.__esModule = true;
exports.CompanyModel = void 0;
var mongoose_1 = require("mongoose");
var companySchema = new mongoose_1.Schema({
    originalID: String,
    systemRole: String,
    email: String,
    password: String
});
exports.CompanyModel = mongoose_1["default"].model("company", companySchema);
exports["default"] = exports.CompanyModel;
