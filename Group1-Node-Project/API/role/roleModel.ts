import mongoose, { Schema } from "mongoose";

const roleSchema = new Schema({
  name: String,
});

export const RoleModel = mongoose.model("Role", roleSchema);

export default RoleModel;
