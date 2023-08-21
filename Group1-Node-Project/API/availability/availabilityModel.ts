import mongoose, { Schema } from "mongoose";
import EmployeeModel from "../employee/employeeModel";
import RoleModel from "../role/roleModel";

const daySchema = new mongoose.Schema({
  employeeId: String,
  name: String,
  role: String,
  comment: String,
});

//
const weekSchema = new Schema({
  sundayMorning: [daySchema],
  mondayMorning: [daySchema],
  tuesdayMorning: [daySchema],
  wednesdayMorning: [daySchema],
  thursdayMorning: [daySchema],
  fridayMorning: [daySchema],
  saturdayMorning: [daySchema],

  // comment: [],
});

export const DayModel = mongoose.model("Day", daySchema);
export const WeekModel = mongoose.model("Week", weekSchema);

export default WeekModel;
