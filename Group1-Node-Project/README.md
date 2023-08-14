# NodeJS-Project

MONGOOSE_URI = mongodb+srv://shalgony:XZl3FNYd6crPEEby@cluster0.d7by7a4.mongodb.net/

let userType: UserType;
let user: any;
enum UserType {
Admin,
Manager,
Employee,
}

// const navBarElem = document.querySelector(".nav-bar") as HTMLDivElement;

// async function main() {
// await getActiveUser();

// renderNavBar(navBarElement);
// }
// main();

async function getActiveUser() {
try {
const responseManager = await fetch("/api/manager/get-manager");
console.log("responseManager", responseManager);

    const dataManager = await responseManager.json();
    const { manager } = dataManager;
    console.log("dataManager: ", dataManager);

    console.log("user: ", manager);

    if (dataManager.ok === true && manager._id !== null) {
      userType = UserType.Manager;
      user = manager;
      console.log("userType: ", userType);
      return;
    }

} catch (error) {
console.error(error);
}

try {
const responseAdmin = await fetch("/api/admin/get-admin");
const dataAdmin = await responseAdmin.json();
const { admin } = dataAdmin;
console.log("user: ", admin);

    if (dataAdmin.ok === true && admin._id !== null) {
      userType = UserType.Admin;
      user = admin;
      console.log("userType: ", userType);

      return;
    }

} catch (error) {
console.error(error);
}

try {
const responseEmployee = await fetch("/api/employee/get-employee");
const dataEmployee = await responseEmployee.json();
const { employee } = dataEmployee;
console.log("user: ", employee);

    if (dataEmployee.ok === true && employee._id !== null) {
      userType = UserType.Employee;
      user = employee;
      console.log("userType: ", userType);

      return;
    }

} catch (error) {
console.error(error);
}
}

const renderNavBar = (navBarElem: HTMLDivElement) => {
let targetDivEle;

if (!navBarElem) console.error("no nav bar HTMLDivElement received");

switch (userType) {
case UserType.Admin:
let navBarHtml: string = `<div class="nav-bar__links-group">
                <p class="nav-bar__link nav-bar__link__shift-schedule" onclick="gotoPage('../shift-schedule-page/shiftSchedule.html')">Shift Schedule</p>
                <p class="nav-bar__link nav-bar__link__availability" onclick="gotoPage('../availability-page/availabilityPage.html')">Availability</p>
                <p class="nav-bar__link nav-bar__link__employees" onclick="gotoPage('../employee-list-page/employeesPage.html')">Employees</p>
                <p class="nav-bar__link nav-bar__link__reports" onclick="gotoPage('../reports-page/reportsPage.html')">Reports</p>
                </div>
                <p class="nav-bar__user-name">${user.name}</p>`;
navBarElem.innerHTML = navBarHtml;
break;
case UserType.Manager:
navBarHtml = `<div class="nav-bar__links-group">
                <p class="nav-bar__link nav-bar__link__employee-manager" onclick="gotoPage('../managerHP/managerHP.html')">Start/End Shift</p>
                <p class="nav-bar__link nav-bar__link__shift-schedule" onclick="gotoPage('../shift-schedule-page/shiftSchedule.html')">Shift Schedule</p>
                <p class="nav-bar__link nav-bar__link__availability" onclick="gotoPage('../availability-page/availabilityPage.html')">Availability</p>
                <p class="nav-bar__link nav-bar__link__employees" onclick="gotoPage('../employee-list-page/employeesPage.html')">Employees</p>
                <p class="nav-bar__link nav-bar__link__reports" onclick="gotoPage('../reports-page/reportsPage.html')">Reports</p>
                </div>
                <p class="nav-bar__user-name">${user.name}</p>`;
navBarElem.innerHTML = navBarHtml;
break;

    case UserType.Employee:
      navBarHtml = `<div class="nav-bar__links-group">
                <p class="nav-bar__link nav-bar__link__employee-manager" onclick="gotoPage('../employeeHP/employeeHP.html')">Start/End Shift</p>
                <p class="nav-bar__link nav-bar__link__shift-schedule" onclick="gotoPage('../shift-schedule-page/shiftSchedule.html')">Shift Schedule</p>
                <p class="nav-bar__link nav-bar__link__availability" onclick="gotoPage('../availability-page/availabilityPage.html')">Availability</p>
                <p class="nav-bar__link nav-bar__link__employees" onclick="gotoPage('../employee-list-page/employeesPage.html')">Employees</p>
                <p class="nav-bar__link nav-bar__link__reports" onclick="gotoPage('../reports-page/reportsPage.html')">Reports</p>
                </div>
                <p class="nav-bar__user-name">${user.name}</p>`;
      navBarElem.innerHTML = navBarHtml;

}

switch (window.location.pathname) {
case "/start-end-shift/employeeManager-HP.html":
targetDivEle = document.querySelector(".nav-bar**link**employee-manager");
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

    default:
      console.error("No location.pathname found.");

      break;

}

if (targetDivEle) {
(targetDivEle as HTMLDivElement).classList.add("nav-bar\_\_link--bold");
}
};

const gotoPage = (targetPage: string) => {
window.location.href = targetPage;
};

////employeeHP.ts///
let startTime: number = Date.now();
let currentTime: number | null = null;
let intervalId: number | null | any = null;
let totalTimeShift: any = null;
let formattedTime: any = null;

async function main() {
await getActiveUser();
renderNavBar(navBarElement);

totalTimeShift = localStorage.getItem("totalTimeShift");
if (totalTimeShift) {
startEndClock.innerHTML = totalTimeShift;

    const startTimeString = localStorage.getItem("startTime");
    startTime = parseInt(startTimeString!);
    console.log(startTime);

    const currentTime = Date.now();
    console.log(currentTime);

    startEndButtonS.style.display = "none";
    startEndButtonE.style.display = "block";

    // const elapsedTime = currentTime - startTime1;
    startClock();

}
}

main();

const dateToday = document.querySelector(".shift**date") as HTMLElement;
const startEndShift = document.querySelector(
".shift**startEndShift"
) as HTMLDivElement;

const startEndButtonS = document.querySelector(
".shift**startEndShift**start"
) as HTMLButtonElement;

const startEndButtonE = document.querySelector(
".shift**startEndShift**end"
) as HTMLButtonElement;

const startEndClock = document.querySelector(
".shift**startEndShift**clock"
) as HTMLDivElement;

const moveToShiftSchedule = document.querySelector(
".moveToShiftSchedule"
) as HTMLButtonElement;

let userDB = null;

async function handleLoadEmployee() {
try {
const response = await fetch("/api/employee/get-employee");
const data = await response.json();
console.log("data", data);
const { employee } = data;
const userName: HTMLDivElement | null = document.querySelector("#userName");

    if (!employee) throw new Error("didn't get admin from DB");
    userDB = employee;
    if (!userName) throw new Error("No user element on DOM");
    userName.innerText = employee.name;

} catch (error) {
console.error(error);
}

dateToday.innerHTML = new Date().toLocaleString();
}

startEndButtonS.addEventListener("click", (e) => {
clearInterval(intervalId);
startEndClock.innerHTML = `00:00:00`;
startTime = Date.now();
console.log(startTime);

currentTime = null;
console.log(formattedTime);
intervalId = null;
startEndButtonS.style.display = "none";
startEndButtonE.style.display = "block";

startClock();
localStorage.setItem("startTime", String(startTime));
});

function updateElapsedTime() {
const currentTime = Date.now();
const elapsedTime = currentTime - startTime;

const hours = Math.floor(elapsedTime / (1000 _ 60 _ 60));
const minutes = Math.floor((elapsedTime % (1000 _ 60 _ 60)) / (1000 _ 60));
const seconds = Math.floor((elapsedTime % (1000 _ 60)) / 1000);

const formattedTime = `${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
startEndClock.innerHTML = formattedTime;
totalTimeShift = formattedTime;
console.log(totalTimeShift);

localStorage.setItem("totalTimeShift", formattedTime);
}

function startClock() {
intervalId = setInterval(updateElapsedTime, 1000);
console.log(intervalId);
}

startEndButtonE.addEventListener("click", (e) => {
startEndButtonS.style.display = "block";
startEndButtonE.style.display = "none";
console.log(intervalId);

stopClock();

localStorage.removeItem("startTime");
localStorage.removeItem("totalTimeShift");
});

function stopClock() {
if (intervalId) {
console.log(totalTimeShift);
clearInterval(intervalId);
intervalId = null;
startTime = Date.now();
fetch("/api/employee/add-attendance", {
method: "POST",
headers: {
Accept: "application/json",
"Content-Type": "application/json",
},
body: JSON.stringify({ userDB, totalTimeShift }),
});
}
}

moveToShiftSchedule.addEventListener("click", (e) => {
const url = new URL(
"../shift-schedule-page/shiftSchedule.html",
window.location.href
);
console.log("new URL:", url.href);
window.location.href = url.href;
});

//shift-schedule///
const navBarElement = document.querySelector(".nav-bar") as HTMLDivElement;
const runningClock = document.querySelector(".running-clock") as HTMLDivElement;

let weekDays;
let nextSunday: Date;
let nextSaturday: Date;
let startTime1: number;
let intervalIdNew = null;
let targetedDayIndex: number;
let targetedRoleType: string;
let targetedRoleCount: number;

async function main() {
await getActiveUser();
renderNavBar(navBarElement);

const totalTimeShift = localStorage.getItem("totalTimeShift");
if (totalTimeShift) {
runningClock.innerHTML = totalTimeShift;

    const startTimeString = localStorage.getItem("startTime");
    startTime1 = parseInt(startTimeString!);
    console.log(startTime1);

    const currentTime = Date.now();
    console.log(currentTime);

    // const elapsedTime = currentTime - startTime1;
    updateClock();

}

renderAllAvailableEmployees();
}

main();

function continueUpdateElapsedTime() {
const currentTime = Date.now();
console.log(currentTime);

const elapsedTime = currentTime - startTime1;
console.log(elapsedTime);

const hours = Math.floor(elapsedTime / (1000 _ 60 _ 60));
const minutes = Math.floor((elapsedTime % (1000 _ 60 _ 60)) / (1000 _ 60));
const seconds = Math.floor((elapsedTime % (1000 _ 60)) / 1000);

const formattedTime = `${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
runningClock.innerHTML = formattedTime;
totalTimeShift = formattedTime;
console.log(totalTimeShift);
localStorage.setItem("totalTimeShift", formattedTime);
}

function updateClock() {
intervalId = setInterval(continueUpdateElapsedTime, 1000);
}
