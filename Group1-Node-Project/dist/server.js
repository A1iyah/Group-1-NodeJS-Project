"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var express_1 = require("express");
var mongoose_1 = require("mongoose");
var dotenv = require("dotenv");
var adminRoute_1 = require("./API/admin/adminRoute");
var availabilityRoute_1 = require("./API/availability/availabilityRoute");
var companyRoute_1 = require("./API/company/companyRoute");
var employeeRoute_1 = require("./API/employee/employeeRoute");
var managerRoute_1 = require("./API/manager/managerRoute");
var roleRoute_1 = require("./API/role/roleRoute");
var scheduleRoute_1 = require("./API/schedule/scheduleRoute");
var employeesPageRoute_1 = require("./API/employees-page/employeesPageRoute");
var cookiesRoute_1 = require("./API/cookies/cookiesRoute");
var cookie_parser_1 = require("cookie-parser");
dotenv.config();
var uri = process.env.MONGOOSE_URI + "Node-Team-Project";
if (uri) {
    mongoose_1["default"]
        .connect(uri)
        .then(function () { return console.log("DB connected"); })["catch"](function (err) { return console.log("DB error :", err); });
}
else {
    console.log("No URI");
}
var app = express_1["default"]();
app.use(express_1["default"].json());
app.use(cookie_parser_1["default"]());
// static file
app.use(express_1["default"].static("./client"));
app.use("/api/admin/", adminRoute_1["default"]);
app.use("/api/company/", companyRoute_1["default"]);
app.use("/api/employee/", employeeRoute_1["default"]);
app.use("/api/manager/", managerRoute_1["default"]);
app.use("/api/role/", roleRoute_1["default"]);
app.use("/api/availability/", availabilityRoute_1["default"]);
app.use("/api/schedule/", scheduleRoute_1["default"]);
app.use("/api/employees-page", employeesPageRoute_1["default"]);
app.use("/api/cookies", cookiesRoute_1["default"]);
app.listen(3000, function () {
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
var adminModel_1 = require("./API/admin/adminModel");
var createAdmin = function (idNumber, name, birthday, email, password, phone, salaryPerHour, employees, managers) { return __awaiter(void 0, void 0, void 0, function () {
    var admin, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                admin = new adminModel_1["default"]({
                    idNumber: idNumber,
                    name: name,
                    birthday: birthday,
                    email: email,
                    password: password,
                    phone: phone,
                    salaryPerHour: salaryPerHour,
                    employees: employees,
                    managers: managers
                });
                return [4 /*yield*/, admin.save()];
            case 1:
                result = _a.sent();
                console.log(result);
                return [2 /*return*/];
        }
    });
}); };
createAdmin(207586263, "Admin", "1965-03-10", "admin@gmail.com", "5050", 508557231, 100, [], []);
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
