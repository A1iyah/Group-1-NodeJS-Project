"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
//Schema
var roleSchema = new mongoose_1.Schema({ name: String, salaryPerHour: Number });
var UserSchema = new mongoose_1.Schema({
    id: Number,
    name: String,
    password: String,
    email: String,
    phone: Number,
    birthday: Date,
    role: {
        type: mongoose_1["default"].Schema.Types.ObjectId,
        ref: "Role"
    }
});
var companySchema = new mongoose_1.Schema({
    name: String
});
// create collection
var UserModel = mongoose_1["default"].model("User", UserSchema);
var RoleModel = mongoose_1["default"].model("Role", roleSchema);
var CompanyModel = mongoose_1["default"].model("User", companySchema);
exports["default"] = UserModel;
