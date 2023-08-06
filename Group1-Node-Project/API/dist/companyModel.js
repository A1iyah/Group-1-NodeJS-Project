"use strict";
exports.__esModule = true;
exports.AttendanceModel = exports.CompanyModel = exports.AdminModel = exports.ManagerModel = exports.EmployeeModel = exports.RoleModel = void 0;
var mongoose_1 = require("mongoose");
//Schema
var roleSchema = new mongoose_1.Schema({ name: String });
var attendanceSchema = new mongoose_1.Schema({
    date: new Date().getDate,
    entry: new Date().getTime,
    exit: new Date().getTime
});
var employeeSchema = new mongoose_1.Schema({
    idNumber: Number,
    name: String,
    birthday: Date,
    password: String,
    email: String,
    phone: Number,
    salaryPerHour: Number,
    role: {
        type: mongoose_1["default"].Schema.Types.ObjectId,
        ref: "Role"
    },
    attendance: [
        {
            type: mongoose_1["default"].Schema.Types.ObjectId,
            ref: "Attendance"
        },
    ]
});
var managerSchema = new mongoose_1.Schema({
    idNumber: Number,
    name: String,
    birthday: Date,
    password: String,
    email: String,
    phone: Number,
    salaryPerHour: Number,
    attendance: [
        {
            type: mongoose_1["default"].Schema.Types.ObjectId,
            ref: "Attendance"
        },
    ],
    employees: [
        {
            type: mongoose_1["default"].Schema.Types.ObjectId,
            ref: "Employee"
        },
    ]
});
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
var companySchema = new mongoose_1.Schema({
    name: String
});
// create collection
exports.RoleModel = mongoose_1["default"].model("Role", roleSchema);
exports.EmployeeModel = mongoose_1["default"].model("Employee", employeeSchema);
exports.ManagerModel = mongoose_1["default"].model("Manager", managerSchema);
exports.AdminModel = mongoose_1["default"].model("Admin", adminSchema);
exports.CompanyModel = mongoose_1["default"].model("Company", companySchema);
exports.AttendanceModel = mongoose_1["default"].model("Attendance", attendanceSchema);
exports["default"] = exports.EmployeeModel;
