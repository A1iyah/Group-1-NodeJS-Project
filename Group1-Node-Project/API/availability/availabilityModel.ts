import mongoose, { Schema } from "mongoose";

const weekSchema = new Schema({
  sundayMorning: [],
  mondayMorning: [],
  tuesdayMorning: [],
  wednesdayMorning: [],
  thursdayMorning: [],
  fridayMorning: [],
  saturdayMorning: [],

  sundayEvening: [],
  mondayEvening: [],
  tuesdayEvening: [],
  wednesdayEvening: [],
  thursdayEvening: [],
  fridayEvening: [],
  saturdayEvening: [],

  comment: [],
});

export const WeekModel = mongoose.model("Week", weekSchema);

export default WeekModel;

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
