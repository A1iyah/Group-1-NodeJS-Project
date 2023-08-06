"use strict";
exports.__esModule = true;
exports.AttendanceModel = void 0;
var mongoose_1 = require("mongoose");
var attendanceSchema = new mongoose_1.Schema({
    date: new Date().getDate,
    entry: new Date().getTime,
    exit: new Date().getTime
});
exports.AttendanceModel = mongoose_1["default"].model("Attendance", attendanceSchema);
exports["default"] = exports.AttendanceModel;
