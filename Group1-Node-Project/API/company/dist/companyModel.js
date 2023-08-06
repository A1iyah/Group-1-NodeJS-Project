"use strict";
exports.__esModule = true;
exports.CompanyModel = void 0;
var mongoose_1 = require("mongoose");
var companySchema = new mongoose_1.Schema({
    name: String
});
exports.CompanyModel = mongoose_1["default"].model("Company", companySchema);
exports["default"] = exports.CompanyModel;
