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
exports.getMyTeam = exports.getManagerEmployees = exports.getAdminEmployees = exports.deleteManager = exports.deleteEmployee = exports.addManager = exports.addEmployee = void 0;
var adminModel_1 = require("../admin/adminModel");
var managerModel_1 = require("../manager/managerModel");
var employeeModel_1 = require("../employee/employeeModel");
var roleModel_1 = require("../role/roleModel");
var companyModel_1 = require("../company/companyModel");
exports.addEmployee = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, password, idNumber, phone, birthday, salaryPerHour, role, managerID, selectedRole, employeeDB, newUserId, managerIdString, newUserIdString, updateManager, updateAdmin, managerDB, companyDB, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 8, , 9]);
                _a = req.body, name = _a.name, email = _a.email, password = _a.password, idNumber = _a.idNumber, phone = _a.phone, birthday = _a.birthday, salaryPerHour = _a.salaryPerHour, role = _a.role, managerID = _a.managerID;
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
                return [4 /*yield*/, employeeModel_1["default"].find({ idNumber: idNumber }).select({
                        _id: 1
                    })];
            case 3:
                newUserId = _b.sent();
                managerIdString = managerID.toString();
                newUserIdString = newUserId[0]._id.toString();
                return [4 /*yield*/, managerModel_1["default"].findByIdAndUpdate(managerID, { $push: { employees: newUserId[0]._id } }, { "new": true })];
            case 4:
                updateManager = _b.sent();
                return [4 /*yield*/, adminModel_1["default"].findByIdAndUpdate("64de1def9cd3eed4fd4903e0", { $push: { employees: newUserId[0]._id } }, { "new": true })];
            case 5:
                updateAdmin = _b.sent();
                return [4 /*yield*/, managerModel_1["default"].findById(managerID)
                        .populate({
                        path: "employees",
                        populate: {
                            path: "role",
                            model: "Role"
                        }
                    })
                        .exec()];
            case 6:
                managerDB = _b.sent();
                return [4 /*yield*/, companyModel_1["default"].create({
                        originalID: newUserId[0]._id,
                        systemRole: "Employee",
                        email: email,
                        password: password
                    })];
            case 7:
                companyDB = _b.sent();
                res.status(200).send({ ok: true, managerDB: managerDB });
                return [3 /*break*/, 9];
            case 8:
                error_1 = _b.sent();
                console.log(error_1);
                res.status(500).send("did not get data");
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.addManager = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, password, idNumber, phone, birthday, salaryPerHour, managerRole, managerDB, updateAdmin, adminDB, companyDB, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 6, , 7]);
                _a = req.body, name = _a.name, email = _a.email, password = _a.password, idNumber = _a.idNumber, phone = _a.phone, birthday = _a.birthday, salaryPerHour = _a.salaryPerHour;
                return [4 /*yield*/, roleModel_1["default"].findOne({ name: "Manager" }).select("_id")];
            case 1:
                managerRole = _b.sent();
                if (!managerRole) {
                    throw new Error("Role not found");
                }
                return [4 /*yield*/, managerModel_1["default"].create({
                        name: name,
                        email: email,
                        password: password,
                        idNumber: idNumber,
                        phone: phone,
                        birthday: birthday,
                        salaryPerHour: salaryPerHour,
                        role: managerRole._id
                    })];
            case 2:
                managerDB = _b.sent();
                return [4 /*yield*/, adminModel_1["default"].findByIdAndUpdate("64de1def9cd3eed4fd4903e0", { $push: { managers: managerDB._id } }, { "new": true })];
            case 3:
                updateAdmin = _b.sent();
                return [4 /*yield*/, adminModel_1["default"].findById("64de1def9cd3eed4fd4903e0")
                        .populate({
                        path: "employees",
                        populate: {
                            path: "role",
                            model: "Role"
                        }
                    })
                        .populate({
                        path: "managers",
                        populate: {
                            path: "role",
                            model: "Role"
                        }
                    })
                        .exec()];
            case 4:
                adminDB = _b.sent();
                return [4 /*yield*/, companyModel_1["default"].create({
                        originalID: managerDB._id,
                        systemRole: "Manager",
                        email: email,
                        password: password
                    })];
            case 5:
                companyDB = _b.sent();
                res.status(200).send({ ok: true, adminDB: adminDB });
                return [3 /*break*/, 7];
            case 6:
                error_2 = _b.sent();
                console.log(error_2);
                res.status(500).send("did not get data");
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
// Delete employee -
exports.deleteEmployee = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, manager, admin, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                _id = req.body._id;
                if (!_id)
                    throw new Error("No employee ID found.");
                return [4 /*yield*/, employeeModel_1["default"].findByIdAndDelete(_id)];
            case 1:
                _a.sent();
                return [4 /*yield*/, managerModel_1["default"].findOneAndUpdate({ employees: _id }, { $pull: { employees: _id } }, { "new": true })];
            case 2:
                manager = _a.sent();
                return [4 /*yield*/, adminModel_1["default"].findOneAndUpdate({ employees: _id }, { $pull: { employees: _id } }, { "new": true })];
            case 3:
                admin = _a.sent();
                return [4 /*yield*/, companyModel_1["default"].findOneAndDelete({ originalID: _id })];
            case 4:
                _a.sent();
                res.send({ ok: true });
                return [3 /*break*/, 6];
            case 5:
                error_3 = _a.sent();
                console.log(error_3);
                res.status(500).json("Server delete employee error");
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
// DeleteManager
exports.deleteManager = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, admin, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                _id = req.body._id;
                if (!_id)
                    throw new Error("No employee ID found.");
                return [4 /*yield*/, managerModel_1["default"].findByIdAndDelete(_id)];
            case 1:
                _a.sent();
                return [4 /*yield*/, adminModel_1["default"].findOneAndUpdate({ managers: _id }, { $pull: { managers: _id } }, { "new": true })];
            case 2:
                admin = _a.sent();
                return [4 /*yield*/, companyModel_1["default"].findOneAndDelete({ originalID: _id })];
            case 3:
                _a.sent();
                res.send({ ok: true });
                return [3 /*break*/, 5];
            case 4:
                error_4 = _a.sent();
                console.log(error_4);
                res.status(500).json("Server delete employee error");
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
// Display all workers -
exports.getAdminEmployees = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, allWorkers, error_5;
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
                res.send({ allWorkers: allWorkers });
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                console.log(error_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getManagerEmployees = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, employees, error_6;
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
                res.send({ employees: employees });
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                console.log(error_6);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getMyTeam = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, stringID, manager, myTeamEmployees, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                _id = req.body._id;
                stringID = _id.toString();
                return [4 /*yield*/, managerModel_1["default"].findOne({
                        employees: _id
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
                manager = _a.sent();
                myTeamEmployees = manager === null || manager === void 0 ? void 0 : manager.employees;
                res.send({ myTeamEmployees: myTeamEmployees });
                return [3 /*break*/, 3];
            case 2:
                error_7 = _a.sent();
                console.log(error_7);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
