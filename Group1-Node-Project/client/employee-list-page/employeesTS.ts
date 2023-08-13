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

  addEmployeeBtn.addEventListener("click", () => {
    if (addNewUsers.style.display === "none") {
      addNewUsers.style.display = "block";
    } else {
      addNewUsers.style.display = "none";
    }
  });
}
main();

// Admin / Manager button -
const addEmployeeBtn = document.querySelector(
  ".add-users-btn"
) as HTMLButtonElement;
const addNewUsers = document.querySelector(".add-new-users") as HTMLDivElement;

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
    const salary = evt.target.elements.salary.value;
    // const role = evt.target.elements.role.value;

    console.log(name, email, password, idNumber, phone, birthday, salary);

    if (!name) throw new Error("No name");
    if (!email) throw new Error("No email");
    if (!password) throw new Error("No password");
    if (!idNumber) throw new Error("No idNumber");
    if (!phone) throw new Error("No phone");
    if (!birthday) throw new Error("No birthday");
    if (!salary) throw new Error("No salary");
    // if (!role) throw new Error("No role");

    const newEmployee: any = {
      name,
      email,
      password,
      idNumber,
      phone,
      birthday,
      salary,
      //   role,
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
function handleCreateManager(evt: any) {
  try {
    evt.preventDefault();
    const name = evt.target.elements.name.value;
    const email = evt.target.elements.email.value;
    const password = evt.target.elements.password.value;
    const idNumber = evt.target.elements.idNumber.value;
    const phone = evt.target.elements.phone.value;
    const salary = evt.target.elements.salary.value;
    const birthday = evt.target.elements.birthday.value;
    // const role = e.target.elements.role.value;

    console.log(name, email, password, idNumber, phone, birthday, salary);

    if (!name) throw new Error("No name");
    if (!email) throw new Error("No email");
    if (!password) throw new Error("No password");
    if (!idNumber) throw new Error("No idNumber");
    if (!phone) throw new Error("No phone");
    if (!birthday) throw new Error("No birthday");
    if (!salary) throw new Error("No salary");
    // if (!role) throw new Error("No role");

    const newManager: any = {
      name,
      email,
      password,
      idNumber,
      phone,
      birthday,
      salary,
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
  } catch (error) {
    console.log(error);
  }
}

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
            .map((employee) => {
              return `<div class="employeeCard">
                <tr>
                <td> ${employee.name} </td>
                <td> ${employee.birthday} </td>
                <td> ${employee.email} </td>
                <td> ${employee.phone} </td>
                <td> ${employee.role} </td>
                </tr>
                </div>`;
            })
            .join(" ");

          const getAllEmployees = document.querySelector(
            ".get-all-employees"
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

// Display all workers -
// const renderWorkersToScreen = () => {
//   try {
//   } catch (error) {
//     console.log(error);
//   }
// };

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
