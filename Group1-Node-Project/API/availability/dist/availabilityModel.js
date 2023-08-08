"use strict";
exports.__esModule = true;
exports.WeekModel = void 0;
var mongoose_1 = require("mongoose");
var weekSchema = new mongoose_1.Schema({
    sunday: Boolean,
    monday: Boolean,
    tuesday: Boolean,
    wednesday: Boolean,
    thursday: Boolean,
    friday: Boolean,
    saturday: Boolean,
    comment: String
});
exports.WeekModel = mongoose_1["default"].model("Week", weekSchema);
exports["default"] = exports.WeekModel;
