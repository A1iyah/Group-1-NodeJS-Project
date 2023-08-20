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
exports.getManagersList = exports.getEmployeesList = exports.getSelectedSalaryBetween = exports.getSelectedSalaryDown = exports.getSelectedSalaryUp = void 0;
var adminModel_1 = require("./adminModel");
var dotenv = require("dotenv");
dotenv.config();
var secret = process.env.JWT_SECRET;
// const secret: string = "secret";
// export const login = async (req: any, res: any) => {
//   try {
//     const { email, password } = req.body;
//     console.log(email, password);
//     const adminDB = await AdminModel.findOne({ email, password });
//     if (!adminDB) throw new Error("Username or password are incorrect");
//     if (!secret) throw new Error("no token");
//     const token = jwt.encode({ adminId: adminDB._id, role: "admin" }, secret);
//     console.log(token);
//     res.cookie("admin", token, { maxAge: 500000000, httpOnly: true });
//     res.status(201).send({ ok: true });
//   } catch (error: any) {
//     console.error(error);
//     res.status(500).send({ error: error.message });
//   }
// };
// export const getAdmin = async (req: any, res: any) => {
//   try {
//     const { admin } = req.cookies;
//     if (!secret) throw new Error("no token");
//     const decoded = jwt.decode(admin, secret);
//     console.log(decoded);
//     const { adminId, role } = decoded;
//     const adminDB: any = await AdminModel.findById(adminId);
//     res.send({ ok: true, admin: adminDB });
//   } catch (error: any) {
//     console.error(error);
//     res.status(500).send({ error: error.message });
//   }
// };
exports.getSelectedSalaryUp = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, salaryUp, _id, employees, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, salaryUp = _a.salaryUp, _id = _a._id;
                return [4 /*yield*/, adminModel_1["default"].findById(_id)
                        .populate({
                        path: "managers",
                        match: {
                            salaryPerHour: { $gt: salaryUp }
                        },
                        populate: {
                            path: "role",
                            model: "Role"
                        }
                    })
                        .populate({
                        path: "employees",
                        match: {
                            salaryPerHour: { $gt: salaryUp }
                        },
                        populate: {
                            path: "role",
                            model: "Role"
                        }
                    })];
            case 1:
                employees = _b.sent();
                res.send({ employees: employees });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _b.sent();
                console.log(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getSelectedSalaryDown = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, salaryDown, _id, employees, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, salaryDown = _a.salaryDown, _id = _a._id;
                return [4 /*yield*/, adminModel_1["default"].findById(_id)
                        .populate({
                        path: "managers",
                        match: {
                            salaryPerHour: { $lt: salaryDown }
                        },
                        populate: {
                            path: "role",
                            model: "Role"
                        }
                    })
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
                error_2 = _b.sent();
                console.log(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getSelectedSalaryBetween = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, minSalary, maxSalary, _id, employees, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, minSalary = _a.minSalary, maxSalary = _a.maxSalary, _id = _a._id;
                return [4 /*yield*/, adminModel_1["default"].findById(_id)
                        .populate({
                        path: "managers",
                        match: {
                            salaryPerHour: { $gte: minSalary, $lte: maxSalary }
                        },
                        populate: {
                            path: "role",
                            model: "Role"
                        }
                    })
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
                error_3 = _b.sent();
                console.log(error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getEmployeesList = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var employees, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, adminModel_1["default"].findById("64de1def9cd3eed4fd4903e0")
                        .populate("employees")
                        .exec()];
            case 1:
                employees = _a.sent();
                res.send({ employees: employees });
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                console.error(error_4);
                res.status(500).send({ error: error_4.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getManagersList = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var managers, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, adminModel_1["default"].findById("64de1def9cd3eed4fd4903e0")
                        .populate("managers")
                        .exec()];
            case 1:
                managers = _a.sent();
                res.send({ managers: managers });
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                console.error(error_5);
                res.status(500).send({ error: error_5.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
