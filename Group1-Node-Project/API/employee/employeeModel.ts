import mongoose, { Schema } from "mongoose";

const employeeSchema = new Schema({
  idNumber: Number,
  name: String,
  birthday: Date,
  password: String,
  email: String,
  phone: Number,
  salaryPerHour: Number,
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
  },
  attendance: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Attendance",
    },
  ],
});

export const EmployeeModel = mongoose.model("Employee", employeeSchema);

export default EmployeeModel;
