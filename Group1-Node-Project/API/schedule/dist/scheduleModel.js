"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var employeeModel_1 = require("../employee/employeeModel");
var weekScheduleSchema = new mongoose_1.Schema({
    startDate: Date,
    isOpenForAllocation: { type: Boolean, "default": true },
    scheduleRequirements: [{
            roleType: { type: String, "enum": ["Shift Manager", "Cashier", "Sales"] },
            numEmployeesRequired: { type: Number, "default": 1 }
        }],
    sunday: [{ type: mongoose_1.Schema.Types.ObjectId, ref: employeeModel_1["default"] }],
    monday: [{ type: mongoose_1.Schema.Types.ObjectId, ref: employeeModel_1["default"] }],
    tuesday: [{ type: mongoose_1.Schema.Types.ObjectId, ref: employeeModel_1["default"] }],
    wednesday: [{ type: mongoose_1.Schema.Types.ObjectId, ref: employeeModel_1["default"] }],
    thursday: [{ type: mongoose_1.Schema.Types.ObjectId, ref: employeeModel_1["default"] }],
    friday: [{ type: mongoose_1.Schema.Types.ObjectId, ref: employeeModel_1["default"] }],
    saturday: [{ type: mongoose_1.Schema.Types.ObjectId, ref: employeeModel_1["default"] }],
    table: String
});
var WeekScheduleModel = mongoose_1["default"].model("WeekSchedule", weekScheduleSchema);
exports["default"] = WeekScheduleModel;
