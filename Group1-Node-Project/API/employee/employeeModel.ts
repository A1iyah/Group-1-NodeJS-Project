import mongoose, { Schema } from "mongoose";

const employeeSchema = new Schema({
  idNumber: Number,
  name: String,
  birthday: String,
  password: String,
  email: String,
  phone: Number,
  salaryPerHour: Number,
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
  },
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Manager",
  },
  attendance: [],
  shift: [],
});

export const EmployeeModel = mongoose.model("Employee", employeeSchema);

export default EmployeeModel;
