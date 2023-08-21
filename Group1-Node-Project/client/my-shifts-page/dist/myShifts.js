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
//import { DateUnit } from "mongoose";
var navBarElement = document.querySelector(".nav-bar");
var navBarElem = document.querySelector(".nav-bar");
var runningClock = document.querySelector(".running-clock");
var user;
var userType;
var allCompanyEmployeesInRole = [];
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var data, totalTimeShift, startTimeString, currentTime;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loadActiveUser()];
                case 1:
                    data = _a.sent();
                    user = data.user;
                    userType = data.userType;
                    renderNavBar(navBarElem, userType, user);
                    totalTimeShift = localStorage.getItem("totalTimeShift");
                    if (totalTimeShift) {
                        runningClock.innerHTML = totalTimeShift;
                        startTimeString = localStorage.getItem("startTime");
                        startTime1 = parseInt(startTimeString);
                        currentTime = Date.now();
                        updateClock();
                    }
                    renderTable();
                    return [2 /*return*/];
            }
        });
    });
}
main();
function continueUpdateElapsedTime() {
    var currentTime = Date.now();
    var elapsedTime = currentTime - startTime1;
    var hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    var minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    var formattedTime = String(hours).padStart(2, "0") + ":" + String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
    runningClock.innerHTML = formattedTime;
    totalTimeShift = formattedTime;
    localStorage.setItem("totalTimeShift", formattedTime);
}
function updateClock() {
    intervalId = setInterval(continueUpdateElapsedTime, 1000);
}
var renderTable = function () {
    try {
        fetch("/api/schedule/get-next-week-schedule", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(function (res) { return res.json(); })
            .then(function (data) {
            //renderShiftsTable(data.nextWeekSchedule[0]);
            var shiftsTableElem = document.querySelector(".shift-panel");
            shiftsTableElem.innerHTML = data.nextWeekSchedule[0]["table"];
            markUserInTable(data.nextWeekSchedule[0]["table"]);
            removePluses(data.nextWeekSchedule[0]["table"]);
        });
    }
    catch (error) {
        console.error(error);
    }
};
var markUserInTable = function (tableHtml) {
    var markString = "shifts-panel__role-row__employee-box--marked";
    var markedCells = document.querySelectorAll("." + markString);
    if (markedCells) {
        markedCells.forEach(function (cell) {
            cell.classList.remove(markString);
        });
    }
    var allAllocationNamesElem = document.querySelectorAll(".shifts-panel__role-row__allocation-name");
    allAllocationNamesElem.forEach(function (allocatedNameElem) {
        var _a;
        if (allocatedNameElem.innerHTML === user["name"]) {
            (_a = allocatedNameElem.parentElement) === null || _a === void 0 ? void 0 : _a.classList.add(markString);
        }
    });
};
var removePluses = function (tableHtml) {
    var allPlusElem = document.querySelectorAll(".shifts-panel__role-row__plus");
    allPlusElem.forEach(function (plusParagraph) {
        plusParagraph.parentElement.innerHTML = "<p class=\"shifts-panel__role-row__unassigned-cell\">Unassigned</p>";
    });
};
