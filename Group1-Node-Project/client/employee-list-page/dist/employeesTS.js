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
function main() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getActiveUser()];
                case 1:
                    _a.sent();
                    renderNavBar(navBarElement);
                    return [2 /*return*/];
            }
        });
    });
}
main();
function handleCreateManager(e) {
    e.preventDefault();
    var name = e.target.elements.name.value;
    var email = e.target.elements.email.value;
    var password = e.target.elements.password.value;
    var idNumber = e.target.elements.idNumber.value;
    var phone = e.target.elements.phone.value;
    var salary = e.target.elements.salary.value;
    var birthday = e.target.elements.birthday.value;
    var role = e.target.elements.role.value;
    console.log(name, email, password, idNumber, phone, birthday, salary, role);
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
    if (!role)
        throw new Error("No role");
    var newManager = { name: name, email: email, password: password, idNumber: idNumber, phone: phone, birthday: birthday, salary: salary, role: role };
    fetch("/api/add-manager", {
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
;
function handleCreateEmployee(e) {
    e.preventDefault();
    var name = e.target.elements.name.value;
    var email = e.target.elements.email.value;
    var password = e.target.elements.password.value;
    var idNumber = e.target.elements.idNumber.value;
    var phone = e.target.elements.phone.value;
    var birthday = e.target.elements.birthday.value;
    var salary = e.target.elements.salary.value;
    var role = e.target.elements.role.value;
    console.log(name, email, password, idNumber, phone, birthday, salary, role);
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
    if (!role)
        throw new Error("No role");
    var newEmployee = { name: name, email: email, password: password, idNumber: idNumber, phone: phone, birthday: birthday, salary: salary, role: role };
    fetch("/api/add-employee", {
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
;
var create_Employee_tab = document.querySelector(".create_Employee_Role");
var create_Manager_tab = document.querySelector(".create_Manager_Role");
function getRole() {
    try {
        fetch("/api/get-roles")
            .then(function (res) { return res.json(); })
            .then(function (data) {
            console.log(data);
            if (!data)
                throw new Error("didn't get any data");
            var role = data.roles;
            var html = role.map(function (role) {
                return "<option> " + role.name + "</option>";
            }).join(" ");
            console.log(create_Manager_tab);
            console.log(create_Employee_tab);
            create_Employee_tab.innerHTML = "<select class= \"create_Employee_Role_Select\" name=\"role\">" + html + " </select><br><br>";
            create_Manager_tab.innerHTML = "<select class= \"create_Employee_Role_Select\" name=\"role\">" + html + " </select><br><br>";
        });
    }
    catch (error) {
        console.log(error);
    }
}
var create_Employee_Manager = document.querySelector(".create_Employee_Manager");
function getManager() {
    fetch("/api/get-managers")
        .then(function (res) { return res.json(); })
        .then(function (data) {
        console.log(data);
        if (!data)
            throw new Error("didn't get any data");
        var manager = data.managers;
        var html = manager.map(function (manager) {
            return "<option>" + manager.name + "</option>";
        }).join(" ");
        create_Employee_Manager.innerHTML = "<select class= \"create_Employee_Manager_Select\" name=\"manager\">" + html + " </select><br><br>";
    });
}
