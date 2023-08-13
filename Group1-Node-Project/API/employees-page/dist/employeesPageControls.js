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
exports.displayWorkers = exports.addManager = exports.addEmployee = void 0;
var managerModel_1 = require("../manager/managerModel");
var employeeModel_1 = require("../employee/employeeModel");
var roleModel_1 = require("../role/roleModel");
exports.addEmployee = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, password, idNumber, phone, birthday, salaryPerHour, role, roleID, employeeDB, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, name = _a.name, email = _a.email, password = _a.password, idNumber = _a.idNumber, phone = _a.phone, birthday = _a.birthday, salaryPerHour = _a.salaryPerHour, role = _a.role;
                if (!role) return [3 /*break*/, 2];
                return [4 /*yield*/, roleModel_1["default"].find({ name: role })];
            case 1:
                roleID = _b.sent();
                _b.label = 2;
            case 2: return [4 /*yield*/, employeeModel_1["default"].create({
                    name: name,
                    email: email,
                    password: password,
                    idNumber: idNumber,
                    phone: phone,
                    birthday: birthday,
                    salaryPerHour: salaryPerHour,
                    roleID: role.name
                })];
            case 3:
                employeeDB = _b.sent();
                console.log(employeeDB);
                res.status(200).send({ ok: true, employeeDB: employeeDB });
                return [3 /*break*/, 5];
            case 4:
                error_1 = _b.sent();
                console.log(error_1);
                res.status(500).send("did not get data");
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.addManager = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, nameM, emailM, passwordM, idNumberM, phoneM, birthdayM, salaryM, roleM, roleID, managerDB, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, nameM = _a.nameM, emailM = _a.emailM, passwordM = _a.passwordM, idNumberM = _a.idNumberM, phoneM = _a.phoneM, birthdayM = _a.birthdayM, salaryM = _a.salaryM, roleM = _a.roleM;
                if (!roleM) return [3 /*break*/, 2];
                return [4 /*yield*/, roleModel_1["default"].find({ name: roleM }).select({ _id: 1 })];
            case 1:
                roleID = _b.sent();
                roleM = roleID[0]._id.toString();
                _b.label = 2;
            case 2: return [4 /*yield*/, managerModel_1["default"].create({
                    nameM: nameM,
                    emailM: emailM,
                    passwordM: passwordM,
                    idNumberM: idNumberM,
                    phoneM: phoneM,
                    birthdayM: birthdayM,
                    salaryM: salaryM,
                    roleM: roleM
                })];
            case 3:
                managerDB = _b.sent();
                console.log(managerDB);
                res.status(200).send({ ok: true, managerDB: managerDB });
                return [3 /*break*/, 5];
            case 4:
                error_2 = _b.sent();
                console.log(error_2);
                res.status(500).send("did not get data");
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
// Display all workers -
exports.displayWorkers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _id, role, query, roleObj, employees, employeesRole, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                _a = req.body, _id = _a._id, role = _a.role;
                query = {};
                if (!role) return [3 /*break*/, 2];
                return [4 /*yield*/, roleModel_1["default"].findOne({ name: role })];
            case 1:
                roleObj = _b.sent();
                if (!roleObj) {
                    console.log("Role " + roleObj + " not found");
                }
                query = { role: roleObj._id };
                _b.label = 2;
            case 2: return [4 /*yield*/, managerModel_1["default"].findById(_id).populate("employees")];
            case 3:
                employees = _b.sent();
                if (employees)
                    console.log(employees.employees);
                return [4 /*yield*/, employeeModel_1["default"].find(query).populate("role", "name")];
            case 4:
                employeesRole = _b.sent();
                res.send({ employees: employees, employeesRole: employeesRole });
                return [3 /*break*/, 6];
            case 5:
                error_3 = _b.sent();
                console.log(error_3);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
