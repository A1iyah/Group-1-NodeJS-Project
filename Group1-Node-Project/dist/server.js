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
var companyRoute_1 = require("./API/companyRoute");
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
app.use("/api/", companyRoute_1["default"]);
var roleSchema = new mongoose_1.Schema({ name: String });
var attendanceSchema = new mongoose_1.Schema({
    date: Date,
    entry: Date,
    exit: Date
});
var employeeSchema = new mongoose_1.Schema({
    idNumber: Number,
    name: String,
    birthday: Date,
    password: String,
    email: String,
    phone: Number,
    salaryPerHour: Number,
    role: {
        type: mongoose_1["default"].Schema.Types.ObjectId,
        ref: "Role"
    },
    attendance: [
        {
            type: mongoose_1["default"].Schema.Types.ObjectId,
            ref: "Attendance"
        },
    ]
});
var managerSchema = new mongoose_1.Schema({
    idNumber: Number,
    name: String,
    birthday: Date,
    password: String,
    email: String,
    phone: Number,
    salaryPerHour: Number,
    attendance: [
        {
            type: mongoose_1["default"].Schema.Types.ObjectId,
            ref: "Attendance"
        },
    ],
    employees: [
        {
            type: mongoose_1["default"].Schema.Types.ObjectId,
            ref: "Employee"
        },
    ]
});
var adminSchema = new mongoose_1.Schema({
    idNumber: Number,
    name: String,
    birthday: Date,
    password: String,
    email: String,
    phone: Number,
    salaryPerHour: Number,
    employees: [
        {
            type: mongoose_1["default"].Schema.Types.ObjectId,
            ref: "Employee"
        },
    ]
});
var companySchema = new mongoose_1.Schema({
    name: String
});
// create collection
var RoleModel = mongoose_1["default"].model("Role", roleSchema);
var EmployeeModel = mongoose_1["default"].model("Employee", employeeSchema);
var ManagerModel = mongoose_1["default"].model("Manager", managerSchema);
var AdminModel = mongoose_1["default"].model("Admin", adminSchema);
var CompanyModel = mongoose_1["default"].model("Company", companySchema);
var AttendanceModel = mongoose_1["default"].model("Attendance", attendanceSchema);
function createAdmin(idNumber, name, birthday, password, email, phone, salaryPerHour) {
    return __awaiter(this, void 0, void 0, function () {
        var admin, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    admin = new AdminModel({
                        idNumber: idNumber,
                        name: name,
                        birthday: birthday,
                        password: password,
                        email: email,
                        phone: phone,
                        salaryPerHour: salaryPerHour
                    });
                    return [4 /*yield*/, admin.save()];
                case 1:
                    result = _a.sent();
                    console.log(result);
                    return [2 /*return*/];
            }
        });
    });
}
createAdmin(123456789, "admin", new Date("1985-02-10"), "123", "admin@gmail.com", 972506254875, 50);
app.listen(3000, function () {
    console.log("server listen on port 3000");
});
