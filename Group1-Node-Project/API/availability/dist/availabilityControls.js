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
exports.updateAvailability = void 0;
var availabilityModel_1 = require("./availabilityModel");
exports.updateAvailability = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, availabilityData, commentValue, userId, updateObject, _b, _c, _i, day, update, update, week, error_1;
    var _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _e.trys.push([0, 8, , 9]);
                console.log(req.body);
                _a = req.body, availabilityData = _a.availabilityData, commentValue = _a.commentValue, userId = _a.userId;
                // const userId = req.body;
                console.log(userId);
                updateObject = {};
                _b = [];
                for (_c in availabilityData)
                    _b.push(_c);
                _i = 0;
                _e.label = 1;
            case 1:
                if (!(_i < _b.length)) return [3 /*break*/, 4];
                day = _b[_i];
                if (!availabilityData[day]) return [3 /*break*/, 3];
                console.log(day);
                return [4 /*yield*/, availabilityModel_1.WeekModel.findByIdAndUpdate("64d38a0680e3dcb7fbd1a67b", { $push: (_d = {}, _d[day] = userId, _d) }, { "new": true })];
            case 2:
                update = _e.sent();
                _e.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4:
                if (!commentValue) return [3 /*break*/, 6];
                return [4 /*yield*/, availabilityModel_1.WeekModel.findByIdAndUpdate("64d38a0680e3dcb7fbd1a67b", {
                        $push: {
                            comment: {
                                user: userId,
                                comment: commentValue
                            }
                        }
                    }, { "new": true })];
            case 5:
                update = _e.sent();
                _e.label = 6;
            case 6: return [4 /*yield*/, availabilityModel_1.WeekModel.findById("64d38a0680e3dcb7fbd1a67b")];
            case 7:
                week = _e.sent();
                console.log(week);
                res.status(200).send("Availability updated successfully");
                return [3 /*break*/, 9];
            case 8:
                error_1 = _e.sent();
                console.error(error_1);
                res.status(500).send("Error updating availability");
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
// export const updateAvailability = async (req: any, res: any) => {
//   try {
//     console.log(req.body);
//     const { availabilityData, commentValue } = req.body;
//     const weekData: any = {
//       sunday: [],
//       monday: [],
//       tuesday: [],
//       wednesday: [],
//       thursday: [],
//       friday: [],
//       saturday: [],
//     };
//     // Loop through the days in availabilityData
//     for (const day in availabilityData) {
//       if (availabilityData[day]) {
//         weekData[day].push(_id);
//       }
//     }
//     // Add the comment
//     weekData.comment = [commentValue];
//     await WeekModel.findOneAndUpdate({ _id }, weekData, { upsert: true });
//     res.status(200).send("Availability updated successfully");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error updating availability");
//   }
// };
