"use strict";
exports.__esModule = true;
exports.EmployeeModel = void 0;
var mongoose_1 = require("mongoose");
var employeeSchema = new mongoose_1.Schema({
    idNumber: Number,
    name: String,
    birthday: String,
    password: String,
    email: String,
    phone: Number,
    salaryPerHour: Number,
    role: {
        type: mongoose_1["default"].Schema.Types.ObjectId,
        ref: "Role"
    },
    attendance: [],
    shift: [],
    availability: {
        type: mongoose_1["default"].Schema.Types.ObjectId,
        ref: "Week"
    }
});
exports.EmployeeModel = mongoose_1["default"].model("Employee", employeeSchema);
exports["default"] = exports.EmployeeModel;
