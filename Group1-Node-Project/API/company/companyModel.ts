import mongoose, { Schema } from "mongoose";

const companySchema = new Schema({
    name: String,
  });

export const CompanyModel = mongoose.model("Company", companySchema);

export default CompanyModel;
