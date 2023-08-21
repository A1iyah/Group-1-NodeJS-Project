const navBarElem = document.querySelector(".nav-bar") as HTMLDivElement;
const userName = document.querySelector("#userName") as HTMLDivElement;
const runningClock = document.querySelector(".running-clock") as HTMLDivElement;

const salaryButton = document.querySelector(
  ".reportButtons__salary"
) as HTMLDivElement;

const managerButton = document.querySelector(
  ".reportButtons__manager"
) as HTMLDivElement;

const employeeButton = document.querySelector(
  ".reportButtons__employee"
) as HTMLDivElement;

const reportsBySalary = document.querySelector(
  ".salaryReports"
) as HTMLDivElement;

const employeesList = document.querySelector(
  ".employeeReports__byEmployee__List"
) as HTMLDivElement;

const managersList = document.querySelector(
  ".managerReports__byManager__List"
) as HTMLDivElement;

const reportsByManager = document.querySelector(
  ".managerReports"
) as HTMLDivElement;

const reportsByEmployee = document.querySelector(
  ".employeeReports"
) as HTMLDivElement;

const reportSalaryUp = document.querySelector(
  ".salaryReports__salaryUp"
) as HTMLDivElement;

const salaryReportResult = document.querySelector(
  "#salaryReportResult"
) as HTMLTableElement;

const reportSalaryDown = document.querySelector(
  ".salaryReports__salaryDown"
) as HTMLDivElement;

const reportSalaryBetween = document.querySelector(
  ".salaryReports__between"
) as HTMLDivElement;

const attendanceReport = document.querySelector(
  "#attendanceReport"
) as HTMLTableElement;

const attendanceReportTable = document.querySelector(
  ".attendanceReport"
) as HTMLTableElement;

const employeeDetails = document.querySelector(
  ".employeeDetails"
) as HTMLDivElement;

const managerDetails = document.querySelector(
  ".managerDetails"
) as HTMLDivElement;

const employeeAttendance = document.querySelector(
  ".employeeAttendance"
) as HTMLDivElement;

let user: any;
let userType: number;

async function main() {
  const data = await loadActiveUser();
  user = data.user;
  userType = data.userType;
  renderNavBar(navBarElem, userType, user);

  // runningClockPage(runningClock);
  const totalTimeShift = localStorage.getItem("totalTimeShift");
  if (totalTimeShift) {
    runningClock.innerHTML = totalTimeShift;

    const startTimeString = localStorage.getItem("startTime");
    startTime1 = parseInt(startTimeString!);

    const currentTime = Date.now();

    updateClock();
  }

  if (userType === UserType.Employee) {
    employeeUsingReport();
  } else if (userType === UserType.Manager) {
    managerButton.style.display = "none";
    employeeButton.style.display = "inline-block";
    salaryButton.style.display = "inline-block";
  } else if (userType === UserType.Admin) {
    managerButton.style.display = "inline-block";
    employeeButton.style.display = "inline-block";
    salaryButton.style.display = "inline-block";
  }
}

main();

function continueUpdateElapsedTime() {
  const currentTime = Date.now();

  const elapsedTime = currentTime - startTime1;

  const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
  const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);

  const formattedTime = `${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  runningClock.innerHTML = formattedTime;
  totalTimeShift = formattedTime;
  localStorage.setItem("totalTimeShift", formattedTime);
}

function updateClock() {
  intervalId = setInterval(continueUpdateElapsedTime, 1000);
}

function renderReportResultManager(managers: any) {
  try {
    if (!managers) throw new Error("employees didn't found");
    const html: string = managers
      .map((manager) => {
        return `
            <div class="reportCard">
            <div class="reportCard__report-details">
            <div class="reportCard__report-details__name">${manager.name}</div>
            <div class="reportCard__report-details__birthday">${manager.birthday}</div>
            <div class="reportCard__report-details__email">${manager.email}</div>
            <div class="reportCard__report-details__phone">${manager.phone}</div>
            <div class="reportCard__report-details__salary">${manager.salaryPerHour}$</div>
            <div class="reportCard__report-details__role">${manager.role.name}</div>
            </div>
          </div>
      `;
      })
      .join(" ");

    managerDetails.innerHTML = html;
  } catch (error) {
    console.log(error);
  }
}

function renderReportResultEmployees(employees: any) {
  try {
    if (!employees) throw new Error("employees didn't found");

    const html: string = employees
      .map((employee) => {
        return `
            <div class="reportCard">
              <div class="reportCard__report-details">
                <div class="reportCard__report-details__name">${employee.name}</div>
                <div class="reportCard__report-details__birthday">${employee.birthday}</div>
                <div class="reportCard__report-details__email">${employee.email}</div>
                <div class="reportCard__report-details__phone">${employee.phone}</div>
                <div class="reportCard__report-details__salary">${employee.salaryPerHour}$</div>
                <div class="reportCard__report-details__role">${employee.role.name}</div>
              </div>
            </div>
      `;
      })
      .join(" ");

    employeeDetails.innerHTML = html;
  } catch (error) {
    console.log(error);
  }
}

function renderShiftResult(employees) {
  try {
    if (!employees) throw new Error("employee not found");
    attendanceReportTable.style.display = "block";
    let attendanceArr = employees.attendance;

    const html: string = attendanceArr
      .map((attendance) => {
        return `
            <div class="reportsPageDates">
              <div class="reportsPageDates__details">
                <div class="reportsPageDates__details__date">${attendance.date}</div>
                <div class="reportsPageDates__details__clock">${attendance.clock}</div>
              </div>
            </div>
      `;
      })
      .join(" ");

    employeeAttendance.innerHTML = html;
  } catch (error) {
    console.log(error);
  }
}

let isSalaryReportsOpen = false;
let isEmployeeReportsOpen = false;
let isManagerReportsOpen = false;

salaryButton.addEventListener("click", (e) => {
  resetPage();

  if (!isSalaryReportsOpen) {
    reportsBySalary.style.display = "flex";
    isSalaryReportsOpen = true;
  } else {
    reportsBySalary.style.display = "none";
    isSalaryReportsOpen = false;
  }

  reportsByEmployee.style.display = "none";
  reportsByManager.style.display = "none";
});

function HandleSalaryUp(ev) {
  try {
    resetPage();
    ev.preventDefault();
    const salaryUp = ev.target.elements.salaryUp.value;
    if (!salaryUp) throw new Error("no salary entered");

    if (userType === UserType.Admin) {
      const _id = user._id;

      fetch("/api/admin/get-selected-salaryUp", {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ salaryUp, _id }),
      })
        .then((res) => res.json())
        .then(({ employees }) => {
          renderReportResultManager(employees.managers);
          renderReportResultEmployees(employees.employees);
        });
    } else if (userType === UserType.Manager) {
      const _id = user._id;
      fetch("/api/manager/get-selected-salaryUp", {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ salaryUp, _id }),
      })
        .then((res) => res.json())
        .then(({ employees }) => {
          renderReportResultEmployees(employees.employees);
        });
    }
  } catch (error) {
    console.log(error);
  }
}

function HandleSalaryDown(ev) {
  try {
    ev.preventDefault();
    const salaryDown = ev.target.elements.salaryDown.value;
    if (!salaryDown) throw new Error("no salary entered");

    resetPage();

    if (userType === UserType.Admin) {
      const _id = user._id;

      fetch("/api/admin/get-selected-salaryDown", {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ salaryDown, _id }),
      })
        .then((res) => res.json())
        .then(({ employees }) => {
          renderReportResultManager(employees.managers);
          renderReportResultEmployees(employees.employees);
        });
    } else if (userType === UserType.Manager) {
      const _id = user._id;

      fetch("/api/manager/get-selected-salaryDown", {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ salaryDown, _id }),
      })
        .then((res) => res.json())
        .then(({ employees }) => {
          renderReportResultEmployees(employees.employees);
        });
    }
  } catch (error) {
    console.log(error);
  }
}

function HandleSalaryBetween(ev) {
  try {
    ev.preventDefault();
    const minSalary = ev.target.elements.minSalary.value;
    const maxSalary = ev.target.elements.maxSalary.value;
    if (!minSalary) throw new Error("no minSalary entered");
    if (!maxSalary) throw new Error("no maxSalary entered");

    resetPage();

    if (userType === UserType.Admin) {
      const _id = user._id;
      fetch("/api/admin/get-selected-salaryBetween", {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ minSalary, maxSalary, _id }),
      })
        .then((res) => res.json())
        .then(({ employees }) => {
          renderReportResultManager(employees.managers);
          renderReportResultEmployees(employees.employees);
        });
    } else if (userType === UserType.Manager) {
      const _id = user._id;
      fetch("/api/manager/get-selected-salaryBetween", {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ minSalary, maxSalary, _id }),
      })
        .then((res) => res.json())
        .then(({ employees }) => {
          renderReportResultEmployees(employees.employees);
        });
    }
  } catch (error) {
    console.log(error);
  }
}

employeeButton.addEventListener("click", (e) => {
  const _id = user._id;
  reportsBySalary.style.display = "none";
  reportsByEmployee.style.display = "flex";
  reportsByManager.style.display = "none";

  resetPage();

  if (!isEmployeeReportsOpen) {
    reportsByEmployee.style.display = "flex";
    isEmployeeReportsOpen = true;
  } else {
    reportsByEmployee.style.display = "none";
    isEmployeeReportsOpen = false;
  }

  reportsBySalary.style.display = "none";
  reportsByManager.style.display = "none";

  if (userType === UserType.Admin) {
    fetch("/api/admin/get-employees-list")
      .then((res) => res.json())
      .then((employees) => {
        try {
          if (!employees) throw new Error("didn't get any data");

          const employeesToShow = employees.employees.employees;

          const html1: string = employeesToShow
            .map((employee) => {
              return `<option> ${employee.name} - ${employee.idNumber}</option>`;
            })
            .join(" ");

          employeesList.innerHTML = `<select class="employeeReports__byEmployee__List" name="employees">${html1}</select>`;
        } catch (error) {
          console.log(error);
        }
      });
  } else if (userType === UserType.Manager) {
    const _id = user._id;

    fetch("/api/manager/get-employees-list", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id }),
    })
      .then((res) => res.json())
      .then(({ employees }) => {
        try {
          if (!employees) throw new Error("didn't get any data");

          const employeesToShow = employees.employees;

          const html1: string = employeesToShow
            .map((employee) => {
              return `<option> ${employee.name} - ${employee.idNumber}</option>`;
            })
            .join(" ");

          employeesList.innerHTML = `<select class="employeeReports__byEmployee__List" name="employees">${html1}</select>`;
        } catch (error) {
          console.log(error);
        }
      });
  }
});

function HandleEmployeeReport(ev) {
  try {
    ev.preventDefault();

    resetPage();

    const employeeDetails = ev.target.elements.employees.value;

    const [name, idNumber] = employeeDetails
      .match(/^(.*?)\s-\s(\d+)$/)
      .slice(1);

    if (!employeeDetails) throw new Error("no employee selected");

    fetch("/api/employee/get-selected-employee", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idNumber }),
    })
      .then((res) => res.json())
      .then(({ employeeDB }) => {
        console.log(employeeDB);

        renderReportResultEmployees(employeeDB);
        renderShiftResult(employeeDB[0]);
      });
  } catch (error) {
    console.log(error);
  }
}

managerButton.addEventListener("click", (e) => {
  resetPage();

  if (!isManagerReportsOpen) {
    reportsByManager.style.display = "flex";
    isManagerReportsOpen = true;
  } else {
    reportsByManager.style.display = "none";
    isManagerReportsOpen = false;
  }

  reportsBySalary.style.display = "none";
  reportsByEmployee.style.display = "none";

  fetch("/api/admin/get-managers-list")
    .then((res) => res.json())
    .then((data) => {
      try {
        if (!data) throw new Error("didn't get any data");

        const managers = data.managers.managers;

        const html1: string = managers
          .map((manager) => {
            return `<option> ${manager.name} - ${manager.idNumber}</option>`;
          })
          .join(" ");

        managersList.innerHTML = `<select class="managerReports__byManager__List" name="managers">${html1}</select>`;
      } catch (error) {
        console.log(error);
      }
    });
});

function HandleManagerReport(ev) {
  try {
    resetPage();
    ev.preventDefault();
    const managerDetails = ev.target.elements.managers.value;
    const [name, idNumber] = managerDetails.match(/^(.*?)\s-\s(\d+)$/).slice(1);
    console.log(name, idNumber);

    if (!managerDetails) throw new Error("no employee selected");

    fetch("/api/manager/get-selected-manager", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idNumber }),
    })
      .then((res) => res.json())
      .then(({ managerDB }) => {
        console.log(managerDB);

        renderReportResultManager(managerDB);
        renderReportResultEmployees(managerDB[0].employees);
        renderShiftResult(managerDB[0]);
      });
  } catch (error) {
    console.log(error);
  }
}

function employeeUsingReport() {
  try {
    const idNumber = user.idNumber;
    fetch("/api/employee/get-selected-employee", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idNumber }),
    })
      .then((res) => res.json())
      .then(({ employeeDB }) => {
        renderReportResultEmployees(employeeDB);
        renderShiftResult(employeeDB[0]);
      });
  } catch (error) {
    console.log(error);
  }
}

function resetPage() {
  managerDetails.innerHTML = "";
  employeeDetails.innerHTML = "";
  attendanceReportTable.style.display = "none";
  employeeAttendance.innerHTML = "";
}
