import mongoose, { Schema } from "mongoose";

const weekSchema = new Schema({
  sunday: [String],
  monday: [String],
  tuesday: [String],
  wednesday: [String],
  thursday: [String],
  friday: [String],
  saturday: [String],

  comment: [String],
});

export const WeekModel = mongoose.model("Week", weekSchema);

export default WeekModel;
