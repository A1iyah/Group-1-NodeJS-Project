let userType: UserType;
let user: any;
enum UserType {
  Admin,
  Manager,
  Employee,
}

// const navBarElem = document.querySelector(".nav-bar") as HTMLDivElement;

// async function main() {
//   await getActiveUser();

//   renderNavBar(navBarElement);
// }
// main();

async function getActiveUser() {
  try {
    const responseManager = await fetch("/api/manager/get-manager");

    const dataManager = await responseManager.json();
    const { manager } = dataManager;

    if (dataManager.ok === true && manager._id !== null) {
      userType = UserType.Manager;
      user = manager;
      return;
    }
  } catch (error) {
    console.error("test");
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
      targetDivEle = document.querySelector(".nav-bar__link__employee-manager");
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
    (targetDivEle as HTMLDivElement).classList.add("nav-bar__link--bold");
  }
};

const gotoPage = (targetPage: string) => {
  window.location.href = targetPage;
};
