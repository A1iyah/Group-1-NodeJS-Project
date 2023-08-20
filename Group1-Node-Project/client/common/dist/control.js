var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var userType;
var user;
var UserType;
(function (UserType) {
  UserType[(UserType["Admin"] = 0)] = "Admin";
  UserType[(UserType["Manager"] = 1)] = "Manager";
  UserType[(UserType["Employee"] = 2)] = "Employee";
})(UserType || (UserType = {}));
// const navBarElem = document.querySelector(".nav-bar") as HTMLDivElement;
// async function main() {
//   await getActiveUser();
//   renderNavBar(navBarElement);
// }
// main();
function loadActiveUser() {
  return __awaiter(this, void 0, void 0, function () {
    var response, data, user_1, userType_1, error_1;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 3, , 4]);
          return [4 /*yield*/, fetch("/api/cookies/get-user")];
        case 1:
          response = _a.sent();
          return [4 /*yield*/, response.json()];
        case 2:
          data = _a.sent();
          user_1 = data.user;
          userType_1 = data.userType;
          if (!user_1) throw new Error("didn't get from DB");
          return [2 /*return*/, data];
        case 3:
          error_1 = _a.sent();
          console.error(error_1);
          return [3 /*break*/, 4];
        case 4:
          return [2 /*return*/];
      }
    });
  });
}
// async function getActiveUser() {
//   try {
//     const responseManager = await fetch("/api/manager/get-manager");
//     const dataManager = await responseManager.json();
//     console.log("dataManager", dataManager);
//     const { manager } = dataManager;
//     if (dataManager.ok === true && manager._id !== null) {
//       userType = UserType.Manager;
//       user = manager;
//       return;
//     }
//   } catch (error) {
//     console.error("test");
//   }
//   try {
//     const responseAdmin = await fetch("/api/admin/get-admin");
//     const dataAdmin = await responseAdmin.json();
//     const { admin } = dataAdmin;
//     console.log("user: ", admin);
// if (dataAdmin.ok === true && admin._id !== null) {
//   userType = UserType.Admin;
//   user = admin;
//   console.log("userType: ", userType);
//       return;
//     }
//   } catch (error) {
//     console.error(error);
//   }
//   try {
//     const responseEmployee = await fetch("/api/employee/get-employee");
//     const dataEmployee = await responseEmployee.json();
//     const { employee } = dataEmployee;
//     console.log("user: ", employee);
//     if (dataEmployee.ok === true && employee._id !== null) {
//       userType = UserType.Employee;
//       user = employee;
//       console.log("userType: ", userType);
//       return;
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }
var renderNavBar = function (navBarElem, userType, user) {
  var targetDivEle;
  if (!navBarElem) console.error("no nav bar HTMLDivElement received");
  switch (userType) {
    case UserType.Admin:
      var navBarHtml =
        '<div class="nav-bar__links-group">\n                <p class="nav-bar__link nav-bar__link__shift-schedule" onclick="gotoPage(\'../shift-schedule-page/shiftSchedule.html\')">Schedule</p>\n                <p class="nav-bar__link nav-bar__link__availability" onclick="gotoPage(\'../availability-page/availabilityPage.html\')">Availability</p>\n                <p class="nav-bar__link nav-bar__link__employees" onclick="gotoPage(\'../employee-list-page/employeesPage.html\')">Employees</p>\n                <p class="nav-bar__link nav-bar__link__reports" onclick="gotoPage(\'../reports-page/reportsPage.html\')">Reports</p>\n                </div>\n                <div class="nav-bar__links-group">\n                <img src="./turnOff.png" class="nav-bar__link nav-bar__link__logOut" onclick="gotoPage(\'../index.html\')"/>\n                <p class="nav-bar__user-name">' +
        user.name +
        "</p>\n                </div>";
      navBarElem.innerHTML = navBarHtml;
      break;
    case UserType.Manager:
      navBarHtml =
        '<div class="nav-bar__links-group">\n                <p class="nav-bar__link nav-bar__link__employee-manager" onclick="gotoPage(\'../managerHP/managerHP.html\')">Start/End Shift</p>\n                <p class="nav-bar__link nav-bar__link__my-shifts" onclick="gotoPage(\'../my-shifts-page/myShifts.html\')">My Shifts</p>\n                <p class="nav-bar__link nav-bar__link__shift-schedule" onclick="gotoPage(\'../shift-schedule-page/shiftSchedule.html\')">Schedule</p>\n                <p class="nav-bar__link nav-bar__link__availability" onclick="gotoPage(\'../availability-page/availabilityPage.html\')">Availability</p>\n                <p class="nav-bar__link nav-bar__link__employees" onclick="gotoPage(\'../employee-list-page/employeesPage.html\')">Employees</p>\n                <p class="nav-bar__link nav-bar__link__reports" onclick="gotoPage(\'../reports-page/reportsPage.html\')">Reports</p>\n                </div>\n                <div>\n                <img src="turnOff.png" class="nav-bar__link nav-bar__link__logOut" onclick="gotoPage(\'../index.html\')"/>\n                <p class="nav-bar__user-name">' +
        user.name +
        "</p>\n                </div>";
      navBarElem.innerHTML = navBarHtml;
      break;
    case UserType.Employee:
      navBarHtml =
        '<div class="nav-bar__links-group">\n                <p class="nav-bar__link nav-bar__link__employee-manager" onclick="gotoPage(\'../employeeHP/employeeHP.html\')">Start/End Shift</p>\n                <p class="nav-bar__link nav-bar__link__my-shifts" onclick="gotoPage(\'../my-shifts-page/myShifts.html\')">My Shifts</p>\n                <p class="nav-bar__link nav-bar__link__shift-schedule" onclick="gotoPage(\'../shift-schedule-page/shiftSchedule.html\')">Schedule</p>\n                <p class="nav-bar__link nav-bar__link__availability" onclick="gotoPage(\'../availability-page/availabilityPage.html\')">Availability</p>\n                <p class="nav-bar__link nav-bar__link__employees" onclick="gotoPage(\'../employee-list-page/employeesPage.html\')">Employees</p>\n                <p class="nav-bar__link nav-bar__link__reports" onclick="gotoPage(\'../reports-page/reportsPage.html\')">Reports</p>\n                </div>\n                <div>\n                <img src="turnOff.png" class="nav-bar__link nav-bar__link__logOut" onclick="gotoPage(\'../index.html\')"/>\n                <p class="nav-bar__user-name">' +
        user.name +
        "</p>\n                </div>";
      var navBarHtml =
        '<div class="nav-bar__links-group">\n      <p class="nav-bar__link nav-bar__link__employees" onclick="gotoPage(\'../employee-list-page/employeesPage.html\')">Employees</p>\n      <p class="nav-bar__link nav-bar__link__reports" onclick="gotoPage(\'../reports-page/reportsPage.html\')">Reports</p>\n      <p class="nav-bar__link nav-bar__link__shift-schedule" onclick="gotoPage(\'../shift-schedule-page/shiftSchedule.html\')">Schedule</p>\n\n                </div>\n                <p class="nav-bar__user-name">' +
        user.name +
        "</p>";
      navBarElem.innerHTML = navBarHtml;
      break;
    case UserType.Manager:
      navBarHtml =
        '<div class="nav-bar__links-group">\n                <p class="nav-bar__link nav-bar__link__employee-manager" onclick="gotoPage(\'../managerHP/managerHP.html\')">Start/End Shift</p>\n                <p class="nav-bar__link nav-bar__link__my-shifts" onclick="gotoPage(\'../my-shifts-page/myShifts.html\')">My Shifts</p>\n                <p class="nav-bar__link nav-bar__link__employees" onclick="gotoPage(\'../employee-list-page/employeesPage.html\')">Employees</p>\n                <p class="nav-bar__link nav-bar__link__reports" onclick="gotoPage(\'../reports-page/reportsPage.html\')">Reports</p>\n                <p class="nav-bar__link nav-bar__link__availability" onclick="gotoPage(\'../availability-page/availabilityPage.html\')">Availability</p>\n                <p class="nav-bar__link nav-bar__link__shift-schedule" onclick="gotoPage(\'../shift-schedule-page/shiftSchedule.html\')">Schedule</p>\n                </div>\n                <p class="nav-bar__user-name">' +
        user.name +
        "</p>";
      navBarElem.innerHTML = navBarHtml;
      break;
    case UserType.Employee:
      navBarHtml =
        '<div class="nav-bar__links-group">\n                <p class="nav-bar__link nav-bar__link__employee-manager" onclick="gotoPage(\'../employeeHP/employeeHP.html\')">Start/End Shift</p>\n                <p class="nav-bar__link nav-bar__link__my-shifts" onclick="gotoPage(\'../my-shifts-page/myShifts.html\')">My Shifts</p>\n                <p class="nav-bar__link nav-bar__link__employees" onclick="gotoPage(\'../employee-list-page/employeesPage.html\')">Employees</p>\n                <p class="nav-bar__link nav-bar__link__reports" onclick="gotoPage(\'../reports-page/reportsPage.html\')">Reports</p>\n                <p class="nav-bar__link nav-bar__link__availability" onclick="gotoPage(\'../availability-page/availabilityPage.html\')">Availability</p>\n                </div>\n                <p class="nav-bar__user-name">' +
        user.name +
        "</p>";
      navBarElem.innerHTML = navBarHtml;
  }
  switch (window.location.pathname) {
    case "/start-end-shift/employeeManager-HP.html":
      targetDivEle = document.querySelector(".nav-bar__link__employee-manager");
      break;
    case "/my-shifts-page/myShifts.html":
      targetDivEle = document.querySelector(".nav-bar__link__my-shifts");
      break;
    case "/shift-schedule-page/shiftSchedule.html":
      targetDivEle = document.querySelector(".nav-bar__link__shift-schedule");
      break;
    case "/availability-page/availabilityPage.html":
      targetDivEle = document.querySelector(".nav-bar__link__availability");
      break;
    case "/employees-page/employeesPage.html":
      targetDivEle = document.querySelector(".nav-bar__link__employees");
      break;
    case "/reports-page/reportsPage.html":
      targetDivEle = document.querySelector(".nav-bar__link__reports");
      break;
    // default:
    //   console.error("No location.pathname found.");
    //   break;
  }
  if (targetDivEle) {
    targetDivEle.classList.add("nav-bar__link--bold");
  }
};
var gotoPage = function (targetPage) {
  window.location.href = targetPage;
};
// function runningClockPage(runningClock) {
//   let startTime1: number;
//   const totalTimeShift = localStorage.getItem("totalTimeShift");
//   if (totalTimeShift) {
//     runningClock.innerHTML = totalTimeShift;
//     let intervalId = localStorage.getItem("intervalId");
//     const startTimeString = localStorage.getItem("startTime");
//     startTime1 = parseInt(startTimeString!);
//     console.log(startTime1);
//     const currentTime = Date.now();
//     console.log(currentTime);
//     // const elapsedTime = currentTime - startTime1;
//     updateClockPages();
//   }
// }
// function continueUpdateElapsedTimePages(totalTimeShift) {
//   const currentTime = Date.now();
//   console.log(currentTime);
//   const elapsedTime = currentTime - startTime1;
//   console.log(elapsedTime);
//   const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
//   const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
//   const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
//   const formattedTime = `${String(hours).padStart(2, "0")}:${String(
//     minutes
//   ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
//   runningClock.innerHTML = formattedTime;
//   totalTimeShift = formattedTime;
//   console.log(totalTimeShift);
//   localStorage.setItem("totalTimeShift", formattedTime);
//   localStorage.setItem("intervalId", intervalId);
// }
// function updateClockPages() {
//   intervalId = setInterval(continueUpdateElapsedTimePages, 1000);
// }
