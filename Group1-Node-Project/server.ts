import express from "express";
import mongoose, { Schema } from "mongoose";
import * as dotenv from "dotenv";
import adminRoute from "./API/admin/adminRoute";
import availabilityRoute from "./API/availability/availabilityRoute";
import companyRoute from "./API/company/companyRoute";
import employeeRoute from "./API/employee/employeeRoute";
import managerRoute from "./API/manager/managerRoute";
import roleRoute from "./API/role/roleRoute";
import weekScheduleRouter from "./API/schedule/scheduleRoute";
import employeesPageRoute from "./API/employees-page/employeesPageRoute";
import cookieRoute from "./API/cookies/cookiesRoute";
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
app.use("/api/company/", companyRoute);
app.use("/api/employee/", employeeRoute);
app.use("/api/manager/", managerRoute);
app.use("/api/role/", roleRoute);
app.use("/api/availability/", availabilityRoute);
app.use("/api/schedule/", weekScheduleRouter);
app.use("/api/employees-page", employeesPageRoute);
app.use("/api/cookies", cookieRoute);

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

// createEmployee(
//   222222222,
//   "manager1",
//   new Date("1989-12-27").toLocaleDateString(),
//   "159",
//   "manager1@gmail.com",
//   97250642851,
//   35
// );

// const weekSchema = new Schema({
//   sundayMorning: [],
//   mondayMorning: [],
//   tuesdayMorning: [],
//   wednesdayMorning: [],
//   thursdayMorning: [],
//   fridayMorning: [],
//   saturdayMorning: [],

//   sundayEvening: [],
//   mondayEvening: [],
//   tuesdayEvening: [],
//   wednesdayEvening: [],
//   thursdayEvening: [],
//   fridayEvening: [],
//   saturdayEvening: [],

//   comment: [],
// });

// export const WeekModel = mongoose.model("Week", weekSchema);

// const companySchema = new Schema({
//   originalID: String,
//   systemRole: String,
//   email: String,
//   password: String,
// });

// export const CompanyModel = mongoose.model("company", companySchema);

// const createCompanySchema = async (
//   originalID: string,
//   systemRole: string,
//   email: string,
//   password: string
// ) => {
//   const company = new CompanyModel({ originalID, systemRole, email, password });

//   const result = await company.save();
//   console.log(result);
// };
// createCompanySchema(
//   "64d50e911e5749a59f1f4a6f",
//   "Admin",
//   "admin@gmail.com",
//   "123"
// );
// createCompanySchema(
//   "64d084c6c1730d8967d8195d",
//   "Manager",
//   "manager1@gmail.com",
//   "159"
// );
// createCompanySchema(
//   "64d0851b50545a819228cd45",
//   "Manager",
//   "manager2@gmail.com",
//   "222"
// );
// createCompanySchema(
//   "64d084fe50545a819228cd44",
//   "Manager",
//   "manager3@gmail.com",
//   "666"
// );
// createCompanySchema(
//   "64d083c69e5feea8ea4d3287",
//   "Employee",
//   "omry@gmail.com",
//   "666"
// );
// createCompanySchema(
//   "64d0876650545a819228cd4b",
//   "Employee",
//   "oshrat@gmail.com",
//   "246"
// );
// createCompanySchema(
//   "64d087a550545a819228cd51",
//   "Employee",
//   "shiran@gmail.com",
//   "789456"
// );
// createCompanySchema(
//   "64d087db50545a819228cd52",
//   "Employee",
//   "mor@gmail.com",
//   "12787"
// );
// createCompanySchema(
//   "64d0880450545a819228cd53",
//   "Employee",
//   "linoy@gmail.com",
//   "10292"
// );
// createCompanySchema(
//   "64d0883450545a819228cd56",
//   "Employee",
//   "keren@gmail.com",
//   "101084"
// );
