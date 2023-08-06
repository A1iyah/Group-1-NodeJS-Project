import express from "express";
import mongoose, { Schema } from "mongoose";
import * as dotenv from "dotenv";
import adminRoute from "./API/admin/adminRoute";
import attendanceRoute from "./API/attendance/attendanceRoute";
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

const roleSchema = new Schema({ name: String });

const attendanceSchema = new Schema({
  date: Date,
  entry: Date,
  exit: Date,
});

const employeeSchema = new Schema({
  idNumber: Number,
  name: String,
  birthday: Date,
  password: String,
  email: String,
  phone: Number,
  salaryPerHour: Number,
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
  },
  attendance: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Attendance",
    },
  ],
});

const managerSchema = new Schema({
  idNumber: Number,
  name: String,
  birthday: Date,
  password: String,
  email: String,
  phone: Number,
  salaryPerHour: Number,
  attendance: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Attendance",
    },
  ],
  employees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
  ],
});

const adminSchema = new Schema({
  idNumber: Number,
  name: String,
  birthday: Date,
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

const companySchema = new Schema({
  name: String,
});

// create collection
const RoleModel = mongoose.model("Role", roleSchema);
const EmployeeModel = mongoose.model("Employee", employeeSchema);
const ManagerModel = mongoose.model("Manager", managerSchema);
const AdminModel = mongoose.model("Admin", adminSchema);
const CompanyModel = mongoose.model("Company", companySchema);
const AttendanceModel = mongoose.model("Attendance", attendanceSchema);

// async function createManager(
//   idNumber: number,
//   name: string,
//   birthday: Date,
//   password: string,
//   email: string,
//   phone: number,
//   salaryPerHour: number
// ) {
//   const manager = new ManagerModel({
//     idNumber,
//     name,
//     birthday,
//     password,
//     email,
//     phone,
//     salaryPerHour,
//   });
//   const result = await manager.save();
//   console.log(result);
// }

// createManager(
//   444444444,
//   "manager3",
//   new Date("1985-12-01"),
//   "666",
//   "manager3@gmail.com",
//   97254143562,
//   40
// );

app.listen(3000, () => {
  console.log("server listen on port 3000");
});
