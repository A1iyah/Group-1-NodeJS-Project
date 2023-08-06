"use strict";
exports.__esModule = true;
exports.AdminModel = void 0;
var mongoose_1 = require("mongoose");
var adminSchema = new mongoose_1.Schema({
    idNumber: Number,
    name: String,
    password: String,
    email: String,
    phone: Number,
    employees: [
        {
            type: mongoose_1["default"].Schema.Types.ObjectId,
            ref: "Employee"
        },
    ]
});
exports.AdminModel = mongoose_1["default"].model("Admin", adminSchema);
exports["default"] = exports.AdminModel;
