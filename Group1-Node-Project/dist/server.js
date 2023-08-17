"use strict";
exports.__esModule = true;
var express_1 = require("express");
var mongoose_1 = require("mongoose");
var dotenv = require("dotenv");
var adminRoute_1 = require("./API/admin/adminRoute");
var availabilityRoute_1 = require("./API/availability/availabilityRoute");
var companyRoute_1 = require("./API/company/companyRoute");
var employeeRoute_1 = require("./API/employee/employeeRoute");
var managerRoute_1 = require("./API/manager/managerRoute");
var roleRoute_1 = require("./API/role/roleRoute");
var scheduleRoute_1 = require("./API/schedule/scheduleRoute");
var employeesPageRoute_1 = require("./API/employees-page/employeesPageRoute");
var cookiesRoute_1 = require("./API/cookies/cookiesRoute");
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
app.use("/api/company/", companyRoute_1["default"]);
app.use("/api/employee/", employeeRoute_1["default"]);
app.use("/api/manager/", managerRoute_1["default"]);
app.use("/api/role/", roleRoute_1["default"]);
app.use("/api/availability/", availabilityRoute_1["default"]);
app.use("/api/schedule/", scheduleRoute_1["default"]);
app.use("/api/employees-page", employeesPageRoute_1["default"]);
app.use("/api/cookies", cookiesRoute_1["default"]);
app.listen(3000, function () {
    console.log("server listen on port 3000");
});
// const roleSchema = new Schema({ name: String });
// const attendanceSchema = new Schema({
//   date: Date,
//   entry: Date,
//   exit: Date,
// });
// const employeeSchema = new Schema({
//   idNumber: Number,
//   name: String,
//   birthday: String,
//   password: String,
//   email: String,
//   phone: Number,
//   salaryPerHour: Number,
//   role: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Role",
//   },
//   attendance: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Attendance",
//     },
//   ],
// });
// const managerSchema = new Schema({
//   idNumber: Number,
//   name: String,
//   birthday: String,
//   password: String,
//   email: String,
//   phone: Number,
//   salaryPerHour: Number,
//   attendance: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Attendance",
//     },
//   ],
//   employees: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Employee",
//     },
//   ],
// });
// const adminSchema = new Schema({
//   idNumber: Number,
//   name: String,
//   birthday: String,
//   password: String,
//   email: String,
//   phone: Number,
//   salaryPerHour: Number,
//   employees: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Employee",
//     },
//   ],
// });
// const companySchema = new Schema({
//   name: String,
// });
// // create collection
// const RoleModel = mongoose.model("Role", roleSchema);
// const EmployeeModel = mongoose.model("Employee", employeeSchema);
// const ManagerModel = mongoose.model("Manager", managerSchema);
// const AdminModel = mongoose.model("Admin", adminSchema);
// const CompanyModel = mongoose.model("Company", companySchema);
// const AttendanceModel = mongoose.model("Attendance", attendanceSchema);
// createEmployee(
//   222222222,
//   "manager1",
//   new Date("1989-12-27").toLocaleDateString(),
//   "159",
//   "manager1@gmail.com",
//   97250642851,
//   35
// );
// const weekSchema = new Schema({
//   sundayMorning: [],
//   mondayMorning: [],
//   tuesdayMorning: [],
//   wednesdayMorning: [],
//   thursdayMorning: [],
//   fridayMorning: [],
//   saturdayMorning: [],
//   sundayEvening: [],
//   mondayEvening: [],
//   tuesdayEvening: [],
//   wednesdayEvening: [],
//   thursdayEvening: [],
//   fridayEvening: [],
//   saturdayEvening: [],
//   comment: [],
// });
// export const WeekModel = mongoose.model("Week", weekSchema);
// const companySchema = new Schema({
//   originalID: String,
//   systemRole: String,
//   email: String,
//   password: String,
// });
// export const CompanyModel = mongoose.model("company", companySchema);
// const createCompanySchema = async (
//   originalID: string,
//   systemRole: string,
//   email: string,
//   password: string
// ) => {
//   const company = new CompanyModel({ originalID, systemRole, email, password });
//   const result = await company.save();
//   console.log(result);
// };
// createCompanySchema(
//   "64d50e911e5749a59f1f4a6f",
//   "Admin",
//   "admin@gmail.com",
//   "123"
// );
// createCompanySchema(
//   "64d084c6c1730d8967d8195d",
//   "Manager",
//   "manager1@gmail.com",
//   "159"
// );
// createCompanySchema(
//   "64d0851b50545a819228cd45",
//   "Manager",
//   "manager2@gmail.com",
//   "222"
// );
// createCompanySchema(
//   "64d084fe50545a819228cd44",
//   "Manager",
//   "manager3@gmail.com",
//   "666"
// );
// createCompanySchema(
//   "64d083c69e5feea8ea4d3287",
//   "Employee",
//   "omry@gmail.com",
//   "666"
// );
// createCompanySchema(
//   "64d0876650545a819228cd4b",
//   "Employee",
//   "oshrat@gmail.com",
//   "246"
// );
// createCompanySchema(
//   "64d087a550545a819228cd51",
//   "Employee",
//   "shiran@gmail.com",
//   "789456"
// );
// createCompanySchema(
//   "64d087db50545a819228cd52",
//   "Employee",
//   "mor@gmail.com",
//   "12787"
// );
// createCompanySchema(
//   "64d0880450545a819228cd53",
//   "Employee",
//   "linoy@gmail.com",
//   "10292"
// );
// createCompanySchema(
//   "64d0883450545a819228cd56",
//   "Employee",
//   "keren@gmail.com",
//   "101084"
// );
