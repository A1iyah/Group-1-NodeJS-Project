const navBarElement = document.querySelector(".nav-bar") as HTMLDivElement;
const userName = document.querySelector("#userName") as HTMLDivElement;

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

async function main() {
  await getActiveUser();

  renderNavBar(navBarElement);
}

main();

function renderReportResult(employees) {
  try {
    if (!employees) throw new Error("employees didn't found");

    for (let i = 0; i < employees.length; i++) {
      // const employeeToShow = employees[i];
      const listItem = document.createElement("tr");
      const tdName = document.createElement("td");
      const tdBirthday = document.createElement("td");
      const tdEmail = document.createElement("td");
      const tdPhone = document.createElement("td");
      const tdSalaryPerHour = document.createElement("td");
      const tdRole = document.createElement("td");

      tdName.appendChild(document.createTextNode(employees[i].name));
      listItem.appendChild(tdName);
      tdBirthday.appendChild(document.createTextNode(employees[i].birthday));
      listItem.appendChild(tdBirthday);
      tdEmail.appendChild(document.createTextNode(employees[i].email));
      listItem.appendChild(tdEmail);
      tdPhone.appendChild(document.createTextNode(employees[i].phone));
      listItem.appendChild(tdPhone);
      tdSalaryPerHour.appendChild(
        document.createTextNode(employees[i].salaryPerHour)
      );
      listItem.appendChild(tdSalaryPerHour);

      if (employees[i].role) {
        tdRole.appendChild(document.createTextNode(employees[i].role.name));
        listItem.appendChild(tdRole);
      } else {
        tdRole.appendChild(document.createTextNode("manager"));
        listItem.appendChild(tdRole);
      }
      salaryReportResult?.appendChild(listItem);
    }
  } catch (error) {
    console.log(error);
  }
}

salaryButton.addEventListener("click", (e) => {
  reportsBySalary.style.display = "flex";
  reportsByEmployee.style.display = "none";
  reportsByManager.style.display = "none";
  for (let i = salaryReportResult.children.length - 1; i > 0; i--) {
    salaryReportResult.removeChild(salaryReportResult.children[i]);
  }
});

function HandleSalaryUp(ev) {
  try {
    ev.preventDefault();
    const salaryUp = ev.target.elements.salaryUp.value;
    if (!salaryUp) throw new Error("no salary entered");

    for (let i = salaryReportResult.children.length - 1; i > 0; i--) {
      salaryReportResult.removeChild(salaryReportResult.children[i]);
    }
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

    for (let i = salaryReportResult.children.length - 1; i > 0; i--) {
      salaryReportResult.removeChild(salaryReportResult.children[i]);
    }

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

    for (let i = salaryReportResult.children.length - 1; i > 0; i--) {
      salaryReportResult.removeChild(salaryReportResult.children[i]);
    }

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

  for (let i = salaryReportResult.children.length - 1; i > 0; i--) {
    salaryReportResult.removeChild(salaryReportResult.children[i]);
  }

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

    for (let i = salaryReportResult.children.length - 1; i > 0; i--) {
      salaryReportResult.removeChild(salaryReportResult.children[i]);
    }

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
        console.log(employeeDB);

        renderReportResult(employeeDB);
      });
  } catch (error) {
    console.log(error);
  }
}

managerButton.addEventListener("click", (e) => {
  reportsBySalary.style.display = "none";
  reportsByEmployee.style.display = "none";
  reportsByManager.style.display = "flex";
  for (let i = salaryReportResult.children.length - 1; i > 0; i--) {
    salaryReportResult.removeChild(salaryReportResult.children[i]);
  }

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
    for (let i = salaryReportResult.children.length - 1; i > 0; i--) {
      salaryReportResult.removeChild(salaryReportResult.children[i]);
    }
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
        renderReportResult(managerDB);
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
      });
  } catch (error) {
    console.log(error);
  }
}
