let userType: UserType;
let user: any;
enum UserType {
  Admin,
  Manager,
  Employee,
}

async function loadActiveUser() {
  try {
    const response = await fetch("/api/cookies/get-user");

    const data = await response.json();
    const { user } = data;

    const userType = data.userType;
    if (!user) throw new Error("didn't get from DB");

    return data;
  } catch (error) {
    console.error(error);
  }
}

const renderNavBar = (
  navBarElem: HTMLDivElement,
  userType: number,
  user: any
) => {
  let targetDivEle;

  if (!navBarElem) console.error("no nav bar HTMLDivElement received");

  switch (userType) {
    case UserType.Admin:
      let navBarHtml: string = `<div class="nav-bar__links-group">
      <p class="nav-bar__link nav-bar__link__employees" onclick="gotoPage('../employee-list-page/employeesPage.html')">Employees</p>
      <p class="nav-bar__link nav-bar__link__reports" onclick="gotoPage('../reports-page/reportsPage.html')">Reports</p>
      <p class="nav-bar__link nav-bar__link__shift-schedule" onclick="gotoPage('../shift-schedule-page/shiftSchedule.html')">Schedule</p>
                </div>
                <div>
                <button onclick="gotoPage('../index.html')" class="nav-bar__link__logOut">
                <span class="material-symbols-outlined">
                mode_off_on
                </span>
                <p class="nav-bar__user-name">${user.name}</p>
                </button>     
                </div>`;
      navBarElem.innerHTML = navBarHtml;
      break;
    case UserType.Manager:
      navBarHtml = `<div class="nav-bar__links-group">
                <p class="nav-bar__link nav-bar__link__employee-manager" onclick="gotoPage('../managerHP/managerHP.html')">Start/End Shift</p>
                <p class="nav-bar__link nav-bar__link__my-shifts" onclick="gotoPage('../my-shifts-page/myShifts.html')">My Shifts</p>
                <p class="nav-bar__link nav-bar__link__employees" onclick="gotoPage('../employee-list-page/employeesPage.html')">Employees</p>
                <p class="nav-bar__link nav-bar__link__reports" onclick="gotoPage('../reports-page/reportsPage.html')">Reports</p>
                <p class="nav-bar__link nav-bar__link__availability" onclick="gotoPage('../availability-page/availabilityPage.html')">Availability</p>
                <p class="nav-bar__link nav-bar__link__shift-schedule" onclick="gotoPage('../shift-schedule-page/shiftSchedule.html')">Schedule</p>
                </div>
                <div>
                <button onclick="gotoPage('../index.html')" class="nav-bar__link__logOut">
                <span class="material-symbols-outlined">
                mode_off_on
                </span>
                <p class="nav-bar__user-name">${user.name}</p>
                </button>                
                </div>`;
      navBarElem.innerHTML = navBarHtml;
      break;

    case UserType.Employee:
      navBarHtml = `<div class="nav-bar__links-group">
                <p class="nav-bar__link nav-bar__link__employee-manager" onclick="gotoPage('../employeeHP/employeeHP.html')">Start/End Shift</p>
                <p class="nav-bar__link nav-bar__link__my-shifts" onclick="gotoPage('../my-shifts-page/myShifts.html')">My Shifts</p>
                <p class="nav-bar__link nav-bar__link__employees" onclick="gotoPage('../employee-list-page/employeesPage.html')">Employees</p>
                <p class="nav-bar__link nav-bar__link__reports" onclick="gotoPage('../reports-page/reportsPage.html')">Reports</p>
                <p class="nav-bar__link nav-bar__link__availability" onclick="gotoPage('../availability-page/availabilityPage.html')">Availability</p>
                </div>
                <div>
                <button onclick="gotoPage('../index.html')" class="nav-bar__link__logOut">
                <span class="material-symbols-outlined">
                mode_off_on
                </span>
                <p class="nav-bar__user-name">${user.name}</p>
                </button>     
                </div>`;
      navBarElem.innerHTML = navBarHtml;
  }

  switch (window.location.pathname) {
    case "/employeeHP/employeeHP.html":
      targetDivEle = document.querySelector(".nav-bar__link__employee-manager");
      break;

    case "/managerHP/managerHP.html":
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

    case "/employee-list-page/employeesPage.html":
      targetDivEle = document.querySelector(".nav-bar__link__employees");
      break;

    case "/reports-page/reportsPage.html":
      targetDivEle = document.querySelector(".nav-bar__link__reports");
      break;
  }

  if (targetDivEle) {
    (targetDivEle as HTMLDivElement).classList.add("nav-bar__link--bold");
  }
};

const gotoPage = (targetPage: string) => {
  window.location.href = targetPage;
};
