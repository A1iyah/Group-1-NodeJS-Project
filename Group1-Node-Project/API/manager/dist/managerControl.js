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
exports.getEmployeesList = exports.getSelectedSalaryBetween = exports.getSelectedSalaryDown = exports.getSelectedSalaryUp = exports.getSelectedManager = exports.addAttendance = void 0;
var managerModel_1 = require("./managerModel");
var dotenv = require("dotenv");
dotenv.config();
var secret = process.env.JWT_SECRET;
// const secret: string = "secret";
exports.addAttendance = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, user, totalTimeShift, updateUser, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, user = _a.user, totalTimeShift = _a.totalTimeShift;
                if (!totalTimeShift)
                    throw new Error("no shift time");
                if (!user)
                    throw new Error("no user");
                return [4 /*yield*/, managerModel_1["default"].findByIdAndUpdate(user._id, {
                        $push: {
                            attendance: {
                                date: new Date().toLocaleString(),
                                clock: totalTimeShift
                            }
                        }
                    }, { "new": true })];
            case 1:
                updateUser = _b.sent();
                res.send({ ok: true });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _b.sent();
                console.error(error_1);
                res.status(500).send({ error: error_1.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getSelectedManager = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idNumber, managerDB, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                idNumber = req.body.idNumber;
                if (!idNumber)
                    throw new Error("no id");
                return [4 /*yield*/, managerModel_1["default"].find({
                        idNumber: idNumber
                    })
                        .populate("role")
                        .populate({
                        path: "employees",
                        populate: {
                            path: "role",
                            model: "Role"
                        }
                    })
                        .exec()];
            case 1:
                managerDB = _a.sent();
                res.send({ managerDB: managerDB });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.error(error_2);
                res.status(500).send({ error: error_2.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getSelectedSalaryUp = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, salaryUp, _id, employees, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, salaryUp = _a.salaryUp, _id = _a._id;
                return [4 /*yield*/, managerModel_1["default"].findById(_id)
                        .populate({
                        path: "employees",
                        match: {
                            salaryPerHour: { $gt: salaryUp }
                        },
                        populate: {
                            path: "role",
                            model: "Role"
                        }
                    })
                        .exec()];
            case 1:
                employees = _b.sent();
                res.send({ employees: employees });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _b.sent();
                console.log(error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getSelectedSalaryDown = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, salaryDown, _id, employees, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, salaryDown = _a.salaryDown, _id = _a._id;
                return [4 /*yield*/, managerModel_1["default"].findById(_id)
                        .populate({
                        path: "employees",
                        match: {
                            salaryPerHour: { $lt: salaryDown }
                        },
                        populate: {
                            path: "role",
                            model: "Role"
                        }
                    })
                        .exec()];
            case 1:
                employees = _b.sent();
                res.send({ employees: employees });
                return [3 /*break*/, 3];
            case 2:
                error_4 = _b.sent();
                console.log(error_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getSelectedSalaryBetween = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, minSalary, maxSalary, _id, employees, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, minSalary = _a.minSalary, maxSalary = _a.maxSalary, _id = _a._id;
                return [4 /*yield*/, managerModel_1["default"].findById(_id)
                        .populate({
                        path: "employees",
                        match: {
                            salaryPerHour: { $gte: minSalary, $lte: maxSalary }
                        },
                        populate: {
                            path: "role",
                            model: "Role"
                        }
                    })
                        .exec()];
            case 1:
                employees = _b.sent();
                res.send({ employees: employees });
                return [3 /*break*/, 3];
            case 2:
                error_5 = _b.sent();
                console.log(error_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getEmployeesList = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, employees, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                _id = req.body._id;
                return [4 /*yield*/, managerModel_1["default"].findById(_id)
                        .populate({
                        path: "employees",
                        populate: {
                            path: "role",
                            model: "Role"
                        }
                    })
                        .exec()];
            case 1:
                employees = _a.sent();
                res.send({ employees: employees });
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                console.error(error_6);
                res.status(500).send({ error: error_6.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// export const addManager = async (req: any, res: any) => {
//   try {
//     let { name, email, password, idNumber, phone, birthday, salary, role } =
//       req.body;
//     if (role) {
//       const roleID = await RoleModel.find({ name: role }).select({ _id: 1 });
//       role = roleID[0]._id.toString();
//     }
//     const managerDB = await ManagerModel.create({
//       name,
//       email,
//       password,
//       idNumber,
//       phone,
//       birthday,
//       salary,
//       role,
//     });
//     console.log(managerDB);
//     res.status(200).send({ ok: true });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("did not get data");
//   }
// };
