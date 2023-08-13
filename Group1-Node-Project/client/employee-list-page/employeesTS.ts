const navBarElement = document.querySelector(".nav-bar") as HTMLDivElement;
async function main() {
  await getActiveUser();

  renderNavBar(navBarElement);

  if (userType === UserType.Employee) {
    handleGetWorkers();
    addEmployeeBtn.style.display = "none";
  } else {
    handleGetWorkers();
    addEmployeeBtn.style.display = "block";
  }
}
main();

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

const addNewEmployees = document.querySelector(
  ".employees-page__add-new-employees"
) as HTMLDivElement;

const addNewManagers = document.querySelector(
  ".employees-page__add-new-managers"
) as HTMLDivElement;

let openDiv: HTMLDivElement | null = null;

openAddButton.addEventListener("click", () => {
  if (addButtonsContainer.style.display === "block") {
    addButtonsContainer.style.display = "none";
    if (openDiv) {
      openDiv.style.display = "none";
      openDiv = null;
    }
  } else {
    addButtonsContainer.style.display = "block";
  }
});

addEmployeeBtn.addEventListener("click", () => {
  if (openDiv === addNewEmployees) {
    addNewEmployees.style.display = "none";
    openDiv = null;
  } else {
    if (openDiv) {
      openDiv.style.display = "none";
    }
    addNewEmployees.style.display = "block";
    openDiv = addNewEmployees;
  }
});

addManagerBtn.addEventListener("click", () => {
  if (openDiv === addNewManagers) {
    addNewManagers.style.display = "none";
    openDiv = null;
  } else {
    if (openDiv) {
      openDiv.style.display = "none";
    }
    addNewManagers.style.display = "block";
    openDiv = addNewManagers;
  }
});

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
  } catch (error) {
    console.log(error);
  }
}

// Add new manager -
// function handleCreateManager(evt: any) {
//   try {
//     evt.preventDefault();
//     const name = evt.target.elements.name.value;
//     const email = evt.target.elements.email.value;
//     const password = evt.target.elements.password.value;
//     const idNumber = evt.target.elements.idNumber.value;
//     const phone = evt.target.elements.phone.value;
//     const salaryPerHour = evt.target.elements.salaryPerHour.value;
//     const birthday = evt.target.elements.birthday.value;
//     // const role = e.target.elements.role.value;

//     console.log(name, email, password, idNumber, phone, birthday, salaryPerHour);

//     if (!name) throw new Error("No name");
//     if (!email) throw new Error("No email");
//     if (!password) throw new Error("No password");
//     if (!idNumber) throw new Error("No idNumber");
//     if (!phone) throw new Error("No phone");
//     if (!birthday) throw new Error("No birthday");
//     if (!salaryPerHour) throw new Error("No salary");
//     // if (!role) throw new Error("No role");

//     const newManager: any = {
//       name,
//       email,
//       password,
//       idNumber,
//       phone,
//       birthday,
//       salaryPerHour,
//       //   role,
//     };

//     fetch("/api/employees-page/add-manager", {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(newManager),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   } catch (error) {
//     console.log(error);
//   }
// }

// Get all workers -
const handleGetWorkers = () => {
  try {
    const _id = user._id;

    fetch("/api/employees-page/get-workers", {
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

          const displayEmployees = employees.employees;

          const htmlStr: string = displayEmployees
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
          if (!getAllEmployees)
            throw new Error("Can't find employees to display.");

          getAllEmployees.innerHTML = htmlStr;
        } catch (error) {
          console.log();
        }
      });
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
