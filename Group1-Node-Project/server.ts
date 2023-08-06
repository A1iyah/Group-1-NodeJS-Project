import express from "express";
import mongoose, { Schema } from "mongoose";
import * as dotenv from "dotenv";
import companyRoute from "./API/companyRoute";
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

app.use("/api/", companyRoute);

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

async function createAdmin(
  idNumber: number,
  name: string,
  birthday: Date,
  password: string,
  email: string,
  phone: number,
  salaryPerHour: number
) {
  const admin = new AdminModel({
    idNumber,
    name,
    birthday,
    password,
    email,
    phone,
    salaryPerHour,
  });
  const result = await admin.save();
  console.log(result);
}

createAdmin(
  123456789,
  "admin",
  new Date("1985-02-10"),
  "123",
  "admin@gmail.com",
  972506254875,
  50
);

app.listen(3000, () => {
  console.log("server listen on port 3000");
});
