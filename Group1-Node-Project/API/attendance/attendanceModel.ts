import mongoose, { Schema } from "mongoose";

const attendanceSchema = new Schema({
    date: new Date().getDate,
    entry: new Date().getTime,
    exit: new Date().getTime,
  });
  
export const AttendanceModel = mongoose.model("Attendance", attendanceSchema);

export default AttendanceModel;
