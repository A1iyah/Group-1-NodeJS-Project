import mongoose, { Schema } from "mongoose";

//Schema
const roleSchema = new Schema({ name: String, salaryPerHour: Number });

const daySchema = new Schema({
  date: new Date().getDate,
  entry: new Date().getTime,
  exit: new Date().getTime,
});

const UserSchema = new Schema({
  id: Number,
  name: String,
  password: String,
  email: String,
  phone: Number,
  birthday: Date,
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
  },
  dates: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Day",
    },
  ],
});

const companySchema = new Schema({
  name: String,
});

// create collection
const UserModel = mongoose.model("User", UserSchema);
const RoleModel = mongoose.model("Role", roleSchema);
const CompanyModel = mongoose.model("Company", companySchema);
const DayModel = mongoose.model("Day", daySchema);

export default UserModel;
