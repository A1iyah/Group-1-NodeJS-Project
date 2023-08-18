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
                        console.log(startTime1);
                        currentTime = Date.now();
                        console.log(currentTime);
                    }
                    handleShiftsDisplay();
                    return [2 /*return*/];
            }
        });
    });
}
main();
function continueUpdateElapsedTime() {
    var currentTime = Date.now();
    console.log(currentTime);
    var elapsedTime = currentTime - startTime1;
    console.log(elapsedTime);
    var hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    var minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    var formattedTime = String(hours).padStart(2, "0") + ":" + String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
    runningClock.innerHTML = formattedTime;
    totalTimeShift = formattedTime;
    console.log(totalTimeShift);
    localStorage.setItem("totalTimeShift", formattedTime);
}
function updateClock() {
    intervalId = setInterval(continueUpdateElapsedTime, 1000);
}
var handleShiftsDisplay = function () {
    console.log("handling shift dis");
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
            console.log("data: ", data.nextWeekSchedule[0]);
            renderShiftsTable(data.nextWeekSchedule[0]);
        });
    }
    catch (error) {
        console.error(error);
    }
};
var renderShiftsTable = function (nextWeekSchedule) {
    var shiftsTable = document.querySelector(".shift-table");
    shiftsTable.innerHTML = "<thead class=\"shift-table__header-container\">\n  <tr class=\"shift-table__header-container\">\n      <th></th>\n      " + weekHeadersHtml(nextWeekSchedule["startDate"]) + "\n  </tr>\n  </thead>\n  <tbody class=\"shift-table__body-container\">\n  " + rolesAndAllocationHtml(nextWeekSchedule) + "\n  </tbody>\n  ";
};
/** Returns the html for the table weekdays headers */
var weekHeadersHtml = function (startDate) {
    var weekDatesArr = getScheduleDates(startDate);
    var html = weekDatesArr.map(function (day) {
        return "<th><p>" + day.toLocaleDateString('en-Us', { weekday: 'short' }) + ".</p>\n            <p>" + day.getDate() + "." + day.getMonth() + "</p>\n            </th>";
    }).join("");
    return html;
};
/** Returns an array of dates of the a whole week.
 * @receives a date
 * @returns an array of Date of a week, starting from the date received
 */
var getScheduleDates = function (startDate) {
    var weekDatesArr = [];
    var nextSunday = new Date(startDate);
    var today = new Date();
    for (var i = 0; i < 7; i++) {
        var newDate = new Date(today.setDate(nextSunday.getDate() + i));
        weekDatesArr.push(newDate);
    }
    return weekDatesArr;
};
/** Returns the html of the roles and allocation of employees during the week */
var rolesAndAllocationHtml = function (nextWeekSchedule) {
    var scheduleRequirementsArrLenght = nextWeekSchedule["scheduleRequirements"].length;
    var htmlArr = [];
    var resultHtml = "";
    var _loop_1 = function (i) {
        var tableRowStartHtml = "<tr class=\"shift-table__roles-row\">\n    <td class=\"shift-table__role-row__role\">Shift Manager</td>";
        var tableRowCloseHtml = "</tbody>";
        htmlArr.push(tableRowStartHtml);
        var roleCountRequirement = nextWeekSchedule["scheduleRequirements"][i]["numEmployeesRequired"];
        // Performs rendering of the role row if employees of that role are required in the schedule
        if (roleCountRequirement > 0) {
            try {
                fetch("/api/employee/get-employees-by-role-type", {
                    method: "SEARCH",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        roleType: nextWeekSchedule["scheduleRequirements"][i].roleType
                    })
                })
                    .then(function (res) { return res.json(); })
                    .then(function (data) {
                    //let allCompanyEmployeesInRole = data["employees"];
                    allCompanyEmployeesInRole = data["employees"];
                    for (var roleCount = 0; roleCount < roleCountRequirement; roleCount++) {
                        var html = singleRoleColumnHtml(nextWeekSchedule["scheduleRequirements"][i].roleType, roleCount, nextWeekSchedule);
                        htmlArr.push(html);
                    }
                    htmlArr.push(tableRowCloseHtml);
                });
            }
            catch (error) {
                console.error(error);
            }
        }
        else {
            htmlArr.push(tableRowCloseHtml);
        }
    };
    // Loops on each role type requirement to render it
    for (var i = 0; i < scheduleRequirementsArrLenght; i++) {
        _loop_1(i);
    }
    return resultHtml.concat.apply(resultHtml, htmlArr);
};
var singleRoleColumnHtml = function (roleType, roleCount, nextWeekSchedule) {
    var rowHtmlArr = [];
    var resultHtml = "";
    rowHtmlArr.push("<td class=\"shift-table__role-row__role\">" + roleType + "</td>");
    //console.log("allCompanyEmployeesInRole: ", allCompanyEmployeesInRole);
    //console.log("nextWeekSchedule: ", nextWeekSchedule);
    for (var dayIndex = 0; dayIndex < 7; dayIndex++) {
        //console.log(convertWeekdayIndexToWeekdayName(String(dayIndex)));
        //console.log("test: ", nextWeekSchedule[convertWeekdayIndexToWeekdayName(dayIndex)]);
        console.log(nextWeekSchedule);
        //console.log(nextWeekSchedule[${convertWeekdayIndexToWeekdayName(String(dayIndex))}`]);
        var html = nextWeekSchedule["" + convertWeekdayIndexToWeekdayName(String(dayIndex))].map(function (dayScheduleEmployees) {
            //console.log("dayScheduleEmployees: ", dayScheduleEmployees);
        });
    }
    rowHtmlArr.push("</tr>");
    return resultHtml.concat.apply(resultHtml, rowHtmlArr);
};
/** Receives an index number from 0 to 6 and returns the name of the week day as string */
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
