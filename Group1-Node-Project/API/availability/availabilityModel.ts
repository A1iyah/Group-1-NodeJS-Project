import mongoose, { Schema } from "mongoose";

const weekSchema = new Schema({
  sunday: [],
  monday: [],
  tuesday: [],
  wednesday: [],
  thursday: [],
  friday: [],
  saturday: [],

  comment: [],
});

export const WeekModel = mongoose.model("Week", weekSchema);

export default WeekModel;
