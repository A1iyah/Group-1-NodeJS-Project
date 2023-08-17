import express from "express";
import mongoose, { ObjectId, Schema } from "mongoose";
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

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

// import ManagerModel from "./API/manager/managerModel";

// const createManagers = async (
//   idNumber: number,
//   name: string,
//   birthday: string,
//   email: string,
//   password: string,
//   phone: number,
//   salaryPerHour: number,
//   attendance: [],
//   employees: [],
//   role: string
// ) => {
//   const manager = new ManagerModel({
//     idNumber,
//     name,
//     birthday,
//     email,
//     password,
//     phone,
//     salaryPerHour,
//     attendance,
//     employees,
//     role,
//   });

//   const result = await manager.save();
//   console.log(result);
// };
// createManagers(
//   261119551,
//   "Cathie Wood",
//   "1955-11-20",
//   "wood@gmail.com",
//   "123456",
//   502611195,
//   45,
//   [],
//   [],
//   "64db73fdbbea796bc4839626"
// );

// createManagers(
//   211119602,
//   "Tim Cook",
//   "1960-11-01",
//   "cook@gmail.com",
//   "123456",
//   502111960,
//   45,
//   [],
//   [],
//   "64db73fdbbea796bc4839626"
// );

// createManagers(
//   211119602,
//   "Steve Wozniak",
//   "1950-08-11",
//   "woz@gmail.com",
//   "123456",
//   501108195,
//   45,
//   [],
//   [],
//   "64db73fdbbea796bc4839626"
// );

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

// import EmployeeModel from "./API/employee/employeeModel";

// const createEmployees = async (
//   idNumber: number,
//   name: string,
//   birthday: string,
//   email: string,
//   password: string,
//   phone: number,
//   salaryPerHour: number,
//   role: string,
//   attendance: [],
//   shift: []
// ) => {
//   const employee = new EmployeeModel({
//     idNumber,
//     name,
//     birthday,
//     email,
//     password,
//     phone,
//     salaryPerHour,
//     attendance,
//     shift,
//     role,
//   });

//   const result = await employee.save();
//   console.log(result);
// };

/////////////////////////////////////////////////////

// Shift Managers =

// createEmployees(
//   207834700,
//   "Jim Bob",
//   "1991-08-07",
//   "bob@gmail.com",
//   "42424",
//   507708991,
//   30,
//   "64d77a1fb5ffd951c2685b60",
//   [],
//   []
// );

// createEmployees(
//   304516119,
//   "Mike Michele",
//   "1989-04-03",
//   "mike@gmail.com",
//   "42424",
//   503400985,
//   30,
//   "64d77a1fb5ffd951c2685b60",
//   [],
//   []
// );

// createEmployees(
//   208416268,
//   "Shay Adams",
//   "1996-04-20",
//   "shay@gmail.com",
//   "42424",
//   502041996,
//   30,
//   "64d77a1fb5ffd951c2685b60",
//   [],
//   []
// );

// createEmployees(
//   201985277,
//   "Kim James",
//   "1998-11-26",
//   "kim@gmail.com",
//   "42424",
//   502611988,
//   30,
//   "64d77a1fb5ffd951c2685b60",
//   [],
//   []
// );

// createEmployees(
//   302411996,
//   "Victoria Moore",
//   "1989-05-01",
//   "vic@gmail.com",
//   "42424",
//   501151989,
//   30,
//   "64d77a1fb5ffd951c2685b60",
//   [],
//   []
// );

// createEmployees(
//   301447511,
//   "Tom Brown",
//   "1988-07-01",
//   "tom@gmail.com",
//   "42424",
//   501171986,
//   30,
//   "64d77a1fb5ffd951c2685b60",
//   [],
//   []
// );

// createEmployees(
//   307411341,
//   "Oliver August",
//   "1992-04-30",
//   "oli@gmail.com",
//   "42424",
//   503400992,
//   30,
//   "64d77a1fb5ffd951c2685b60",
//   [],
//   []
// );

// createEmployees(
//   208841675,
//   "Beth Pine",
//   "1995-02-03",
//   "beth@gmail.com",
//   "42424",
//   503121995,
//   30,
//   "64d77a1fb5ffd951c2685b60",
//   [],
//   []
// );

// createEmployees(
//   202881665,
//   "Cory Jay",
//   "1997-02-09",
//   "cory@gmail.com",
//   "42424",
//   509921997,
//   30,
//   "64d77a1fb5ffd951c2685b60",
//   [],
//   []
// );

/////////////////////////////////////////////////////

// Sales =

// createEmployees(
//   204115732,
//   "Josh Bryan",
//   "1998-02-12",
//   "josh@gmail.com",
//   "25555",
//   501221198,
//   25,
//   "64d77a0e1e96d13a73507e34",
//   [],
//   []
// );

// createEmployees(
//   209221622,
//   "David Bill",
//   "1999-12-17",
//   "david@gmail.com",
//   "25555",
//   501712999,
//   25,
//   "64d77a0e1e96d13a73507e34",
//   [],
//   []
// );

// createEmployees(
//   309441176,
//   "Anna Salts",
//   "1990-10-10",
//   "anna@gmail.com",
//   "25555",
//   501194990,
//   25,
//   "64d77a0e1e96d13a73507e34",
//   [],
//   []
// );

// createEmployees(
//   2073311133,
//   "Jason James",
//   "2001-01-18",
//   "jason@gmail.com",
//   "25555",
//   502811200,
//   25,
//   "64d77a0e1e96d13a73507e34",
//   [],
//   []
// );

// createEmployees(
//   211733865,
//   "Jennifer Garcia",
//   "1997-03-12",
//   "jenn@gmail.com",
//   "25555",
//   501231997,
//   25,
//   "64d77a0e1e96d13a73507e34",
//   [],
//   []
// );

// createEmployees(
//   306642213,
//   "Jordan Butler",
//   "1993-06-20",
//   "jordan@gmail.com",
//   "25555",
//   502060993,
//   25,
//   "64d77a0e1e96d13a73507e34",
//   [],
//   []
// );

// createEmployees(
//   208444261,
//   "Veronica Jackson",
//   "1999-09-01",
//   "ver@gmail.com",
//   "25555",
//   501192299,
//   25,
//   "64d77a0e1e96d13a73507e34",
//   [],
//   []
// );

// createEmployees(
//   204551789,
//   "Luna Pitt",
//   "2001-02-22",
//   "luna@gmail.com",
//   "25555",
//   502221464,
//   25,
//   "64d77a0e1e96d13a73507e34",
//   [],
//   []
// );

// createEmployees(
//   309444177,
//   "Oscar Roy",
//   "1989-06-04",
//   "oscar@gmail.com",
//   "25555",
//   504461989,
//   25,
//   "64d77a0e1e96d13a73507e34",
//   [],
//   []
// );

/////////////////////////////////////////////////////

// Cashier =

// createEmployees(
//   204112341,
//   "Finn Hudson",
//   "1994-08-24",
//   "finn@gmail.com",
//   "111444",
//   502481994,
//   25,
//   "64d779ec5afdf23770fcf31a",
//   [],
//   []
// );

// createEmployees(
//   208244167,
//   "Lucy Fabre",
//   "1996-02-01",
//   "lucy@gmail.com",
//   "111444",
//   501121996,
//   25,
//   "64d779ec5afdf23770fcf31a",
//   [],
//   []
// );

// createEmployees(
//   207214777,
//   "Shelby Cor",
//   "1993-06-10",
//   "shelby@gmail.com",
//   "111444",
//   501060993,
//   25,
//   "64d779ec5afdf23770fcf31a",
//   [],
//   []
// );

// createEmployees(
//   204144144,
//   "Rachel Bear",
//   "1995-12-18",
//   "rachel@gmail.com",
//   "111444",
//   501812995,
//   25,
//   "64d779ec5afdf23770fcf31a",
//   [],
//   []
// );

// createEmployees(
//   208511233,
//   "Brady Weston",
//   "1992-05-05",
//   "brady@gmail.com",
//   "111444",
//   505551992,
//   25,
//   "64d779ec5afdf23770fcf31a",
//   [],
//   []
// );

// createEmployees(
//   204431656,
//   "Jane Porter",
//   "1996-02-14",
//   "jane@gmail.com",
//   "111444",
//   501402996,
//   25,
//   "64d779ec5afdf23770fcf31a",
//   [],
//   []
// );

// createEmployees(
//   208444321,
//   "Emma Berry",
//   "1999-10-09",
//   "emma@gmail.com",
//   "111444",
//   509912091,
//   25,
//   "64d779ec5afdf23770fcf31a",
//   [],
//   []
// );

// createEmployees(
//   205667199,
//   "Dan Brown",
//   "1996-01-14",
//   "dan@gmail.com",
//   "111444",
//   501419966,
//   25,
//   "64d779ec5afdf23770fcf31a",
//   [],
//   []
// );

// createEmployees(
//   208991673,
//   "Mason Jenner",
//   "1997-03-22",
//   "mason@gmail.com",
//   "111444",
//   502231997,
//   25,
//   "64d779ec5afdf23770fcf31a",
//   [],
//   []
// );

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

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

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

// import CompanyModel from "./API/company/companyModel";

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
//   "64dded12db5e7a61568764b3",
//   "Manager",
//   "cook@gmail.com",
//   "123456"
// );
// createCompanySchema(
//   "64dded12db5e7a61568764b2",
//   "Manager",
//   "wood@gmail.com",
//   "123456"
// );
// createCompanySchema(
//   "64dded12db5e7a61568764b4",
//   "Manager",
//   "woz@gmail.com",
//   "123456"
// );

// createCompanySchema(
//   "64ddf242d210794525ac5d16",
//   "Employee",
//   "mike@gmail.com",
//   "42424"
// );
// createCompanySchema(
//   "64ddf242d210794525ac5d18",
//   "Employee",
//   "kim@gmail.com",
//   "42424"
// );
// createCompanySchema(
//   "64ddf242d210794525ac5d19",
//   "Employee",
//   "vic@gmail.com",
//   "42424"
// );
// createCompanySchema(
//   "64ddf242d210794525ac5d1a",
//   "Employee",
//   "tom@gmail.com",
//   "42424"
// );
// createCompanySchema(
//   "64ddf242d210794525ac5d1b",
//   "Employee",
//   "oli@gmail.com",
//   "42424"
// );
// createCompanySchema(
//   "64ddf242d210794525ac5d1c",
//   "Employee",
//   "beth@gmail.com",
//   "42424"
// );

// createCompanySchema(
//   "64ddf242d210794525ac5d1d",
//   "Employee",
//   "cory@gmail.com",
//   "42424"
// );

// createCompanySchema(
//   "64ddf242d210794525ac5d1e",
//   "Employee",
//   "josh@gmail.com",
//   "25555"
// );

// createCompanySchema(
//   "64ddf242d210794525ac5d1f",
//   "Employee",
//   "david@gmail.com",
//   "25555"
// );

// createCompanySchema(
//   "64ddf242d210794525ac5d20",
//   "Employee",
//   "anna@gmail.com",
//   "25555"
// );

// createCompanySchema(
//   "64ddf242d210794525ac5d21",
//   "Employee",
//   "jason@gmail.com",
//   "25555"
// );

// createCompanySchema(
//   "64ddf242d210794525ac5d22",
//   "Employee",
//   "jenn@gmail.com",
//   "25555"
// );

// createCompanySchema(
//   "64ddf242d210794525ac5d15",
//   "Employee",
//   "bob@gmail.com",
//   "42424"
// );

// createCompanySchema(
//   "64ddf242d210794525ac5d24",
//   "Employee",
//   "ver@gmail.com",
//   "25555"
// );

// createCompanySchema(
//   "64ddf242d210794525ac5d25",
//   "Employee",
//   "luna@gmail.com",
//   "25555"
// );

// createCompanySchema(
//   "64ddf242d210794525ac5d26",
//   "Employee",
//   "oscar@gmail.com",
//   "25555"
// );

// createCompanySchema(
//   "64ddf242d210794525ac5d17",
//   "Employee",
//   "shay@gmail.com",
//   "42424"
// );

// createCompanySchema(
//   "64ddf242d210794525ac5d23",
//   "Employee",
//   "jordan@gmail.com",
//   "25555"
// );

// createCompanySchema(
//   "64ddf4b24e167baca959656c",
//   "Employee",
//   "finn@gmail.com",
//   "111444"
// );

// createCompanySchema(
//   "64ddf4b24e167baca959656f",
//   "Employee",
//   "rachel@gmail.com",
//   "111444"
// );

// createCompanySchema(
//   "64ddf4b24e167baca9596570",
//   "Employee",
//   "brady@gmail.com",
//   "111444"
// );

// createCompanySchema(
//   "64ddf4b24e167baca9596571",
//   "Employee",
//   "jane@gmail.com",
//   "111444"
// );

// createCompanySchema(
//   "64ddf4b24e167baca9596572",
//   "Employee",
//   "emma@gmail.com",
//   "111444"
// );

// createCompanySchema(
//   "64ddf4b24e167baca9596573",
//   "Employee",
//   "dan@gmail.com",
//   "111444"
// );

// createCompanySchema(
//   "64ddf4b24e167baca9596574",
//   "Employee",
//   "mason@gmail.com",
//   "111444"
// );

// createCompanySchema(
//   "64ddf4b24e167baca959656d",
//   "Employee",
//   "lucy@gmail.com",
//   "111444"
// );

// createCompanySchema(
//   "64ddf4b24e167baca959656e",
//   "Employee",
//   "shelby@gmail.com",
//   "111444"
// );

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

// import AdminModel from "./API/admin/adminModel";

// const createAdmin = async (
//   idNumber: number,
//   name: string,
//   birthday: string,
//   email: string,
//   password: string,
//   phone: number,
//   salaryPerHour: number,
//   employees: [],
//   managers: []
// ) => {
//   const admin = new AdminModel({
//     idNumber,
//     name,
//     birthday,
//     email,
//     password,
//     phone,
//     salaryPerHour,
//     employees,
//     managers,
//   });

//   const result = await admin.save();
//   console.log(result);
// };

// createAdmin(
//   207586263,
//   "Admin",
//   "1965-03-10",
//   "admin@gmail.com",
//   "5050",
//   508557231,
//   100,
//   [],
//   []
// );

// [
//   "64ddf242d210794525ac5d16",
//   "64ddf242d210794525ac5d18",
//   "64ddf242d210794525ac5d19",
//   "64ddf242d210794525ac5d1a",
//   "64ddf242d210794525ac5d1b",
//   "64ddf242d210794525ac5d1c",
//   "64ddf242d210794525ac5d1d",
//   "64ddf242d210794525ac5d1e",
//   "64ddf242d210794525ac5d1f",
//   "64ddf242d210794525ac5d20",
//   "64ddf242d210794525ac5d21",
//   "64ddf242d210794525ac5d22",
//   "64ddf242d210794525ac5d15",
//   "64ddf242d210794525ac5d24",
//   "64ddf242d210794525ac5d25",
//   "64ddf242d210794525ac5d26",
//   "64ddf242d210794525ac5d17",
//   "64ddf242d210794525ac5d23",
//   "64ddf4b24e167baca959656c",
//   "64ddf4b24e167baca959656f",
//   "64ddf4b24e167baca9596570",
//   "64ddf4b24e167baca9596571",
//   "64ddf4b24e167baca9596572",
//   "64ddf4b24e167baca9596573",
//   "64ddf4b24e167baca9596574",
//   "64ddf4b24e167baca959656d",
//   "64ddf4b24e167baca959656e",
// ],
// [
//   "64dded12db5e7a61568764b3",
//   "64dded12db5e7a61568764b2",
//   "64dded12db5e7a61568764b4",
// ]
