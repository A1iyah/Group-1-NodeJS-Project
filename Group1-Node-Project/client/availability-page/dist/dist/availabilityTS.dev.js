"use strict";

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = void 0 && (void 0).__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

exports.__esModule = true;

var jsonwebtoken_1 = require("jsonwebtoken");

var secret = "secret";
document.addEventListener("DOMContentLoaded", function () {
  var buttons = Array.from(document.querySelectorAll(".availability-button"));
  var form = document.getElementById("availabilityForm");
  buttons.forEach(function (button) {
    button.addEventListener("click", toggleButton);
  });
  form.addEventListener("submit", handleFormSubmit);
}); ////////////////////////////////////////////////////////

function toggleButton(event) {
  var clickedButton = event.target;
  var day = clickedButton.getAttribute("data-day");

  if (clickedButton.textContent === "✅") {
    clickedButton.textContent = "❌";
  } else {
    clickedButton.textContent = "✅";
  }
} ////////////////////////////////////////////////////////


function handleFormSubmit(event) {
  return __awaiter(this, void 0, void 0, function () {
    var buttons, availabilityData, comment, commentValue, userId, response, error_1;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          event.preventDefault();
          buttons = Array.from(document.querySelectorAll(".availability-button"));
          availabilityData = {};
          buttons.forEach(function (button) {
            var day = button.getAttribute("data-day");
            var isAvailable = button.textContent === "✅";

            if (day) {
              availabilityData[day] = isAvailable;
            }
          });
          comment = document.getElementById("comment");
          commentValue = comment.value;
          userId = getUserID();
          _a.label = 1;

        case 1:
          _a.trys.push([1, 3,, 4]);

          return [4
          /*yield*/
          , fetch("/api/availability/update/" + userId, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              availabilityData: availabilityData,
              commentValue: commentValue
            })
          })];

        case 2:
          response = _a.sent();

          if (response.ok) {
            console.log("Availability updated successfully");
          } else {
            console.error("Error updating availability");
          }

          return [3
          /*break*/
          , 4];

        case 3:
          error_1 = _a.sent();
          console.error("Error:", error_1);
          return [3
          /*break*/
          , 4];

        case 4:
          return [2
          /*return*/
          ];
      }
    });
  });
} // Retrieve the user's ID from the "manager" cookie (manager login only !) -


function getUserID() {
  var managerCookie = document.cookie.split("; ").find(function (row) {
    return row.startsWith("manager=");
  });

  if (managerCookie) {
    var _a = managerCookie.split("="),
        managerToken = _a[1];

    var decoded = jsonwebtoken_1["default"].decode(managerToken);
    var managerId = decoded.managerId;
    return managerId;
  }

  return null;
}