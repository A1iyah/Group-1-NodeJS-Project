"use strict";
exports.__esModule = true;
exports.WeekModel = void 0;
var mongoose_1 = require("mongoose");
var weekSchema = new mongoose_1.Schema({
    sunday: [],
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    comment: []
});
exports.WeekModel = mongoose_1["default"].model("Week", weekSchema);
exports["default"] = exports.WeekModel;
