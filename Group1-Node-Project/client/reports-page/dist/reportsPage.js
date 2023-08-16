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
var navBarElement = document.querySelector(".nav-bar");
var userName = document.querySelector("#userName");
var runningClock = document.querySelector(".running-clock");
var salaryButton = document.querySelector(".reportButtons__salary");
var managerButton = document.querySelector(".reportButtons__manager");
var employeeButton = document.querySelector(".reportButtons__employee");
var reportsBySalary = document.querySelector(".salaryReports");
var employeesList = document.querySelector(".employeeReports__byEmployee__List");
var managersList = document.querySelector(".managerReports__byManager__List");
var reportsByManager = document.querySelector(".managerReports");
var reportsByEmployee = document.querySelector(".employeeReports");
var reportSalaryUp = document.querySelector(".salaryReports__salaryUp");
var salaryReportResult = document.querySelector("#salaryReportResult");
var reportSalaryDown = document.querySelector(".salaryReports__salaryDown");
var reportSalaryBetween = document.querySelector(".salaryReports__between");
var attendanceReport = document.querySelector("#attendanceReport");
var attendanceReportTable = document.querySelector(".attendanceReport");
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
                        updateClock();
                    }
                    if (userType === UserType.Employee) {
                        employeeUsingReport();
                    }
                    else if (userType === UserType.Manager) {
                        managerButton.style.display = "none";
                        employeeButton.style.display = "inline-block";
                        salaryButton.style.display = "inline-block";
                    }
                    else if (userType === UserType.Admin) {
                        managerButton.style.display = "inline-block";
                        employeeButton.style.display = "inline-block";
                        salaryButton.style.display = "inline-block";
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
function renderReportResult(employees) {
    try {
        if (!employees)
            throw new Error("employees didn't found");
        var html = employees.map(function (employee) {
            return "\n            <div class=\"reportCard\">\n              <div class=\"reportCard__report-details\">\n                <div class=\"reportCard__report-details__name\">" + employee.name + "</div>\n                <div class=\"reportCard__report-details__birthday\">" + employee.birthday + "</div>\n                <div class=\"reportCard__report-details__email\">" + employee.email + "</div>\n                <div class=\"reportCard__report-details__phone\">" + employee.phone + "</div>\n                <div class=\"reportCard__report-details__salary\">" + employee.salaryPerHour + "</div>\n                <div class=\"reportCard__report-details__role\">" + employee.role.name + "</div>\n              </div>\n            </div>\n      ";
        });
        // for (let i = 0; i < employees.length; i++) {
        //   // const employeeToShow = employees[i];
        //   const listItem = document.createElement("tr");
        //   const tdName = document.createElement("td");
        //   const tdBirthday = document.createElement("td");
        //   const tdEmail = document.createElement("td");
        //   const tdPhone = document.createElement("td");
        //   const tdSalaryPerHour = document.createElement("td");
        //   const tdRole = document.createElement("td");
        //   tdName.appendChild(document.createTextNode(employees[i].name));
        //   listItem.appendChild(tdName);
        //   tdBirthday.appendChild(document.createTextNode(employees[i].birthday));
        //   listItem.appendChild(tdBirthday);
        //   tdEmail.appendChild(document.createTextNode(employees[i].email));
        //   listItem.appendChild(tdEmail);
        //   tdPhone.appendChild(document.createTextNode(employees[i].phone));
        //   listItem.appendChild(tdPhone);
        //   tdSalaryPerHour.appendChild(
        //     document.createTextNode(employees[i].salaryPerHour)
        //   );
        //   listItem.appendChild(tdSalaryPerHour);
        //   if (employees[i].role) {
        //     tdRole.appendChild(document.createTextNode(employees[i].role.name));
        //     listItem.appendChild(tdRole);
        //   } else {
        //     tdRole.appendChild(document.createTextNode("manager"));
        //     listItem.appendChild(tdRole);
        //   }
        //   salaryReportResult?.appendChild(listItem);
        // }
        var employeeDetails = document.querySelector(".employeeDetails");
        employeeDetails.innerHTML = html;
    }
    catch (error) {
        console.log(error);
    }
}
function renderShiftResult(employees) {
    try {
        if (!employees)
            throw new Error("employee not found");
        attendanceReportTable.style.display = "block";
        for (var i = 0; employees.attendance.length - 1 >= i; i++) {
            var listItem = document.createElement("tr");
            var tdDateHour = document.createElement("td");
            var tdDuration = document.createElement("td");
            tdDateHour.appendChild(document.createTextNode(employees.attendance[i].date));
            listItem.appendChild(tdDateHour);
            tdDuration.appendChild(document.createTextNode(employees.attendance[i].clock));
            listItem.appendChild(tdDuration);
            attendanceReport === null || attendanceReport === void 0 ? void 0 : attendanceReport.appendChild(listItem);
        }
    }
    catch (error) {
        console.log(error);
    }
}
salaryButton.addEventListener("click", function (e) {
    reportsBySalary.style.display = "flex";
    reportsByEmployee.style.display = "none";
    reportsByManager.style.display = "none";
    resetPage();
});
function HandleSalaryUp(ev) {
    try {
        ev.preventDefault();
        var salaryUp = ev.target.elements.salaryUp.value;
        if (!salaryUp)
            throw new Error("no salary entered");
        resetPage();
        console.log(salaryUp);
        if (userType === UserType.Admin) {
            var _id = user._id;
            fetch("/api/admin/get-selected-salaryUp", {
                method: "PATCH",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ salaryUp: salaryUp, _id: _id })
            })
                .then(function (res) { return res.json(); })
                .then(function (_a) {
                var employees = _a.employees;
                console.log(employees.managers);
                renderReportResult(employees.managers);
                renderReportResult(employees.employees);
            });
        }
        else if (userType === UserType.Manager) {
            var _id = user._id;
            fetch("/api/manager/get-selected-salaryUp", {
                method: "PATCH",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ salaryUp: salaryUp, _id: _id })
            })
                .then(function (res) { return res.json(); })
                .then(function (_a) {
                var employees = _a.employees;
                renderReportResult(employees.employees);
            });
        }
    }
    catch (error) {
        console.log(error);
    }
}
function HandleSalaryDown(ev) {
    try {
        ev.preventDefault();
        var salaryDown = ev.target.elements.salaryDown.value;
        if (!salaryDown)
            throw new Error("no salary entered");
        resetPage();
        console.log(salaryDown);
        if (userType === UserType.Admin) {
            var _id = user._id;
            fetch("/api/admin/get-selected-salaryDown", {
                method: "PATCH",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ salaryDown: salaryDown, _id: _id })
            })
                .then(function (res) { return res.json(); })
                .then(function (_a) {
                var employees = _a.employees;
                console.log(employees.managers);
                renderReportResult(employees.managers);
                renderReportResult(employees.employees);
            });
        }
        else if (userType === UserType.Manager) {
            var _id = user._id;
            fetch("/api/manager/get-selected-salaryDown", {
                method: "PATCH",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ salaryDown: salaryDown, _id: _id })
            })
                .then(function (res) { return res.json(); })
                .then(function (_a) {
                var employees = _a.employees;
                console.log(employees.employees);
                renderReportResult(employees.employees);
            });
        }
    }
    catch (error) {
        console.log(error);
    }
}
function HandleSalaryBetween(ev) {
    try {
        ev.preventDefault();
        var minSalary = ev.target.elements.minSalary.value;
        var maxSalary = ev.target.elements.maxSalary.value;
        if (!minSalary)
            throw new Error("no minSalary entered");
        if (!maxSalary)
            throw new Error("no maxSalary entered");
        resetPage();
        console.log(minSalary, maxSalary);
        if (userType === UserType.Admin) {
            var _id = user._id;
            fetch("/api/admin/get-selected-salaryBetween", {
                method: "PATCH",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ minSalary: minSalary, maxSalary: maxSalary, _id: _id })
            })
                .then(function (res) { return res.json(); })
                .then(function (_a) {
                var employees = _a.employees;
                console.log(employees.employees);
                console.log(employees.managers);
                renderReportResult(employees.managers);
                renderReportResult(employees.employees);
            });
        }
        else if (userType === UserType.Manager) {
            var _id = user._id;
            fetch("/api/manager/get-selected-salaryBetween", {
                method: "PATCH",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ minSalary: minSalary, maxSalary: maxSalary, _id: _id })
            })
                .then(function (res) { return res.json(); })
                .then(function (_a) {
                var employees = _a.employees;
                renderReportResult(employees.employees);
            });
        }
    }
    catch (error) {
        console.log(error);
    }
}
employeeButton.addEventListener("click", function (e) {
    reportsBySalary.style.display = "none";
    reportsByEmployee.style.display = "flex";
    reportsByManager.style.display = "none";
    resetPage();
    if (userType === UserType.Admin) {
        fetch("/api/admin/get-employees-list")
            .then(function (res) { return res.json(); })
            .then(function (employees) {
            try {
                if (!employees)
                    throw new Error("didn't get any data");
                console.log(employees);
                var employeesToShow = employees.employees.employees;
                console.log(employeesToShow);
                var html1 = employeesToShow
                    .map(function (employee) {
                    return "<option> " + employee.name + " - " + employee.idNumber + "</option>";
                })
                    .join(" ");
                employeesList.innerHTML = "<select class=\"employeeReports__byEmployee__List\" name=\"employees\">" + html1 + "</select>";
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    else if (userType === UserType.Manager) {
        var _id = user._id;
        fetch("/api/manager/get-employees-list", {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ _id: _id })
        })
            .then(function (res) { return res.json(); })
            .then(function (_a) {
            var employees = _a.employees;
            console.log(employees);
            try {
                if (!employees)
                    throw new Error("didn't get any data");
                var employeesToShow = employees.employees;
                console.log(employeesToShow);
                var html1 = employeesToShow
                    .map(function (employee) {
                    return "<option> " + employee.name + " - " + employee.idNumber + "</option>";
                })
                    .join(" ");
                employeesList.innerHTML = "<select class=\"employeeReports__byEmployee__List\" name=\"employees\">" + html1 + "</select>";
            }
            catch (error) {
                console.log(error);
            }
        });
    }
});
function HandleEmployeeReport(ev) {
    try {
        ev.preventDefault();
        resetPage();
        var employeeDetails = ev.target.elements.employees.value;
        var _a = employeeDetails
            .match(/^(.*?)\s-\s(\d+)$/)
            .slice(1), name = _a[0], idNumber = _a[1];
        if (!employeeDetails)
            throw new Error("no employee selected");
        console.log(name);
        console.log(idNumber);
        fetch("/api/employee/get-selected-employee", {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ idNumber: idNumber })
        })
            .then(function (res) { return res.json(); })
            .then(function (_a) {
            var employeeDB = _a.employeeDB;
            console.log(employeeDB[0]);
            renderReportResult(employeeDB);
            renderShiftResult(employeeDB[0]);
        });
    }
    catch (error) {
        console.log(error);
    }
}
managerButton.addEventListener("click", function (e) {
    reportsBySalary.style.display = "none";
    reportsByEmployee.style.display = "none";
    reportsByManager.style.display = "flex";
    resetPage();
    fetch("/api/admin/get-managers-list")
        .then(function (res) { return res.json(); })
        .then(function (data) {
        try {
            if (!data)
                throw new Error("didn't get any data");
            console.log(data);
            var managers = data.managers.managers;
            console.log(managers);
            var html1 = managers
                .map(function (manager) {
                return "<option> " + manager.name + " - " + manager.idNumber + "</option>";
            })
                .join(" ");
            managersList.innerHTML = "<select class=\"managerReports__byManager__List\" name=\"managers\">" + html1 + "</select>";
        }
        catch (error) {
            console.log(error);
        }
    });
});
function HandleManagerReport(ev) {
    try {
        resetPage();
        ev.preventDefault();
        var managerDetails = ev.target.elements.managers.value;
        var _a = managerDetails.match(/^(.*?)\s-\s(\d+)$/).slice(1), name = _a[0], idNumber = _a[1];
        if (!managerDetails)
            throw new Error("no employee selected");
        console.log(name);
        console.log(idNumber);
        fetch("/api/manager/get-selected-manager", {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ idNumber: idNumber })
        })
            .then(function (res) { return res.json(); })
            .then(function (_a) {
            var managerDB = _a.managerDB;
            console.log(managerDB[0].employees);
            renderReportResult(managerDB);
            renderReportResult(managerDB[0].employees);
            renderShiftResult(managerDB[0]);
        });
    }
    catch (error) {
        console.log(error);
    }
}
function employeeUsingReport() {
    try {
        var idNumber = user.idNumber;
        fetch("/api/employee/get-selected-employee", {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ idNumber: idNumber })
        })
            .then(function (res) { return res.json(); })
            .then(function (_a) {
            var employeeDB = _a.employeeDB;
            console.log(employeeDB);
            renderReportResult(employeeDB);
            renderShiftResult(employeeDB[0]);
        });
    }
    catch (error) {
        console.log(error);
    }
}
function resetPage() {
    for (var i = salaryReportResult.children.length - 1; i > 0; i--) {
        salaryReportResult.removeChild(salaryReportResult.children[i]);
    }
    for (var i = attendanceReport.children.length - 1; i > 0; i--) {
        attendanceReport.removeChild(attendanceReport.children[i]);
    }
    attendanceReportTable.style.display = "none";
}
