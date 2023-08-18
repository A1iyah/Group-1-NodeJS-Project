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
exports.getCommentByEmployeeIdAndWeekday = exports.getEmployeesByRoleAndWeekday = exports.getAllAvailableWeeks = exports.getAllAvailableEmployees = exports.updateAvailability = void 0;
var moment_1 = require("moment");
var availabilityModel_1 = require("./availabilityModel");
var roleString;
exports.updateAvailability = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var weekData, _a, availabilityData, commentValue, userId, role, name, updateObject, _b, _c, _i, day, update, _d, sunday, saturday, error_1;
    var _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                _f.trys.push([0, 6, , 7]);
                return [4 /*yield*/, availabilityModel_1.WeekModel.find({})];
            case 1:
                weekData = _f.sent();
                if (!weekData)
                    throw new Error("no week found in DB");
                _a = req.body, availabilityData = _a.availabilityData, commentValue = _a.commentValue, userId = _a.userId, role = _a.role, name = _a.name;
                console.log(availabilityData, commentValue, userId, role, name);
                updateObject = {};
                _b = [];
                for (_c in availabilityData)
                    _b.push(_c);
                _i = 0;
                _f.label = 2;
            case 2:
                if (!(_i < _b.length)) return [3 /*break*/, 5];
                day = _b[_i];
                if (!availabilityData[day]) return [3 /*break*/, 4];
                return [4 /*yield*/, availabilityModel_1.WeekModel.findByIdAndUpdate("64dfb738d323ba64e4bd030e", { $push: (_e = {}, _e[day] = {
                            employeeId: userId,
                            name: name,
                            role: role.userRole,
                            comment: commentValue
                        }, _e) })];
            case 3:
                update = _f.sent();
                _f.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5:
                _d = getCurrentWeekDates(), sunday = _d.sunday, saturday = _d.saturday;
                res.status(200).json({
                    message: "Availability updated successfully",
                    weekDates: {
                        sunday: sunday.format("D.M"),
                        saturday: saturday.format("D.M")
                    }
                });
                return [3 /*break*/, 7];
            case 6:
                error_1 = _f.sent();
                console.error(error_1);
                res.status(500).send("Error updating availability");
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
// Get date -
function getCurrentWeekDates() {
    var today = moment_1["default"]();
    var sunday = today.clone().startOf("week").add(0, "days");
    var saturday = today.clone().startOf("week").add(6, "days");
    return { sunday: sunday, saturday: saturday };
}
exports.getAllAvailableEmployees = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var weekDays, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, availabilityModel_1.WeekModel.find({})];
            case 1:
                weekDays = _a.sent();
                res.status(200).send({ ok: true, weekDays: weekDays });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.log(error_2);
                res.status(500).send("Did not get data.");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllAvailableWeeks = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
        }
        catch (error) {
            console.log(error);
            res.status(500).send("Did not get data.");
        }
        return [2 /*return*/];
    });
}); };
exports.getEmployeesByRoleAndWeekday = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var day, _a, role, weekday, employees, error_3, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                day = "";
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                _a = req.body, role = _a.role, weekday = _a.weekday;
                if (weekday === 0)
                    day = "sundayMorning";
                if (weekday === 1)
                    day = "mondayMorning";
                if (weekday === 2)
                    day = "tuesdayMorning";
                if (weekday === 3)
                    day = "wednesdayMorning";
                if (weekday === 4)
                    day = "thursdayMorning";
                if (weekday === 5)
                    day = "fridayMorning";
                if (weekday === 6)
                    day = "saturdayMorning";
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                return [4 /*yield*/, availabilityModel_1.WeekModel.find({}).select(day)];
            case 3:
                employees = _b.sent();
                res.status(200).send({ ok: true, employees: employees });
                return [3 /*break*/, 5];
            case 4:
                error_3 = _b.sent();
                console.log(error_3);
                return [3 /*break*/, 5];
            case 5: return [3 /*break*/, 7];
            case 6:
                error_4 = _b.sent();
                res.status(500).send("Did not find data");
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.getCommentByEmployeeIdAndWeekday = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var day, _a, employeeId, weekdayIndex, dayDB, error_5, error_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                day = "";
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                _a = req.body, employeeId = _a.employeeId, weekdayIndex = _a.weekdayIndex;
                if (weekdayIndex === "0")
                    day = "sundayMorning";
                if (weekdayIndex === "1")
                    day = "mondayMorning";
                if (weekdayIndex === "2")
                    day = "tuesdayMorning";
                if (weekdayIndex === "3")
                    day = "wednesdayMorning";
                if (weekdayIndex === "4")
                    day = "thursdayMorning";
                if (weekdayIndex === "5")
                    day = "fridayMorning";
                if (weekdayIndex === "6")
                    day = "saturdayMorning";
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                return [4 /*yield*/, availabilityModel_1.WeekModel.findOne({}).select(day)];
            case 3:
                dayDB = _b.sent();
                if (!dayDB)
                    throw new Error("no day found on DB");
                res.status(200).send({ ok: true, dayDB: dayDB });
                return [3 /*break*/, 5];
            case 4:
                error_5 = _b.sent();
                console.log(error_5);
                return [3 /*break*/, 5];
            case 5: return [3 /*break*/, 7];
            case 6:
                error_6 = _b.sent();
                res.status(500).send("Did not find data");
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
