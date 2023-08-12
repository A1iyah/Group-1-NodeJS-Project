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
