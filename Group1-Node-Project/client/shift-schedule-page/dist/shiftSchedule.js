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
var _this = this;
var navBarElem = document.querySelector(".nav-bar");
var runningClock = document.querySelector(".running-clock");
var weekDays;
var nextSunday;
var nextSaturday;
var startTime1;
var intervalIdNew = null;
var targetedDayIndex;
var targetedRoleType;
var targetedRoleCount;
var user;
var userType;
var thisScheduleId;
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
                    displayWeekScheduleConfig();
                    renderAllAvailableEmployees();
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
/** Renders the form to create a new week */
var displayWeekScheduleConfig = function () {
    var newScheduleFormElem = document.querySelector(".new-schedule-form");
    nextSunday = getNextSundayDate(new Date());
    nextSaturday = getNextSaturdayDate(new Date());
    newScheduleFormElem.innerHTML = "\n      <form onsubmit=\"createNewWeekSchedule(event)\">\n        <label for=\"startDate\" class=\"new-schedule-form__label\">Schedule start date:</label>\n        <input type=\"text\" class=\"new-schedule-form__date\" name=\"startDate\" value='" + nextSunday.toDateString() + "' readonly>\n        <label for=\"endDate\" class=\"new-schedule-form__label\">Schedule end date:</label>\n        <input type=\"text\" class=\"new-schedule-form__date\" name=\"endDate\" value='" + nextSaturday.toDateString() + "' readonly>\n        <p class=\"new-schedule-form__header\">Roles:</p>\n        <label for=\"roleManager\" class=\"new-schedule-form__label\">Shift Managers:</label>\n        <input type=\"number\" class=\"new-schedule-form__input\" name=\"roleManager\" value=\"1\" readonly>\n        <label for=\"roleCashier\" class=\"new-schedule-form__label\">Cashier:</label>\n        <input type=\"number\" class=\"new-schedule-form__input\" name=\"roleCashier\" value=\"1\" min=\"0\">\n        <label for=\"roleSales\" class=\"new-schedule-form__label\">Sales person:</label>\n        <input type=\"number\" class=\"new-schedule-form__input\" name=\"roleSales\" value=\"1\" min=\"0\">\n        <input type=\"submit\" value=\"Create new week schedule\" class=\"new-schedule-form__submit-btn\">\n      </form>\n  ";
};
/** creates a new week schedule on form submitted */
var createNewWeekSchedule = function (eve) {
    eve.preventDefault();
    var cashierCount = eve.target.elements.roleCashier.value;
    var salesCount = eve.target.elements.roleSales.value;
    try {
        fetch("/api/schedule/create-new-week-for-scheduling", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nextSunday: nextSunday.toLocaleDateString(),
                cashierCount: cashierCount,
                salesCount: salesCount
            })
        })
            .then(function (res) { return res.json(); })
            .then(function (data) {
            if (!data)
                throw new Error("no schedule data received from DB.");
            var weekDaysArr = getWeekDaysDatesArr(new Date(data.weekSchedule.startDate));
            thisScheduleId = data["weekSchedule"]._id;
            renderEmployeesPanel(weekDaysArr);
            renderAllocationsPanel(weekDaysArr, data.weekSchedule.scheduleRequirements);
        });
    }
    catch (error) {
        console.log(error);
    }
};
/** Calc. start and the end of dates of next week and renders them */
var renderEmployeesPanel = function (weekDaysArr) {
    var employeesPanelElem = document.querySelector(".employees-panel");
    // const weekStartElem = document.querySelector(".employees-panel__week-displayer__week-start") as HTMLDivElement;
    // const weekEndElem = document.querySelector(".employees-panel__week-displayer__week-end") as HTMLDivElement;
    employeesPanelElem.innerHTML = "\n        <div class=\"employees-panel__week-display\">\n          <p class=\"employees-panel__week-display__text\">" + weekDaysArr[0].toDateString() + " - </p>\n          <p class=\"employees-panel__week-display__text\">" + weekDaysArr[6].toDateString() + "</p>\n        </div>\n\n        <div class=\"employees-panel__employees-list-container\">\n        </div>\n  ";
    // employeesPanelElem.innerHTML = `
    //       <div class="employees-panel__week-display">
    //         <p class="employees-panel__week-display__text"><span class="employees-panel__week-display__week-start">${weekDaysArr[0].toDateString()}</span> - <br><span class="employees-panel__week-display__week-end">${weekDaysArr[6].toDateString()}</span></p>
    //       </div>
    //       <div class="employees-panel__employees-list-container">
    //       </div>
    // `;
};
var renderAllocationsPanel = function (weekDaysArr, scheduleRequirements) {
    var shiftsPanelElem = document.querySelector(".shifts-panel");
    // shiftsPanelElem.innerHTML = `
    // <div class="shifts-panel__days-header-container">${renderWeekHeaders(
    //   weekDaysArr
    // )}</div>
    // ${renderRoleAllocationsPlaces(weekDaysArr, scheduleRequirements)}
    // `;
    shiftsPanelElem.innerHTML = "\n  <table border=\"1\" cellpadding=\"17\"width=\"400\" height=\"100\" class=\"shift-table\">\n  <thead class=\"shift-table__header-container\">\n  <tr class=\"shift-table__header-container\">\n      <th></th>\n  " + renderWeekHeaders(weekDaysArr) + "\n  </tr>\n  </thead>\n  <tbody class=\"shift-table__body-container\">\n  " + renderRoleAllocationsPlaces(weekDaysArr, scheduleRequirements) + "\n  </tbody>\n  </table>";
};
var renderWeekHeaders = function (weekDaysArr) {
    var daysNames = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    var daysCounter = -1;
    var daysHeadersHtml = weekDaysArr
        .map(function (dayHeader) {
        daysCounter++;
        return "<th><p>" + daysNames[daysCounter] + "</p>\n      <p class=\"shifts-panel__day-box__date\">" + weekDaysArr[daysCounter].getDate() + " / " + weekDaysArr[daysCounter].getMonth() + "</p>\n      </th>";
    })
        .join("");
    return daysHeadersHtml;
};
var renderRoleAllocationsPlaces = function (weekDaysArr, scheduleRequirements) {
    var numRolesInScheduleRequirements = scheduleRequirements.length;
    var rolesCounter = -1;
    var weekDayCounter = -1;
    var rolesHtml = "";
    for (var i = 0; i < numRolesInScheduleRequirements; i++) {
        var numEmployeesRequiredForRole = scheduleRequirements[i]["numEmployeesRequired"];
        if (numEmployeesRequiredForRole === 0)
            continue;
        var oneStringRoleTypeName = scheduleRequirements[i]["roleType"] === "Shift Manager"
            ? "ShiftManager"
            : scheduleRequirements[i]["roleType"];
        for (var j = 0; j < numEmployeesRequiredForRole; j++) {
            rolesHtml += "<tr class=\"shift-table__roles-row\">\n      <td class=\"shift-table__role-row__role\">\n      " + scheduleRequirements[i]["roleType"] + "</td>";
            for (var weekdayIndex = 0; weekdayIndex < 7; weekdayIndex++) {
                rolesHtml += "<td class=\"shifts-panel__role-row__" + oneStringRoleTypeName + "-num" + j + "-weekday" + weekdayIndex + "\">\n        <img src=\"./images/add-employee-to-shift.png\" alt=\"add-employee-to-shift\" class=\"shifts-panel__role-row__icon\" onclick=\"onShiftSelect('" + scheduleRequirements[i]["roleType"] + "', '" + weekdayIndex + "', '" + j + "')\">";
            }
            rolesHtml += "</ td>";
        }
    }
    return rolesHtml;
};
var getNextSundayDate = function (todayDate) {
    var date = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate() - todayDate.getDay() + 7);
    return date;
};
var getNextSaturdayDate = function (todayDate) {
    var date = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate() + (6 - todayDate.getDay()) + 7);
    return date;
};
var getWeekDaysDatesArr = function (startDate) {
    var weekDaysArr = [];
    for (var i = 0; i < 7; i++) {
        weekDaysArr.push(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + (i - startDate.getDay())));
    }
    return weekDaysArr;
};
var renderAllAvailableEmployees = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/];
    });
}); };
var onShiftSelect = function (roleType, weekdayIndex, roleCount) {
    targetedDayIndex = weekdayIndex;
    targetedRoleType = roleType;
    targetedRoleCount = roleCount;
    try {
        fetch("/api/availability/get-employees-by-role-and-weekday", {
            method: "SEARCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                role: roleType,
                weekday: weekdayIndex
            })
        })
            .then(function (res) { return res.json(); })
            .then(function (data) {
            processShiftSelection(data.employees, roleType, weekdayIndex);
        });
    }
    catch (error) {
        console.error(error);
    }
};
var processShiftSelection = function (allAvailableEmployees, roleType, weekdayIndex) {
    var allAvailableEmployeesOnDay = [];
    switch (String(weekdayIndex)) {
        case "0":
            allAvailableEmployeesOnDay = allAvailableEmployees[0]["sundayMorning"];
            break;
        case "1":
            allAvailableEmployeesOnDay = allAvailableEmployees[0]["mondayMorning"];
            break;
        case "2":
            allAvailableEmployeesOnDay = allAvailableEmployees[0]["tuesdayMorning"];
            break;
        case "3":
            allAvailableEmployeesOnDay = allAvailableEmployees[0]["wednesdayMorning"];
            break;
        case "4":
            allAvailableEmployeesOnDay = allAvailableEmployees[0]["thursdayMorning"];
            break;
        case "5":
            allAvailableEmployeesOnDay = allAvailableEmployees[0]["fridayMorning"];
            break;
        case "6":
            allAvailableEmployeesOnDay = allAvailableEmployees[0]["saturdayMorning"];
            break;
    }
    try {
        fetch("/api/role/get-role-id-by-name", {
            method: "SEARCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ targetName: roleType })
        })
            .then(function (res) { return res.json(); })
            .then(function (data) {
            if (!data)
                throw new Error("no name of Id found on DB");
            renderEmployeesPanelByRole(data.roleId[0]._id, allAvailableEmployeesOnDay, weekdayIndex);
        });
    }
    catch (error) {
        console.error(error);
    }
};
var renderEmployeesPanelByRole = function (roleId, employees, weekdayIndex) {
    var commentsPanel = document.querySelector(".comments-panel");
    if (commentsPanel) {
        commentsPanel.innerHTML = "";
    }
    var employeeslengh = employees.length;
    var employeesNamesList = document.querySelector(".employees-panel__employees-list-container");
    if (!employeesNamesList)
        throw new Error("did not find employees-panel__employees-list-container on DOM.");
    employeesNamesList.innerHTML = " ";
    for (var i = 0; i < employeeslengh; i++) {
        if (employees[i]["role"] !== roleId)
            continue;
        var comment = employees[i]["comment"];
        employeesNamesList.innerHTML += "<div class=\"employees-panel__employee-box\" onmouseover=\"renderEmployeeComment('" + employees[i]["employeeId"] + "', '" + weekdayIndex + "')\" onclick=\"processEmployeeAllocation('" + employees[i]["employeeId"] + "', '" + employees[i]["name"] + "', '" + weekdayIndex + "')\">\n            <p class=\"employees-panel__employee-name\">" + employees[i]["name"] + "</p>\n            <div class=\"employees-panel__employee-box__markings-container\">\n            </div>\n          </div>";
    }
};
var renderEmployeeComment = function (targetEmployeeId, weekdayIndex) {
    var commentsPanel = document.querySelector(".comments-panel");
    try {
        fetch("/api/availability/get-comment-by-employee-id-and-weekday", {
            method: "SEARCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ employeeId: targetEmployeeId, weekdayIndex: weekdayIndex })
        })
            .then(function (res) { return res.json(); })
            .then(function (data) {
            if (!data)
                throw new Error("no comment of Id found on DB");
            var weekDayString = convertWeekIndexToDayString(String(weekdayIndex));
            var dayDBLenght = data.dayDB[weekDayString].length;
            for (var i = 0; i < dayDBLenght; i++) {
                if (data.dayDB[weekDayString][i]["employeeId"] === targetEmployeeId) {
                    commentsPanel.innerHTML = "<p>" + data.dayDB[weekDayString][i]["comment"] + "</p> \n          ";
                    break;
                }
            }
        });
    }
    catch (error) {
        console.error(error);
    }
};
var convertWeekIndexToDayString = function (weekdayIndex) {
    switch (weekdayIndex) {
        case "0":
            return "sundayMorning";
            break;
        case "1":
            return "mondayMorning";
            break;
        case "2":
            return "tuesdayMorning";
            break;
        case "3":
            return "wednesdayMorning";
            break;
        case "4":
            return "thursdayMorning";
            break;
        case "5":
            return "fridayMorning";
            break;
        case "6":
            return "saturdayMorning";
            break;
        default:
            console.log("no day shift index received");
            return "null";
            break;
    }
};
// const processEmployeeAllocation = (
//   employeeId: string,
//   employeeName: string
// ) => {
//   targetedRoleType = (targetedRoleType === "Shift Manager") ? "ShiftManager" : targetedRoleType;
//   const targetShift = document.querySelector(
//     `.shifts-panel__role-row__${targetedRoleType}-num${targetedRoleCount}-weekday${targetedDayIndex}`
//   );
//   console.log(targetShift);
var processEmployeeAllocation = function (employeeId, employeeName, weekdayIndex) {
    targetedRoleType =
        targetedRoleType === "Shift Manager" ? "ShiftManager" : targetedRoleType;
    var targetShift = document.querySelector(".shifts-panel__role-row__" + targetedRoleType + "-num" + targetedRoleCount + "-weekday" + targetedDayIndex);
    if (!targetShift) {
        console.log("target shift allocation slot not found in DOM");
        return;
    }
    targetShift.innerHTML = "<p class=\"shifts-panel__role-row__allocation-name\">" + employeeName + "</p>";
    var scheduleTable = document.querySelector(".shifts-panel").innerHTML;
    try {
        fetch("/api/schedule/add-employee-to-schedule", {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                thisScheduleId: thisScheduleId,
                employeeId: employeeId,
                weekdayIndex: weekdayIndex,
                scheduleTable: scheduleTable
            })
        });
    }
    catch (error) {
        console.log(error);
    }
};
