"use strict";
exports.__esModule = true;
var express_1 = require("express");
var mongoose_1 = require("mongoose");
var dotenv = require("dotenv");
var companyRoute_1 = require("./API/companyRoute");
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
app.use("/api/", companyRoute_1["default"]);
// async function createAdmin(
//   idNumber: number,
//   name: string,
//   password: string,
//   email: string,
//   phone: number
// ) {
//   const admin = new AdminModel({ idNumber, name, password, email, phone });
//   const result = await admin.save();
//   console.log(result);
// }
// createAdmin(123456789, "admin", "123", "admin@gmail.com", 972506254875);
app.listen(3000, function () {
    console.log("server listen on port 3000");
});
