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
exports.getEmployeesByRoleType = exports.getSelectedEmployee = exports.addAttendance = void 0;
var employeeModel_1 = require("./employeeModel");
var roleModel_1 = require("../role/roleModel");
var dotenv = require("dotenv");
dotenv.config();
var secret = process.env.JWT_SECRET;
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
                return [4 /*yield*/, employeeModel_1["default"].findByIdAndUpdate(user._id, {
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
exports.getSelectedEmployee = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idNumber, employeeDB, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                idNumber = req.body.idNumber;
                if (!idNumber)
                    throw new Error("no id");
                return [4 /*yield*/, employeeModel_1["default"].find({
                        idNumber: idNumber
                    })
                        .populate("role")
                        .exec()];
            case 1:
                employeeDB = _a.sent();
                res.send({ employeeDB: employeeDB });
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
/** Receives a string of role type from client and returns data of the employees in that role. */
exports.getEmployeesByRoleType = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var roleType, roleTypeId, employees, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                roleType = req.body.roleType;
                if (!roleType)
                    throw new Error("no role type received from client.");
                return [4 /*yield*/, roleModel_1["default"].find({ name: roleType }).select("_id")];
            case 1:
                roleTypeId = _a.sent();
                return [4 /*yield*/, employeeModel_1["default"].find({ role: roleTypeId })];
            case 2:
                employees = _a.sent();
                res.status(200).send({ ok: true, employees: employees });
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                console.log(error_3);
                res.status(500).send("did not receive data from DB.");
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
