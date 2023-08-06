import mongoose, { Schema } from "mongoose";

const adminSchema = new Schema({
    idNumber: Number,
    name: String,
    password: String,
    email: String,
    phone: Number,
    employees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
      },
    ],
  });

export const AdminModel = mongoose.model("Admin", adminSchema);

export default AdminModel;
