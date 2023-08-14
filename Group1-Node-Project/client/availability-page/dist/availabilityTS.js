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
var userDB;
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var totalTimeShift, startTimeString, currentTime;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getActiveUser()];
                case 1:
                    _a.sent();
                    renderNavBar(navBarElement);
                    totalTimeShift = localStorage.getItem("totalTimeShift");
                    if (totalTimeShift) {
                        runningClock.innerHTML = totalTimeShift;
                        startTimeString = localStorage.getItem("startTime");
                        startTime1 = parseInt(startTimeString);
                        console.log(startTime1);
                        currentTime = Date.now();
                        console.log(currentTime);
                        // const elapsedTime = currentTime - startTime1;
                        updateClock();
                    }
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
var getActiveEmployee = function () { return __awaiter(_this, void 0, void 0, function () {
    var response, data, employee, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch("/api/employee/get-employee")];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                data = _a.sent();
                console.log("data", data);
                employee = data.employee;
                //if(!data) throw new Error("no data received from DB");
                if (employee) {
                    userDB = employee;
                    console.log("userDB: ", userDB);
                    return [2 /*return*/];
                }
                getActiveManager();
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.log(error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var getActiveManager = function () { return __awaiter(_this, void 0, void 0, function () {
    var response, data, manager, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch("/api/manager/get-manager")];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                data = _a.sent();
                console.log("data", data);
                manager = data.manager;
                if (!manager)
                    throw new Error("didn't get employee or manager from DB");
                userDB = manager;
                console.log("userDB: ", userDB);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                console.error(error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
getActiveEmployee();
//
var buttons = document.querySelectorAll(".availability-button");
var comment = document.getElementById("comment");
var form = document.querySelector(".availabilityForm");
var submitBtn = document.querySelector(".submit-btn");
var availabilityDate = document.querySelector(".availabilityForm__date");
var chartDates = document.querySelector(".availabilityForm__chartDates");
// DATES -
// Set up week dates -
function updateWeekDates() {
    var weekDatesDiv = document.getElementById("weekDates");
    var today = new Date();
    var dayOfWeek = today.getDay();
    var sunday = new Date(today);
    sunday.setDate(today.getDate() - dayOfWeek);
    var saturday = new Date(today);
    saturday.setDate(today.getDate() + (6 - dayOfWeek));
    var options = {
        month: "short",
        day: "numeric"
    };
    weekDatesDiv.textContent = "<" + sunday.toLocaleDateString(undefined, options) + " - " + saturday.toLocaleDateString(undefined, options) + ">";
    return { sunday: sunday, saturday: saturday };
}
// Chart dates -
function updateChartDates() {
    var chartDatesContainer = document.querySelector(".availabilityForm__table__chartDatesContainer");
    var dayElements = document.querySelectorAll(".availabilityForm__table th:not(:first-child)");
    var sunday = updateWeekDates().sunday;
    dayElements.forEach(function (dayElement, index) {
        var currentDate = new Date(sunday);
        currentDate.setDate(sunday.getDate() + index);
        var month = currentDate.getMonth() + 1;
        var dayOfMonth = currentDate.getDate();
        var dateElement = document.createElement("div");
        dateElement.classList.add("availabilityForm__chartDate");
        dateElement.textContent = dayOfMonth + "." + month;
        chartDatesContainer.appendChild(dateElement);
    });
}
updateChartDates();
// End of dates functions //
// Toggle function -
function toggleButton(event) {
    var clickedButton = event.target;
    var day = clickedButton.getAttribute("data-day");
    if (clickedButton.textContent === "can") {
        clickedButton.textContent = "can't";
    }
    else {
        clickedButton.textContent = "can";
        clickedButton.style.backgroundColor = "rgb(21, 246, 92)";
    }
}
// Handle form submit -
function handleFormSubmit(event) {
    return __awaiter(this, void 0, void 0, function () {
        var commentValue, availabilityData, userRole, response, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    commentValue = comment.value;
                    availabilityData = {};
                    buttons.forEach(function (button) {
                        var day = button.getAttribute("data-day");
                        var isAvailable = button.textContent === "can";
                        if (day) {
                            availabilityData[day] = isAvailable;
                        }
                    });
                    userRole = userDB.role === (null || undefined) ? "Manager" : userDB.role;
                    console.log("userRole: ", userRole);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetch("/api/availability/update", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                availabilityData: availabilityData,
                                commentValue: commentValue,
                                userId: userDB._id,
                                role: { userRole: userRole },
                                name: userDB.name
                            })
                        })];
                case 2:
                    response = _a.sent();
                    if (response.ok) {
                        console.log("Availability updated successfully");
                    }
                    else {
                        console.error("Error updating availability");
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    console.error("Error:", error_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
document.addEventListener("DOMContentLoaded", function () {
    buttons.forEach(function (button) {
        button.addEventListener("click", toggleButton);
    });
    updateWeekDates();
    form.addEventListener("submit", handleFormSubmit);
});
