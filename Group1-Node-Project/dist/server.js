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
app.listen(3000, function () {
    console.log("server listen on port 3000");
});
