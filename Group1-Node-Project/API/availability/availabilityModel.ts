import mongoose, { Schema } from "mongoose";

const weekSchema = new Schema({
  Sunday: [],
  Monday: [],
  Tuesday: [],
  Wednesday: [],
  Thursday: [],
  Friday: [],
  Saturday: [],

  comment: [],
});

export const WeekModel = mongoose.model("Week", weekSchema);

export default WeekModel;
