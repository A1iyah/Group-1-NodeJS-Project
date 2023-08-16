const navBarElement = document.querySelector(".nav-bar") as HTMLDivElement;
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

async function main() {
  await getActiveUser();

  renderNavBar(navBarElement);
  // runningClockPage(runningClock);
  const totalTimeShift = localStorage.getItem("totalTimeShift");
  if (totalTimeShift) {
    runningClock.innerHTML = totalTimeShift;

    const startTimeString = localStorage.getItem("startTime");
    startTime1 = parseInt(startTimeString!);
    console.log(startTime1);

    const currentTime = Date.now();
    console.log(currentTime);

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
  console.log(currentTime);

  const elapsedTime = currentTime - startTime1;
  console.log(elapsedTime);

  const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
  const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);

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

function renderReportResult(employees) {
  try {
    if (!employees) throw new Error("employees didn't found");

    const html: string = employees.map((employee) => {
      return `
            <div class="reportCard">
              <div class="reportCard__report-details">
                <div class="reportCard__report-details__name">${employee.name}</div>
                <div class="reportCard__report-details__birthday">${employee.birthday}</div>
                <div class="reportCard__report-details__email">${employee.email}</div>
                <div class="reportCard__report-details__phone">${employee.phone}</div>
                <div class="reportCard__report-details__salary">${employee.salaryPerHour}</div>
                <div class="reportCard__report-details__role">${employee.role.name}</div>
              </div>
            </div>
      `;
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
    const employeeDetails = document.querySelector(
      ".employeeDetails"
    ) as HTMLDivElement;
    employeeDetails.innerHTML = html;
  } catch (error) {
    console.log(error);
  }
}

function renderShiftResult(employees) {
  try {
    if (!employees) throw new Error("employee not found");
    attendanceReportTable.style.display = "block";
    for (let i = 0; employees.attendance.length - 1 >= i; i++) {
      const listItem = document.createElement("tr");
      const tdDateHour = document.createElement("td");
      const tdDuration = document.createElement("td");

      tdDateHour.appendChild(
        document.createTextNode(employees.attendance[i].date)
      );
      listItem.appendChild(tdDateHour);
      tdDuration.appendChild(
        document.createTextNode(employees.attendance[i].clock)
      );
      listItem.appendChild(tdDuration);
      attendanceReport?.appendChild(listItem);
    }
  } catch (error) {
    console.log(error);
  }
}

salaryButton.addEventListener("click", (e) => {
  reportsBySalary.style.display = "flex";
  reportsByEmployee.style.display = "none";
  reportsByManager.style.display = "none";
  resetPage();
});

function HandleSalaryUp(ev) {
  try {
    ev.preventDefault();
    const salaryUp = ev.target.elements.salaryUp.value;
    if (!salaryUp) throw new Error("no salary entered");
    resetPage();
    console.log(salaryUp);
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
          console.log(employees.managers);

          renderReportResult(employees.managers);
          renderReportResult(employees.employees);
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
          renderReportResult(employees.employees);
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

    console.log(salaryDown);
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
          console.log(employees.managers);

          renderReportResult(employees.managers);
          renderReportResult(employees.employees);
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
          console.log(employees.employees);

          renderReportResult(employees.employees);
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

    console.log(minSalary, maxSalary);
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
          console.log(employees.employees);
          console.log(employees.managers);

          renderReportResult(employees.managers);
          renderReportResult(employees.employees);
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
          renderReportResult(employees.employees);
        });
    }
  } catch (error) {
    console.log(error);
  }
}

employeeButton.addEventListener("click", (e) => {
  reportsBySalary.style.display = "none";
  reportsByEmployee.style.display = "flex";
  reportsByManager.style.display = "none";

  resetPage();

  if (userType === UserType.Admin) {
    fetch("/api/admin/get-employees-list")
      .then((res) => res.json())
      .then((employees) => {
        try {
          if (!employees) throw new Error("didn't get any data");
          console.log(employees);

          const employeesToShow = employees.employees.employees;
          console.log(employeesToShow);

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
        console.log(employees);

        try {
          if (!employees) throw new Error("didn't get any data");

          const employeesToShow = employees.employees;
          console.log(employeesToShow);

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
    console.log(name);
    console.log(idNumber);

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
        console.log(employeeDB[0]);

        renderReportResult(employeeDB);
        renderShiftResult(employeeDB[0]);
      });
  } catch (error) {
    console.log(error);
  }
}

managerButton.addEventListener("click", (e) => {
  reportsBySalary.style.display = "none";
  reportsByEmployee.style.display = "none";
  reportsByManager.style.display = "flex";
  resetPage();
  fetch("/api/admin/get-managers-list")
    .then((res) => res.json())
    .then((data) => {
      try {
        if (!data) throw new Error("didn't get any data");
        console.log(data);

        const managers = data.managers.managers;
        console.log(managers);

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
    if (!managerDetails) throw new Error("no employee selected");
    console.log(name);
    console.log(idNumber);

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
        console.log(managerDB[0].employees);

        renderReportResult(managerDB);
        renderReportResult(managerDB[0].employees);
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
        console.log(employeeDB);

        renderReportResult(employeeDB);
        renderShiftResult(employeeDB[0]);
      });
  } catch (error) {
    console.log(error);
  }
}

function resetPage() {
  for (let i = salaryReportResult.children.length - 1; i > 0; i--) {
    salaryReportResult.removeChild(salaryReportResult.children[i]);
  }

  for (let i = attendanceReport.children.length - 1; i > 0; i--) {
    attendanceReport.removeChild(attendanceReport.children[i]);
  }
  attendanceReportTable.style.display = "none";
}
