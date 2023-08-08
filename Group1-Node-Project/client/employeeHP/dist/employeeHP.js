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
var dateToday = document.querySelector(".shift__date");
var startEndShift = document.querySelector(".shift__startEndShift");
var startEndButtonS = document.querySelector(".shift__startEndShift__start");
var startEndButtonE = document.querySelector(".shift__startEndShift__end");
var startEndClock = document.querySelector(".shift__startEndShift__clock");
var userDB = null;
function handleLoadEmployee() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, employee, userName, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("/api/employee/get-employee")];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    console.log("data", data);
                    employee = data.employee;
                    userName = document.querySelector("#userName");
                    if (!employee)
                        throw new Error("didn't get admin from DB");
                    userDB = employee;
                    if (!userName)
                        throw new Error("No user element on DOM");
                    userName.innerText = employee.name;
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3 /*break*/, 4];
                case 4:
                    dateToday.innerHTML = new Date().toLocaleString();
                    return [2 /*return*/];
            }
        });
    });
}
var startTime = Date.now();
var currentTime = null;
var intervalId = null;
var totalTimeShift = null;
var formattedTime = null;
startEndButtonS.addEventListener("click", function (e) {
    clearInterval(intervalId);
    startEndClock.innerHTML = "00:00:00";
    startTime = Date.now();
    currentTime = null;
    console.log(formattedTime);
    intervalId = null;
    startEndButtonS.style.display = "none";
    startEndButtonE.style.display = "block";
    startClock();
});
function updateElapsedTime() {
    var currentTime = Date.now();
    var elapsedTime = currentTime - startTime;
    var hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    var minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    var formattedTime = String(hours).padStart(2, "0") + ":" + String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
    startEndClock.innerHTML = formattedTime;
    totalTimeShift = formattedTime;
}
function startClock() {
    intervalId = setInterval(updateElapsedTime, 1000);
}
startEndButtonE.addEventListener("click", function (e) {
    startEndButtonS.style.display = "block";
    startEndButtonE.style.display = "none";
    stopClock();
});
function stopClock() {
    if (intervalId) {
        console.log(totalTimeShift);
        clearInterval(intervalId);
        intervalId = null;
        startTime = Date.now();
        fetch("/api/employee/add-attendance", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userDB: userDB, totalTimeShift: totalTimeShift })
        });
    }
}
