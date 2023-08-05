import mongoose, { Schema } from "mongoose";

//Schema
const roleSchema = new Schema({ name: String, salaryPerHour: Number });

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
});

const companySchema = new Schema({
  name: String,
});

// create collection
const UserModel = mongoose.model("User", UserSchema);
const RoleModel = mongoose.model("Role", roleSchema);
const CompanyModel = mongoose.model("Company", companySchema);

export default UserModel;
