"use strict";
exports.__esModule = true;
var express_1 = require("express");
var mongoose_1 = require("mongoose");
var dotenv = require("dotenv");
var adminRoute_1 = require("./API/admin/adminRoute");
var attendanceRoute_1 = require("./API/attendance/attendanceRoute");
var companyRoute_1 = require("./API/company/companyRoute");
var employeeRoute_1 = require("./API/employee/employeeRoute");
var managerRoute_1 = require("./API/manager/managerRoute");
var roleRoute_1 = require("./API/role/roleRoute");
var cookie_parser_1 = require("cookie-parser");
dotenv.config();
var uri = process.env.MONGOOSE_URI + "Node-Team-Project";
if (uri) {
    mongoose_1["default"]
        .connect(uri)
        .then(function () { return console.log("DB connected"); })["catch"](function (err) { return console.log("DB error :", err); });
}
else {
    console.log("No URI");
}
var app = express_1["default"]();
app.use(express_1["default"].json());
app.use(cookie_parser_1["default"]());
// static file
app.use(express_1["default"].static("./client"));
app.use("/api/admin/", adminRoute_1["default"]);
app.use("/api/attendance/", attendanceRoute_1["default"]);
app.use("/api/company/", companyRoute_1["default"]);
app.use("/api/employee/", employeeRoute_1["default"]);
app.use("/api/manager/", managerRoute_1["default"]);
app.use("/api/role/", roleRoute_1["default"]);
var roleSchema = new mongoose_1.Schema({ name: String });
var attendanceSchema = new mongoose_1.Schema({
    date: Date,
    entry: Date,
    exit: Date
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
    birthday: Date,
    password: String,
    email: String,
    phone: Number,
    salaryPerHour: Number,
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
var RoleModel = mongoose_1["default"].model("Role", roleSchema);
var EmployeeModel = mongoose_1["default"].model("Employee", employeeSchema);
var ManagerModel = mongoose_1["default"].model("Manager", managerSchema);
var AdminModel = mongoose_1["default"].model("Admin", adminSchema);
var CompanyModel = mongoose_1["default"].model("Company", companySchema);
var AttendanceModel = mongoose_1["default"].model("Attendance", attendanceSchema);
// async function createManager(
//   idNumber: number,
//   name: string,
//   birthday: Date,
//   password: string,
//   email: string,
//   phone: number,
//   salaryPerHour: number
// ) {
//   const manager = new ManagerModel({
//     idNumber,
//     name,
//     birthday,
//     password,
//     email,
//     phone,
//     salaryPerHour,
//   });
//   const result = await manager.save();
//   console.log(result);
// }
// createManager(
//   444444444,
//   "manager3",
//   new Date("1985-12-01"),
//   "666",
//   "manager3@gmail.com",
//   97254143562,
//   40
// );
app.listen(3000, function () {
    console.log("server listen on port 3000");
});
