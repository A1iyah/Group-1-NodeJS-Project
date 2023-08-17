var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var navBarElem = document.querySelector(".nav-bar");
var runningClock2 = document.querySelector(".running-clock");
var user;
var userType;
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var data, totalTimeShift, startTimeString, currentTime;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loadActiveUser()];
                case 1:
                    data = _a.sent();
                    user = data.user;
                    userType = data.userType;
                    renderNavBar(navBarElem, userType, user);
                    totalTimeShift = localStorage.getItem("totalTimeShift");
                    if (totalTimeShift) {
                        runningClock2.innerHTML = totalTimeShift;
                        startTimeString = localStorage.getItem("startTime");
                        startTime1 = parseInt(startTimeString);
                        console.log(startTime1);
                        currentTime = Date.now();
                        console.log(currentTime);
                        // const elapsedTime = currentTime - startTime1;
                        updateClock();
                    }
                    // Add employees buttons -
                    if (userType === UserType.Employee) {
                        openAddButton.style.display = "none";
                        managerSection.style.display = "none";
                    }
                    else if (userType === UserType.Manager) {
                        openAddButton.style.display = "block";
                        managerSection.style.display = "none";
                    }
                    else {
                        openAddButton.style.display = "block";
                        managerSection.style.display = "block";
                    }
                    handleGetWorkers();
                    return [2 /*return*/];
            }
        });
    });
}
main();
function continueUpdateElapsedTime() {
    var currentTime = Date.now();
    console.log(currentTime);
    var elapsedTime = currentTime - startTime1;
    console.log(elapsedTime);
    var hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    var minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    var formattedTime = String(hours).padStart(2, "0") + ":" + String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
    runningClock2.innerHTML = formattedTime;
    totalTimeShift = formattedTime;
    console.log(totalTimeShift);
    localStorage.setItem("totalTimeShift", formattedTime);
}
function updateClock() {
    intervalId = setInterval(continueUpdateElapsedTime, 1000);
}
// Admin / Manager button -
var openAddButton = document.querySelector(".addButtons__open-add-btn");
var addButtonsContainer = document.querySelector(".addButtons__add-buttons-container");
var addEmployeeBtn = document.querySelector(".addButtons__add-employees-btn");
var addManagersBtnContainer = document.querySelector(".addButtons__add-managers-button-container");
var addManagerBtn = document.querySelector(".addButtons__add-managers-btn");
var addNewEmployeesForm = document.querySelector(".employees-page__add-new-employees");
var addNewManagersForm = document.querySelector(".employees-page__add-new-managers");
var managerSection = document.querySelector(".employees-page__managers-section");
var openDiv = null;
var isFormsOpen = false;
function updateUIForUserType(userType) {
    if (userType === UserType.Admin) {
        openAddButton.style.display = "block";
        addButtonsContainer.style.display = "block";
        addManagersBtnContainer.style.display = "block";
        managerSection.style.display = "block";
    }
    else if (userType === UserType.Manager) {
        openAddButton.style.display = "block";
        addButtonsContainer.style.display = "block";
        addManagersBtnContainer.style.display = "none";
        managerSection.style.display = "none";
    }
    else {
        openAddButton.style.display = "none";
        addButtonsContainer.style.display = "none";
        addManagersBtnContainer.style.display = "none";
        managerSection.style.display = "none";
    }
}
openAddButton.addEventListener("click", function () {
    if (userType === UserType.Admin) {
        if (addButtonsContainer.style.display === "block") {
            addButtonsContainer.style.display = "none";
            addNewEmployeesForm.style.display = "none";
            addNewManagersForm.style.display = "none";
            isFormsOpen = false;
        }
        else {
            addButtonsContainer.style.display = "block";
            addManagersBtnContainer.style.display = "block";
            isFormsOpen = true;
        }
    }
    else if (userType === UserType.Manager) {
        if (addButtonsContainer.style.display === "block") {
            addButtonsContainer.style.display = "none";
            addNewEmployeesForm.style.display = "none";
            addNewManagersForm.style.display = "none";
            isFormsOpen = false;
        }
        else {
            addButtonsContainer.style.display = "block";
            isFormsOpen = true;
        }
    }
});
addEmployeeBtn.addEventListener("click", function () {
    if (openDiv === addNewEmployeesForm) {
        addNewEmployeesForm.style.display = "none";
        openDiv = null;
        isFormsOpen = false;
    }
    else {
        if (openDiv) {
            openDiv.style.display = "none";
        }
        addNewEmployeesForm.style.display = "block";
        openDiv = addNewEmployeesForm;
        isFormsOpen = true;
    }
});
addManagerBtn.addEventListener("click", function () {
    if (openDiv === addNewManagersForm) {
        addNewManagersForm.style.display = "none";
        openDiv = null;
        isFormsOpen = false;
    }
    else {
        if (openDiv) {
            openDiv.style.display = "none";
        }
        addNewManagersForm.style.display = "block";
        openDiv = addNewManagersForm;
        isFormsOpen = true;
    }
});
updateUIForUserType(userType);
// Add new employee -
function handleCreateEmployee(evt) {
    try {
        evt.preventDefault();
        console.log(user._id);
        var managerID_1 = user._id;
        var name_1 = evt.target.elements.name.value;
        var email_1 = evt.target.elements.email.value;
        var password_1 = evt.target.elements.password.value;
        var idNumber_1 = evt.target.elements.idNumber.value;
        var phone_1 = evt.target.elements.phone.value;
        var birthday_1 = evt.target.elements.birthday.value;
        var salaryPerHour_1 = evt.target.elements.salaryPerHour.value;
        var role_1 = evt.target.elements.role.value;
        if (!name_1)
            throw new Error("No name");
        if (!email_1)
            throw new Error("No email");
        if (!password_1)
            throw new Error("No password");
        if (!idNumber_1)
            throw new Error("No idNumber");
        if (!phone_1)
            throw new Error("No phone");
        if (!birthday_1)
            throw new Error("No birthday");
        if (!salaryPerHour_1)
            throw new Error("No salary");
        if (!role_1)
            throw new Error("No role");
        fetch("/api/employees-page/get-role-id", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ targetName: role_1 })
        })
            .then(function (res) { return res.json(); })
            .then(function (data) {
            var newEmployee = {
                name: name_1,
                email: email_1,
                password: password_1,
                idNumber: idNumber_1,
                phone: phone_1,
                birthday: birthday_1,
                salaryPerHour: salaryPerHour_1,
                role: role_1
            };
            fetch("/api/employees-page/add-employee", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name_1,
                    email: email_1,
                    password: password_1,
                    idNumber: idNumber_1,
                    phone: phone_1,
                    birthday: birthday_1,
                    salaryPerHour: salaryPerHour_1,
                    role: role_1,
                    managerID: managerID_1
                })
            })
                .then(function (res) { return res.json(); })
                .then(function (data) {
                console.log(data);
                renderEmployeeList(data.managerDB.employees);
            })["catch"](function (error) {
                console.error(error);
            });
        })["catch"](function (error) {
            console.error(error);
        });
        addNewEmployeesForm.style.display = "none";
        evt.target.elements.name.value = "";
        evt.target.elements.email.value = "";
        evt.target.elements.password.value = "";
        evt.target.elements.idNumber.value = "";
        evt.target.elements.phone.value = "";
        evt.target.elements.birthday.value = "";
        evt.target.elements.salaryPerHour.value = "";
        evt.target.elements.role.value = "";
    }
    catch (error) {
        console.log(error);
    }
}
// Add new manager -
function handleCreateManager(evt) {
    try {
        evt.preventDefault();
        var name = evt.target.elements.name.value;
        var email = evt.target.elements.email.value;
        var password = evt.target.elements.password.value;
        var idNumber = evt.target.elements.idNumber.value;
        var phone = evt.target.elements.phone.value;
        var salaryPerHour = evt.target.elements.salaryPerHour.value;
        var birthday = evt.target.elements.birthday.value;
        // const role = e.target.elements.role.value;
        console.log(name, email, password, idNumber, phone, birthday, salaryPerHour);
        if (!name)
            throw new Error("No name");
        if (!email)
            throw new Error("No email");
        if (!password)
            throw new Error("No password");
        if (!idNumber)
            throw new Error("No idNumber");
        if (!phone)
            throw new Error("No phone");
        if (!birthday)
            throw new Error("No birthday");
        if (!salaryPerHour)
            throw new Error("No salary");
        // if (!role) throw new Error("No role");
        var newManager = {
            name: name,
            email: email,
            password: password,
            idNumber: idNumber,
            phone: phone,
            birthday: birthday,
            salaryPerHour: salaryPerHour
        };
        fetch("/api/employees-page/add-manager", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newManager)
        })
            .then(function (res) { return res.json(); })
            .then(function (data) {
            console.log(data);
            renderEmployeeList(data.adminDB.employees);
            renderManagersList(data.adminDB.managers);
        })["catch"](function (error) {
            console.error(error);
        });
        addNewManagersForm.style.display = "none";
        evt.target.elements.name.value = "";
        evt.target.elements.email.value = "";
        evt.target.elements.password.value = "";
        evt.target.elements.idNumber.value = "";
        evt.target.elements.phone.value = "";
        evt.target.elements.salaryPerHour.value = "";
        evt.target.elements.birthday.value = "";
    }
    catch (error) {
        console.log(error);
    }
}
// Get all workers -
var handleGetWorkers = function () {
    try {
        var _id = user._id;
        console.log(_id);
        if (userType === UserType.Admin) {
            fetch("/api/employees-page/get-admin-workers", {
                method: "PATCH",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ _id: _id })
            })
                .then(function (res) { return res.json(); })
                .then(function (_a) {
                var allWorkers = _a.allWorkers;
                try {
                    if (!allWorkers)
                        throw new Error("No workers data found");
                    console.log(allWorkers);
                    renderEmployeeList(allWorkers.employees);
                    renderManagersList(allWorkers.managers);
                }
                catch (error) {
                    console.log(error, "get-admin-workers error");
                }
            });
        }
        else if (userType === UserType.Manager) {
            fetch("/api/employees-page/get-manager-employees", {
                method: "PATCH",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ _id: _id })
            })
                .then(function (res) { return res.json(); })
                .then(function (_a) {
                var employees = _a.employees;
                try {
                    if (!employees)
                        throw new Error("No employees data found");
                    renderEmployeeList(employees.employees);
                }
                catch (error) {
                    console.log(error);
                }
            });
        }
        else if (userType === UserType.Employee) {
            fetch("/api/employees-page/get-my-team", {
                method: "PATCH",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ _id: _id })
            })
                .then(function (res) { return res.json(); })
                .then(function (_a) {
                var myTeamEmployees = _a.myTeamEmployees;
                try {
                    if (!myTeamEmployees)
                        throw new Error("No employees data found");
                    console.log(myTeamEmployees);
                    renderEmployeeList(myTeamEmployees);
                }
                catch (error) {
                    console.log(error);
                }
            });
        }
    }
    catch (error) {
        console.log(error);
    }
};
var renderEmployeeList = function (employees) {
    try {
        console.log(employees);
        var htmlStr = employees
            .map(function (employee) {
            return "<div class=\"employees-page__employeeCard\">\n        <div class=\"employee-details\">\n        <div class=\"employee-name\">" + employee.name + "</div>\n        <div class=\"employee-birthday\">" + employee.birthday + "</div>\n        <div class=\"employee-email\">" + employee.email + "</div>\n        <div class=\"employee-phone\">" + employee.phone + "</div>\n        <div class=\"employee-role\">" + employee.role.name + "</div>\n        </div>\n        </div>";
        })
            .join(" ");
        var getAllEmployees = document.querySelector(".employees-page__employees-section__get-all-employees");
        if (!getAllEmployees)
            throw new Error("Can't find employees to display.");
        getAllEmployees.innerHTML = htmlStr;
    }
    catch (error) {
        console.log(error);
    }
};
var renderManagersList = function (managers) {
    try {
        var htmlStr = managers
            .map(function (manager) {
            return "<div class=\"employees-page__managerCard\" \">\n        <div class=\"manager-details\">\n        <div class=\"manager-name\">" + manager.name + "</div>\n        <div class=\"manager-birthday\">" + manager.birthday + "</div>\n        <div class=\"manager-email\">" + manager.email + "</div>\n        <div class=\"manager-phone\">" + manager.phone + "</div>\n        <div class=\"manager-role\">" + manager.role.name + "</div>\n        </div>\n        </div>";
        })
            .join(" ");
        var getAllManagers = document.querySelector(".employees-page__managers-section__get-all-managers");
        if (!getAllManagers)
            throw new Error("Can't find employees to display.");
        getAllManagers.innerHTML = htmlStr;
    }
    catch (error) {
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
