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
var userType;
var UserType;
(function (UserType) {
    UserType[UserType["Admin"] = 0] = "Admin";
    UserType[UserType["Manager"] = 1] = "Manager";
    UserType[UserType["Employee"] = 2] = "Employee";
})(UserType || (UserType = {}));
function getActiveUser() {
    return __awaiter(this, void 0, void 0, function () {
        var responseManager, dataManager, manager, responseAdmin, dataAdmin, adminDB, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, fetch("/api/manager/get-manager")];
                case 1:
                    responseManager = _a.sent();
                    return [4 /*yield*/, responseManager.json()];
                case 2:
                    dataManager = _a.sent();
                    manager = dataManager.manager;
                    console.log("dataManager: ", dataManager);
                    console.log("user: ", manager);
                    if (dataManager.ok === true && manager._id !== null) {
                        userType = UserType.Manager;
                        console.log("userType: ", userType);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, fetch("/api/admin/get-admin")];
                case 3:
                    responseAdmin = _a.sent();
                    return [4 /*yield*/, responseAdmin.json()];
                case 4:
                    dataAdmin = _a.sent();
                    adminDB = dataAdmin.adminDB;
                    console.log("user: ", adminDB);
                    if (dataAdmin.ok === true && adminDB._id !== null) {
                        userType = UserType.Admin;
                        console.log("userType: ", userType);
                        return [2 /*return*/];
                    }
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
var renderNavBar = function (navBarElem) {
    console.log(navBarElem);
    console.log("i am: ", userType);
    console.log("types: ", UserType.Employee);
    switch (userType) {
        case UserType.Admin:
            break;
        case UserType.Manager:
            console.log("switch on manager");
            var navBarHtml = "<div class=\"nav-bar__links-group\">\n            <p class=\"nav-bar__link\" onclick=\"gotoPage('../start-end-shift/employeeManager-HP.html')\">Start / End Shift</p>\n            <p class=\"nav-bar__link nav-bar__link--bold\">Shift Schedule</p>\n            <p class=\"nav-bar__link\">Availability</p>\n            <p class=\"nav-bar__link\">Employees</p>\n            <p class=\"nav-bar__link\">Reports</p>\n            </div>\n            <p class=\"nav-bar__user-name\">John Wick</p>";
            navBarElem.innerHTML = navBarHtml;
            break;
        case UserType.Employee:
            break;
    }
};
var gotoPage = function (targetPage) {
    window.location.href = targetPage;
};
