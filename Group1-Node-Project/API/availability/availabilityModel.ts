import mongoose, { Schema } from "mongoose";

const weekSchema = new Schema({
  sunday: Boolean
  monday: Boolean
  tuesday: Boolean,
  wednesday: Boolean,
  thursday: Boolean,
  friday: Boolean,
  saturday: Boolean,

  comment: String,
});

export const WeekModel = mongoose.model("Week", weekSchema);

export default WeekModel;
