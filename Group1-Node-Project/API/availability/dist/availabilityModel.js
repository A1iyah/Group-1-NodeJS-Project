"use strict";
exports.__esModule = true;
exports.WeekModel = exports.DayModel = void 0;
var mongoose_1 = require("mongoose");
var daySchema = new mongoose_1["default"].Schema({
    employeeId: String,
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
    // comment: [],
});
exports.DayModel = mongoose_1["default"].model("Day", daySchema);
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
//   sundayMorning: [{}],
//    mondayMorning: [{}],
//    tuesdayMorning: [{}],
//    wednesdayMorning: [{}],
//    thursdayMorning: [{}],
//    fridayMorning: [{}],
//    saturdayMorning: [{}],
// });
// newWeekSchema.save();
// const newWeekSchema = new WeekModel();
// newWeekSchema.save();
// saturdayMorning: [{
//   employeeId: {type: Schema.Types.ObjectId},
//   role: String,
//   comment: String
// }],
