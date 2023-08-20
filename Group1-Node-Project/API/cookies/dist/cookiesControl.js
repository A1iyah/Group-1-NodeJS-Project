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
exports.getUser = exports.login = void 0;
var managerModel_1 = require("../manager/managerModel");
var employeeModel_1 = require("../employee/employeeModel");
var companyModel_1 = require("../company/companyModel");
var adminModel_1 = require("../admin/adminModel");
var dotenv = require("dotenv");
dotenv.config();
var jwt_simple_1 = require("jwt-simple");
var secret = process.env.JWT_SECRET;
var userType;
var user;
var UserType;
(function (UserType) {
    UserType[UserType["Admin"] = 0] = "Admin";
    UserType[UserType["Manager"] = 1] = "Manager";
    UserType[UserType["Employee"] = 2] = "Employee";
})(UserType || (UserType = {}));
exports.login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, systemRole, userDB, roleUser, token, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, email = _a.email, password = _a.password, systemRole = _a.systemRole;
                return [4 /*yield*/, companyModel_1["default"].findOne({ email: email, password: password, systemRole: systemRole })];
            case 1:
                userDB = _b.sent();
                if (!userDB)
                    throw new Error("email or password are incorrect");
                if (!secret)
                    throw new Error("no token");
                roleUser = void 0;
                if (userDB.systemRole === "Admin") {
                    roleUser = "Admin";
                }
                else if (userDB.systemRole === "Manager") {
                    roleUser = "Manager";
                }
                else if (userDB.systemRole === "Employee") {
                    roleUser = "Employee";
                }
                else
                    throw new Error("role not found");
                token = jwt_simple_1["default"].encode({ userId: userDB.originalID, role: roleUser }, secret);
                console.log(token);
                res.cookie("user", token, { maxAge: 500000000, httpOnly: true });
                res.status(201).send({ ok: true });
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
exports.getUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user_1, decoded, userId, role, userDB, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 8, , 9]);
                user_1 = req.cookies.user;
                console.log(user_1);
                if (!user_1) {
                    res.status(500).send({ message: "you are not a user" });
                }
                if (!secret)
                    throw new Error("no token");
                decoded = jwt_simple_1["default"].decode(user_1, secret);
                userId = decoded.userId, role = decoded.role;
                console.log(userId, role);
                userDB = void 0;
                if (!(role === "Admin")) return [3 /*break*/, 2];
                return [4 /*yield*/, adminModel_1["default"].findById(userId)];
            case 1:
                userDB = _a.sent();
                userType = UserType.Admin;
                return [3 /*break*/, 7];
            case 2:
                if (!(role === "Manager")) return [3 /*break*/, 4];
                return [4 /*yield*/, managerModel_1["default"].findById(userId)];
            case 3:
                userDB = _a.sent();
                userType = UserType.Manager;
                return [3 /*break*/, 7];
            case 4:
                if (!(role === "Employee")) return [3 /*break*/, 6];
                return [4 /*yield*/, employeeModel_1["default"].findById(userId)];
            case 5:
                userDB = _a.sent();
                userType = UserType.Employee;
                return [3 /*break*/, 7];
            case 6: throw new Error("role not found");
            case 7:
                console.log(userDB);
                res.send({ ok: true, user: userDB, userType: userType });
                return [3 /*break*/, 9];
            case 8:
                error_2 = _a.sent();
                console.error(error_2);
                res.status(500).send({ error: error_2.message });
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
