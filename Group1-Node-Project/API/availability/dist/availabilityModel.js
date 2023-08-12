"use strict";
exports.__esModule = true;
exports.WeekModel = void 0;
var mongoose_1 = require("mongoose");
//
var weekSchema = new mongoose_1.Schema({
    sundayMorning: [{
            employeeId: { type: mongoose_1.Schema.Types.ObjectId },
            role: String,
            comment: String
        }],
    mondayMorning: [{
            employeeId: { type: mongoose_1.Schema.Types.ObjectId },
            role: String,
            comment: String
        }],
    tuesdayMorning: [{
            employeeId: { type: mongoose_1.Schema.Types.ObjectId },
            role: String,
            comment: String
        }],
    wednesdayMorning: [{
            employeeId: { type: mongoose_1.Schema.Types.ObjectId },
            role: String,
            comment: String
        }],
    thursdayMorning: [{
            employeeId: { type: mongoose_1.Schema.Types.ObjectId },
            role: String,
            comment: String
        }],
    fridayMorning: [{
            employeeId: { type: mongoose_1.Schema.Types.ObjectId },
            role: String,
            comment: String
        }],
    saturdayMorning: [{
            employeeId: { type: mongoose_1.Schema.Types.ObjectId },
            role: String,
            comment: String
        }],
    comment: []
});
exports.WeekModel = mongoose_1["default"].model("Week", weekSchema);
exports["default"] = exports.WeekModel;
// const weekSchema = new Schema({
//   sundayMorning: [],
//   mondayMorning: [],
//   tuesdayMorning: [],
//   wednesdayMorning: [],
//   thursdayMorning: [],
//   fridayMorning: [],
//   saturdayMorning: [],
//   sundayEvening: [],
//   mondayEvening: [],
//   tuesdayEvening: [],
//   wednesdayEvening: [],
//   thursdayEvening: [],
//   fridayEvening: [],
//   saturdayEvening: [],
//   comment: [],
// });
// async function createWeekSchema(
//   sundayMorning: Array<string>,
//   mondayMorning: Array<string>,
//   tuesdayMorning: Array<string>,
//   wednesdayMorning: Array<string>,
//   thursdayMorning: Array<string>,
//   fridayMorning: Array<string>,
//   saturdayMorning: Array<string>,
//   sundayEvening: Array<string>,
//   mondayEvening: Array<string>,
//   tuesdayEvening: Array<string>,
//   wednesdayEvening: Array<string>,
//   thursdayEvening: Array<string>,
//   fridayEvening: Array<string>,
//   saturdayEvening: Array<string>,
//   comment: Array<string>
// ) {
//   const week = new WeekModel({
//     sundayMorning,
//     mondayMorning,
//     tuesdayMorning,
//     wednesdayMorning,
//     thursdayMorning,
//     fridayMorning,
//     saturdayMorning,
//     sundayEvening,
//     mondayEvening,
//     tuesdayEvening,
//     wednesdayEvening,
//     thursdayEvening,
//     fridayEvening,
//     saturdayEvening,
//     comment,
//   });
//   const result = await week.save();
//   console.log(result);
// }
// createWeekSchema([], [], [], [], [], [], [], [], [], [], [], [], [], [], []);
// const createBasicWeekSchema = async (
//   sundayMorning: Array<string>,
//   mondayMorning: Array<string>,
//   tuesdayMorning: Array<string>,
//   wednesdayMorning: Array<string>,
//   thursdayMorning: Array<string>,
//   fridayMorning: Array<string>,
//   saturdayMorning: Array<string>,
//   comment: Array<string>
// ) => {
//   const newWeek = new WeekModel({
//     sundayMorning,
//     mondayMorning,
//     tuesdayMorning,
//     wednesdayMorning,
//     thursdayMorning,
//     fridayMorning,
//     saturdayMorning,
//     comment,
//   });
//   const result = await newWeek.save();
//   console.log(result);
// };
// createBasicWeekSchema([], [], [], [], [], [], [], []);
// const newWeekSchema = new WeekModel({
// });
// newWeekSchema.save();
