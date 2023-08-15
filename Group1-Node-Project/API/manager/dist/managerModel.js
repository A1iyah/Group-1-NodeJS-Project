"use strict";
exports.__esModule = true;
exports.ManagerModel = void 0;
var mongoose_1 = require("mongoose");
var managerSchema = new mongoose_1.Schema({
    idNumber: Number,
    name: String,
    birthday: String,
    password: String,
    email: String,
    phone: Number,
    salaryPerHour: Number,
    attendance: [],
    employees: [
        {
            type: mongoose_1["default"].Schema.Types.ObjectId,
            ref: "Employee"
        },
    ],
    role: [
        {
            type: mongoose_1["default"].Schema.Types.ObjectId,
            ref: "Role"
        },
    ]
});
exports.ManagerModel = mongoose_1["default"].model("Manager", managerSchema);
exports["default"] = exports.ManagerModel;
