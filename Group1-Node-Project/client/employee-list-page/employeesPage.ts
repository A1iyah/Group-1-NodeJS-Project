const navBarElement = document.querySelector(".nav-bar") as HTMLDivElement;
const runningClock2 = document.querySelector(
  ".running-clock"
) as HTMLDivElement;

async function main() {
  await getActiveUser();
  renderNavBar(navBarElement);

  const totalTimeShift = localStorage.getItem("totalTimeShift");
  if (totalTimeShift) {
    runningClock2.innerHTML = totalTimeShift;

    const startTimeString = localStorage.getItem("startTime");
    startTime1 = parseInt(startTimeString!);
    console.log(startTime1);

    const currentTime = Date.now();
    console.log(currentTime);

    // const elapsedTime = currentTime - startTime1;
    updateClock();
  }

  // Add employees buttons -
  if (userType === UserType.Employee) {
    openAddButton.style.display = "none";
  } else {
    openAddButton.style.display = "block";
  }
  handleGetWorkers();
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
  runningClock2.innerHTML = formattedTime;
  totalTimeShift = formattedTime;
  console.log(totalTimeShift);
  localStorage.setItem("totalTimeShift", formattedTime);
}

function updateClock() {
  intervalId = setInterval(continueUpdateElapsedTime, 1000);
}

// Admin / Manager button -
const addEmployeeBtn = document.querySelector(
  ".add-employees-btn"
) as HTMLButtonElement;

const addManagerBtn = document.querySelector(
  ".add-managers-btn"
) as HTMLButtonElement;

const openAddButton = document.querySelector(
  ".open-add-btn"
) as HTMLButtonElement;

const addButtonsContainer = document.querySelector(
  ".add-buttons-container"
) as HTMLDivElement;

const addManagersBtnContainer = document.querySelector(
  ".add-managers-button-container"
) as HTMLDivElement;

const addNewEmployeesForm = document.querySelector(
  ".employees-page__add-new-employees"
) as HTMLDivElement;

const addNewManagersForm = document.querySelector(
  ".employees-page__add-new-managers"
) as HTMLDivElement;

let openDiv: HTMLDivElement | null = null;

function updateUIForUserType(userType: UserType) {
  if (userType === UserType.Admin) {
    openAddButton.style.display = "block";
    addButtonsContainer.style.display = "block";
    addManagersBtnContainer.style.display = "block";
  } else if (userType === UserType.Manager) {
    openAddButton.style.display = "block";
    addButtonsContainer.style.display = "block";
    addManagersBtnContainer.style.display = "none";
  } else {
    openAddButton.style.display = "none";
    addButtonsContainer.style.display = "none";
    addManagersBtnContainer.style.display = "none";
  }
}

openAddButton.addEventListener("click", () => {
  if (userType === UserType.Admin) {
    if (addButtonsContainer.style.display === "block") {
      addButtonsContainer.style.display = "none";
    } else {
      addButtonsContainer.style.display = "block";
      addManagersBtnContainer.style.display = "block";
    }
  } else if (userType === UserType.Manager) {
    if (addButtonsContainer.style.display === "block") {
      addButtonsContainer.style.display = "none";
    } else {
      addButtonsContainer.style.display = "block";
    }
  }
});

addEmployeeBtn.addEventListener("click", () => {
  if (openDiv === addNewEmployeesForm) {
    addNewEmployeesForm.style.display = "none";
    openDiv = null;
  } else {
    if (openDiv) {
      openDiv.style.display = "none";
    }
    addNewEmployeesForm.style.display = "block";
    openDiv = addNewEmployeesForm;
  }
});

addManagerBtn.addEventListener("click", () => {
  if (openDiv === addNewManagersForm) {
    addNewManagersForm.style.display = "none";
    openDiv = null;
  } else {
    if (openDiv) {
      openDiv.style.display = "none";
    }
    addNewManagersForm.style.display = "block";
    openDiv = addNewManagersForm;
  }
});
updateUIForUserType(userType);

// Add new employee -
function handleCreateEmployee(evt: any) {
  try {
    evt.preventDefault();
    const name = evt.target.elements.name.value;
    const email = evt.target.elements.email.value;
    const password = evt.target.elements.password.value;
    const idNumber = evt.target.elements.idNumber.value;
    const phone = evt.target.elements.phone.value;
    const birthday = evt.target.elements.birthday.value;
    const salaryPerHour = evt.target.elements.salaryPerHour.value;
    const role = evt.target.elements.role.value;

    console.log(
      name,
      email,
      password,
      idNumber,
      phone,
      birthday,
      salaryPerHour,
      role
    );

    if (!name) throw new Error("No name");
    if (!email) throw new Error("No email");
    if (!password) throw new Error("No password");
    if (!idNumber) throw new Error("No idNumber");
    if (!phone) throw new Error("No phone");
    if (!birthday) throw new Error("No birthday");
    if (!salaryPerHour) throw new Error("No salary");
    if (!role) throw new Error("No role");

    const newEmployee: any = {
      name,
      email,
      password,
      idNumber,
      phone,
      birthday,
      salaryPerHour,
      role,
    };

    fetch("/api/employees-page/add-employee", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEmployee),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });

    addNewEmployeesForm.style.display = "none";
  } catch (error) {
    console.log(error);
  }
}

// Add new manager -
function handleCreateManager(evt: any) {
  try {
    evt.preventDefault();
    const name = evt.target.elements.name.value;
    const email = evt.target.elements.email.value;
    const password = evt.target.elements.password.value;
    const idNumber = evt.target.elements.idNumber.value;
    const phone = evt.target.elements.phone.value;
    const salaryPerHour = evt.target.elements.salaryPerHour.value;
    const birthday = evt.target.elements.birthday.value;
    // const role = e.target.elements.role.value;

    console.log(
      name,
      email,
      password,
      idNumber,
      phone,
      birthday,
      salaryPerHour
    );

    if (!name) throw new Error("No name");
    if (!email) throw new Error("No email");
    if (!password) throw new Error("No password");
    if (!idNumber) throw new Error("No idNumber");
    if (!phone) throw new Error("No phone");
    if (!birthday) throw new Error("No birthday");
    if (!salaryPerHour) throw new Error("No salary");
    // if (!role) throw new Error("No role");

    const newManager: any = {
      name,
      email,
      password,
      idNumber,
      phone,
      birthday,
      salaryPerHour,
      //   role,
    };

    fetch("/api/employees-page/add-manager", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newManager),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });

    addNewManagersForm.style.display = "none";
  } catch (error) {
    console.log(error);
  }
}

// Get all workers -
const handleGetWorkers = () => {
  try {
    const _id = user._id;

    if (userType === UserType.Admin) {
      fetch("/api/employees-page/get-admin-workers", {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id }),
      })
        .then((res) => res.json())
        .then(({ allWorkers }) => {
          try {
            if (!allWorkers) throw new Error("No workers data found");

            renderEmployeeList(allWorkers.managers);
            renderEmployeeList(allWorkers.employees);
          } catch (error) {
            console.log(error, "get-admin-workers error");
          }
        });
    } else if (userType === UserType.Manager) {
      fetch("/api/employees-page/get-manager-employees", {
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
            if (!employees) throw new Error("No employees data found");

            renderEmployeeList(employees.employees);
          } catch (error) {
            console.log(error);
          }
        });
    }
  } catch (error) {
    console.log(error);
  }
};

const renderEmployeeList = (employees: any) => {
  try {
    const htmlStr: string = employees
      .map((employee: any) => {
        return `<div class="employees-page__employeeCard">
        <div class="employee-details">
        <div class="employee-name">${employee.name}</div>
        <div class="employee-birthday">${employee.birthday}</div>
        <div class="employee-email">${employee.email}</div>
        <div class="employee-phone">${employee.phone}</div>
        <div class="employee-role">${employee.role.name}</div>
        </div>
        </div>`;
      })
      .join(" ");

    const getAllEmployees = document.querySelector(
      ".employees-page__get-all-employees"
    ) as HTMLDivElement;
    if (!getAllEmployees) throw new Error("Can't find employees to display.");

    getAllEmployees.innerHTML = htmlStr;
  } catch (error) {
    console.log(error);
  }
};

// const create_Employee_tab = document.querySelector(
//   ".create_Employee_Role"
// ) as HTMLDivElement;
// const create_Manager_tab = document.querySelector(
//   ".create_Manager_Role"
// ) as HTMLDivElement;

// function getRole() {
//   try {
//     fetch("/api/get-roles")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         if (!data) throw new Error("didn't get any data");
//         const role = data.roles;
//         const html: string = role
//           .map((role) => {
//             return `<option> ${role.name}</option>`;
//           })
//           .join(" ");
//         console.log(create_Manager_tab);
//         console.log(create_Employee_tab);
//         create_Employee_tab.innerHTML = `<select class="create_Employee_Role_Select" name="role">${html} </select><br><br>`;
//         create_Manager_tab.innerHTML = `<select class="create_Employee_Role_Select" name="role">${html} </select><br><br>`;
//       });
//   } catch (error) {
//     console.log(error);
//   }
// }

// const create_Employee_Manager = document.querySelector(
//   ".create_Employee_Manager"
// ) as HTMLElement;

// function getManager() {
//   try {
//     fetch("/api/manager/get-managers")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         if (!data) throw new Error("didn't get any data");
//         const manager = data.managers;
//         const html: string = manager
//           .map((manager) => {
//             return `<option>${manager.name}</option>`;
//           })
//           .join(" ");
//         create_Employee_Manager.innerHTML = `<select class="create_Employee_Manager_Select" name="manager">${html} </select><br><br>`;
//       });
//   } catch (error) {
//     console.log(error);
//   }
// }
