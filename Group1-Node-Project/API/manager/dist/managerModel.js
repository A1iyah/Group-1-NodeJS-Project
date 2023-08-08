"use strict";
exports.__esModule = true;
exports.ManagerModel = void 0;
var mongoose_1 = require("mongoose");
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
    availability: {
        type: mongoose_1["default"].Schema.Types.ObjectId,
        ref: "Week"
    }
});
exports.ManagerModel = mongoose_1["default"].model("Manager", managerSchema);
exports["default"] = exports.ManagerModel;
