"use strict";
exports.__esModule = true;
exports.WeekModel = exports.DayModel = void 0;
var mongoose_1 = require("mongoose");
var daySchema = new mongoose_1["default"].Schema({
    employeeId: String,
    name: String,
    role: String,
    comment: String
});
//
var weekSchema = new mongoose_1.Schema({
    sundayMorning: [daySchema],
    mondayMorning: [daySchema],
    tuesdayMorning: [daySchema],
    wednesdayMorning: [daySchema],
    thursdayMorning: [daySchema],
    fridayMorning: [daySchema],
    saturdayMorning: [daySchema]
});
exports.DayModel = mongoose_1["default"].model("Day", daySchema);
exports.WeekModel = mongoose_1["default"].model("Week", weekSchema);
exports["default"] = exports.WeekModel;
