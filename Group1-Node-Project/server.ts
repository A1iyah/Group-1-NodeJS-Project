import express from "express";
import mongoose, { Schema } from "mongoose";
import * as dotenv from "dotenv";
import adminRoute from "./API/admin/adminRoute";
import attendanceRoute from "./API/attendance/attendanceRoute";
import availabilityRoute from "./API/availability/availabilityRoute";
import companyRoute from "./API/company/companyRoute";
import employeeRoute from "./API/employee/employeeRoute";
import managerRoute from "./API/manager/managerRoute";
import roleRoute from "./API/role/roleRoute";
import cookieParser from "cookie-parser";

dotenv.config();

const uri: string | undefined = process.env.MONGOOSE_URI + "Node-Team-Project";

if (uri) {
  mongoose
    .connect(uri)
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("DB error :", err));
} else {
  console.log("No URI");
}

const app = express();
app.use(express.json());
app.use(cookieParser());

// static file
app.use(express.static("./client"));

app.use("/api/admin/", adminRoute);
app.use("/api/attendance/", attendanceRoute);
app.use("/api/company/", companyRoute);
app.use("/api/employee/", employeeRoute);
app.use("/api/manager/", managerRoute);
app.use("/api/role/", roleRoute);

// Availability -
app.use(availabilityRoute);
//

app.listen(3000, () => {
  console.log("server listen on port 3000");
});

// const roleSchema = new Schema({ name: String });

// const attendanceSchema = new Schema({
//   date: Date,
//   entry: Date,
//   exit: Date,
// });

// const employeeSchema = new Schema({
//   idNumber: Number,
//   name: String,
//   birthday: String,
//   password: String,
//   email: String,
//   phone: Number,
//   salaryPerHour: Number,
//   role: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Role",
//   },
//   attendance: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Attendance",
//     },
//   ],
// });

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

// const adminSchema = new Schema({
//   idNumber: Number,
//   name: String,
//   birthday: String,
//   password: String,
//   email: String,
//   phone: Number,
//   salaryPerHour: Number,
//   employees: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Employee",
//     },
//   ],
// });

// const companySchema = new Schema({
//   name: String,
// });

// // create collection
// const RoleModel = mongoose.model("Role", roleSchema);
// const EmployeeModel = mongoose.model("Employee", employeeSchema);
// const ManagerModel = mongoose.model("Manager", managerSchema);
// const AdminModel = mongoose.model("Admin", adminSchema);
// const CompanyModel = mongoose.model("Company", companySchema);
// const AttendanceModel = mongoose.model("Attendance", attendanceSchema);

// async function createEmployee(
//   idNumber: number,
//   name: string,
//   birthday: string,
//   password: string,
//   email: string,
//   phone: number,
//   salaryPerHour: number
// ) {
//   const employee = new ManagerModel({
//     idNumber,
//     name,
//     birthday,
//     password,
//     email,
//     phone,
//     salaryPerHour,
//   });
//   const result = await employee.save();
//   console.log(result);
// }

// createEmployee(
//   222222222,
//   "manager1",
//   new Date("1989-12-27").toLocaleDateString(),
//   "159",
//   "manager1@gmail.com",
//   97250642851,
//   35
// );
