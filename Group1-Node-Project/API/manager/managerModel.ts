import mongoose, { Schema } from "mongoose";

// const managerSchema = new Schema({
//   idNumber: Number,
//   name: String,
//   birthday: String,
//   password: String,
//   email: String,
//   phone: Number,
//   salaryPerHour: Number,
//   attendance: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Attendance",
//     },
//   ],
//   employees: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Employee",
//     },
//   ],
// });

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

  // availability: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Week",
  // },
});

export const ManagerModel = mongoose.model("Manager", managerSchema);

export default ManagerModel;
