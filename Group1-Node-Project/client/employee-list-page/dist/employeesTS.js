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
var navBarElement = document.querySelector(".nav-bar");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getActiveUser()];
                case 1:
                    _a.sent();
                    renderNavBar(navBarElement);
                    if (userType === UserType.Employee) {
                        handleGetWorkers();
                        addEmployeeBtn.style.display = "none";
                    }
                    else {
                        handleGetWorkers();
                        addEmployeeBtn.style.display = "block";
                    }
                    addEmployeeBtn.addEventListener("click", function () {
                        if (addNewUsers.style.display === "none") {
                            addNewUsers.style.display = "block";
                        }
                        else {
                            addNewUsers.style.display = "none";
                        }
                    });
                    return [2 /*return*/];
            }
        });
    });
}
main();
// Admin / Manager button -
var addEmployeeBtn = document.querySelector(".add-users-btn");
var addNewUsers = document.querySelector(".add-new-users");
// Add new employee -
function handleCreateEmployee(evt) {
    try {
        evt.preventDefault();
        var name = evt.target.elements.name.value;
        var email = evt.target.elements.email.value;
        var password = evt.target.elements.password.value;
        var idNumber = evt.target.elements.idNumber.value;
        var phone = evt.target.elements.phone.value;
        var birthday = evt.target.elements.birthday.value;
        var salary = evt.target.elements.salary.value;
        // const role = evt.target.elements.role.value;
        console.log(name, email, password, idNumber, phone, birthday, salary);
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
        if (!salary)
            throw new Error("No salary");
        // if (!role) throw new Error("No role");
        var newEmployee = {
            name: name,
            email: email,
            password: password,
            idNumber: idNumber,
            phone: phone,
            birthday: birthday,
            salary: salary
        };
        fetch("/api/employees-page/add-employee", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newEmployee)
        })
            .then(function (res) { return res.json(); })
            .then(function (data) {
            console.log(data);
        })["catch"](function (error) {
            console.error(error);
        });
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
        var salary = evt.target.elements.salary.value;
        var birthday = evt.target.elements.birthday.value;
        // const role = e.target.elements.role.value;
        console.log(name, email, password, idNumber, phone, birthday, salary);
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
        if (!salary)
            throw new Error("No salary");
        // if (!role) throw new Error("No role");
        var newManager = {
            name: name,
            email: email,
            password: password,
            idNumber: idNumber,
            phone: phone,
            birthday: birthday,
            salary: salary
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
        })["catch"](function (error) {
            console.error(error);
        });
    }
    catch (error) {
        console.log(error);
    }
}
// Get all workers -
var handleGetWorkers = function () {
    try {
        var _id = user._id;
        fetch("/api/employees-page/get-workers", {
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
                var displayEmployees = employees.employees;
                var htmlStr = displayEmployees
                    .map(function (employee) {
                    return "<div class=\"employeeCard\">\n                <tr>\n                <td> " + employee.name + " </td>\n                <td> " + employee.birthday + " </td>\n                <td> " + employee.email + " </td>\n                <td> " + employee.phone + " </td>\n                <td> " + employee.role + " </td>\n                </tr>\n                </div>";
                })
                    .join(" ");
                var getAllEmployees = document.querySelector(".get-all-employees");
                if (!getAllEmployees)
                    throw new Error("Can't find employees to display.");
                getAllEmployees.innerHTML = htmlStr;
            }
            catch (error) {
                console.log();
            }
        });
    }
    catch (error) {
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
