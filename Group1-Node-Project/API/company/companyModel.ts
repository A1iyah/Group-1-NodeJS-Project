import mongoose, { Schema } from "mongoose";
import EmployeeModel from "../employee/employeeModel";

const companySchema = new Schema({
  originalID: String,
  systemRole: String,
  email: String,
  password: String,
});

export const CompanyModel = mongoose.model("company", companySchema);

export default CompanyModel;
