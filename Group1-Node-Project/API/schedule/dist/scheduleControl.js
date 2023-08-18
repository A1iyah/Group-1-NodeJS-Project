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
exports.getNextWeekSchedule = exports.addEmployeeToSchedule = exports.createNewWeekForScheduling = exports.getAllWeekSchedules = exports.createNewWeekSchedule = void 0;
var scheduleModel_1 = require("./scheduleModel");
var employeeModel_1 = require("../employee/employeeModel");
exports.createNewWeekSchedule = function () { return __awaiter(void 0, void 0, void 0, function () {
    var weekSchedule, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                weekSchedule = new scheduleModel_1["default"]();
                return [4 /*yield*/, weekSchedule.save()];
            case 1:
                result = _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.getAllWeekSchedules = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var weekSchedules, error_1, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, scheduleModel_1["default"].find({})];
            case 2:
                weekSchedules = _a.sent();
                if (!weekSchedules)
                    throw new Error("No week schedules found in DB.");
                res.status(200).send({ ok: true, weekSchedules: weekSchedules });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.log(error_1);
                return [3 /*break*/, 4];
            case 4: return [3 /*break*/, 6];
            case 5:
                error_2 = _a.sent();
                console.log(error_2);
                res.status(500).send("Did not get week schedules data.");
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.createNewWeekForScheduling = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, nextSunday, cashierCount, salesCount, weekSchedule, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, nextSunday = _a.nextSunday, cashierCount = _a.cashierCount, salesCount = _a.salesCount;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, scheduleModel_1["default"].create({
                        startDate: getNextSunday(),
                        scheduleRequirements: [{
                                roleType: "Shift Manager",
                                numEmployeesRequired: 1
                            },
                            {
                                roleType: "Cashier",
                                numEmployeesRequired: cashierCount
                            },
                            {
                                roleType: "Sales",
                                numEmployeesRequired: salesCount
                            }]
                    })];
            case 2:
                weekSchedule = _b.sent();
                res.status(200).send({ ok: true, weekSchedule: weekSchedule });
                return [3 /*break*/, 4];
            case 3:
                error_3 = _b.sent();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var getNextSunday = function () {
    var todayDate = new Date();
    var date = new Date(todayDate.getFullYear(), todayDate.getMonth(), (todayDate.getDate() - todayDate.getDay()) + 7);
    return date;
};
exports.addEmployeeToSchedule = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, thisScheduleId, employeeId, weekdayIndex, weekdayName, employeeIdObj, updateObject, targetSchedule, error_4;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 3, , 4]);
                _a = req.body, thisScheduleId = _a.thisScheduleId, employeeId = _a.employeeId, weekdayIndex = _a.weekdayIndex;
                if (!thisScheduleId || !employeeId || !weekdayIndex)
                    throw new Error("did not receive all data from client");
                weekdayName = convertWeekdayIndexToWeekdayName(weekdayIndex);
                return [4 /*yield*/, employeeModel_1["default"].findById(employeeId)];
            case 1:
                employeeIdObj = _c.sent();
                updateObject = {
                    $push: (_b = {},
                        _b[weekdayName] = employeeIdObj === null || employeeIdObj === void 0 ? void 0 : employeeIdObj._id,
                        _b)
                };
                return [4 /*yield*/, scheduleModel_1["default"].findByIdAndUpdate(thisScheduleId, updateObject, { "new": true })];
            case 2:
                targetSchedule = _c.sent();
                res.status(200).send({ ok: true });
                return [3 /*break*/, 4];
            case 3:
                error_4 = _c.sent();
                console.log(error_4);
                res.status(500).send("Did not get data");
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var convertWeekdayIndexToWeekdayName = function (weekdayIndex) {
    switch (weekdayIndex) {
        case "0":
            return "sunday";
            break;
        case "1":
            return "monday";
            break;
        case "2":
            return "tuesday";
            break;
        case "3":
            return "wednesday";
            break;
        case "4":
            return "thursday";
            break;
        case "5":
            return "friday";
            break;
        case "6":
            return "saturday";
            break;
        default:
            return "";
    }
};
exports.getNextWeekSchedule = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var nextSundayDate, nextWeekSchedule, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                nextSundayDate = getNextSunday();
                return [4 /*yield*/, scheduleModel_1["default"].find({ startDate: nextSundayDate }).sort({ _id: -1 }).limit(1)];
            case 1:
                nextWeekSchedule = _a.sent();
                res.status(200).send({ ok: true, nextWeekSchedule: nextWeekSchedule });
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                console.log("did not receive data from DB");
                res.status(500).send("Did not get data");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
