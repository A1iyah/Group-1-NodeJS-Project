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
exports.getMyTeam = exports.getManagerEmployees = exports.getAdminWorkers = exports.addManager = exports.addEmployee = void 0;
var adminModel_1 = require("../admin/adminModel");
var managerModel_1 = require("../manager/managerModel");
var employeeModel_1 = require("../employee/employeeModel");
var roleModel_1 = require("../role/roleModel");
exports.addEmployee = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, password, idNumber, phone, birthday, salaryPerHour, role, selectedRole, employeeDB, updateManager, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, name = _a.name, email = _a.email, password = _a.password, idNumber = _a.idNumber, phone = _a.phone, birthday = _a.birthday, salaryPerHour = _a.salaryPerHour, role = _a.role;
                return [4 /*yield*/, roleModel_1["default"].findOne({ name: role }).select("_id")];
            case 1:
                selectedRole = _b.sent();
                if (!selectedRole) {
                    throw new Error("Role not found");
                }
                return [4 /*yield*/, employeeModel_1["default"].create({
                        name: name,
                        email: email,
                        password: password,
                        idNumber: idNumber,
                        phone: phone,
                        birthday: birthday,
                        salaryPerHour: salaryPerHour,
                        role: selectedRole._id
                    })];
            case 2:
                employeeDB = _b.sent();
                console.log(employeeDB);
                return [4 /*yield*/, managerModel_1["default"].findByIdAndUpdate()];
            case 3:
                updateManager = _b.sent();
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
    var _a, name, email, password, idNumber, phone, birthday, salaryPerHour, role, roleID, managerDB, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, name = _a.name, email = _a.email, password = _a.password, idNumber = _a.idNumber, phone = _a.phone, birthday = _a.birthday, salaryPerHour = _a.salaryPerHour, role = _a.role;
                if (!role) return [3 /*break*/, 2];
                return [4 /*yield*/, roleModel_1["default"].find({ name: role }).select({ _id: 1 })];
            case 1:
                roleID = _b.sent();
                role = roleID[0]._id.toString();
                _b.label = 2;
            case 2: return [4 /*yield*/, managerModel_1["default"].create({
                    name: name,
                    email: email,
                    password: password,
                    idNumber: idNumber,
                    phone: phone,
                    birthday: birthday,
                    salaryPerHour: salaryPerHour,
                    role: role
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
exports.getAdminWorkers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, allWorkers, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                _id = req.body._id;
                return [4 /*yield*/, adminModel_1["default"].findById(_id)
                        .populate({
                        path: "managers",
                        populate: {
                            path: "role",
                            model: "Role"
                        }
                    })
                        .populate({
                        path: "employees",
                        populate: {
                            path: "role",
                            model: "Role"
                        }
                    })
                        .exec()];
            case 1:
                allWorkers = _a.sent();
                console.log(allWorkers);
                res.send({ allWorkers: allWorkers });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.log(error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getManagerEmployees = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, employees, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                _id = req.body._id;
                return [4 /*yield*/, managerModel_1["default"].findById(_id).populate({
                        path: "employees",
                        populate: { path: "role", model: "Role" }
                    })];
            case 1:
                employees = _a.sent();
                if (employees)
                    console.log(employees.employees);
                res.send({ employees: employees });
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                console.log(error_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getMyTeam = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, employee, managerId, teamEmployees, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                _id = req.body._id;
                return [4 /*yield*/, employeeModel_1["default"].findById(_id)];
            case 1:
                employee = _a.sent();
                if (!employee) {
                    throw new Error("Employee not found");
                }
                managerId = employee.manager;
                if (!managerId) {
                    throw new Error("Employee does not have a manager");
                }
                return [4 /*yield*/, employeeModel_1["default"].find({
                        manager: managerId
                    }).populate("role")];
            case 2:
                teamEmployees = _a.sent();
                res.send({ employees: teamEmployees });
                return [3 /*break*/, 4];
            case 3:
                error_5 = _a.sent();
                console.log(error_5);
                res.status(500).send({ error: "Internal Server Error" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
