import mongoose, { Schema } from "mongoose";

const adminSchema = new Schema({
  idNumber: Number,
  name: String,
  birthday: String,
  password: String,
  email: String,
  phone: Number,
  salaryPerHour: Number,
  employees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
  ],
});

export const AdminModel = mongoose.model("Admin", adminSchema);

export default AdminModel;
