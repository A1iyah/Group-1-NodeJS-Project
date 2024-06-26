import mongoose, { Schema } from "mongoose";

const managerSchema = new Schema({
  idNumber: Number,
  name: String,
  birthday: String,
  password: String,
  email: String,
  phone: Number,
  salaryPerHour: Number,
  attendance: [],
  employees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
  ],
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
  },
});

export const ManagerModel = mongoose.model("Manager", managerSchema);

export default ManagerModel;
