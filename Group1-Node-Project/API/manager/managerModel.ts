import mongoose, { Schema } from "mongoose";

const managerSchema = new Schema({
    idNumber: Number,
    name: String,
    birthday: Date,
    password: String,
    email: String,
    phone: Number,
    salaryPerHour: Number,
    attendance: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Attendance",
      },
    ],
    employees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
      },
    ],
  });

export const ManagerModel = mongoose.model("Manager", managerSchema);

export default ManagerModel;

