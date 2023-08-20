const navBarElem = document.querySelector(".nav-bar") as HTMLDivElement;
const runningClock = document.querySelector(".running-clock") as HTMLDivElement;

let weekDays;
let nextSunday: Date;
let nextSaturday: Date;
let startTime1: number;
let intervalIdNew = null;
let targetedDayIndex: number;
let targetedRoleType: string;
let targetedRoleCount: number;

let user: any;
let userType: number;
let thisScheduleId: number;

async function main() {
  const data = await loadActiveUser();
  user = data.user;
  userType = data.userType;

  renderNavBar(navBarElem, userType, user);
  const totalTimeShift = localStorage.getItem("totalTimeShift");
  if (totalTimeShift) {
    runningClock.innerHTML = totalTimeShift;

    const startTimeString = localStorage.getItem("startTime");
    startTime1 = parseInt(startTimeString!);

    const currentTime = Date.now();

    updateClock();
  }
  renderAllAvailableEmployees();
}

main();

function continueUpdateElapsedTime() {
  const currentTime = Date.now();

  const elapsedTime = currentTime - startTime1;

  const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
  const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);

  const formattedTime = `${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  runningClock.innerHTML = formattedTime;
  totalTimeShift = formattedTime;
  localStorage.setItem("totalTimeShift", formattedTime);
}

function updateClock() {
  intervalId = setInterval(continueUpdateElapsedTime, 1000);
}

/** Renders the form to create a new week */
const displayWeekScheduleConfig = () => {
  const newScheduleFormElem = document.querySelector(
    ".new-schedule-form"
  ) as HTMLDivElement;

  nextSunday = getNextSundayDate(new Date());
  nextSaturday = getNextSaturdayDate(new Date());

  newScheduleFormElem.innerHTML = `
      <form onsubmit="createNewWeekSchedule(event)">
        <label for="startDate">New schedule starts at:</label>
        <input type="text" class="new-schedule-form__date" name="startDate" value='${nextSunday.toDateString()}' readonly>
        <label for="endDate">New schedule end's at:</label>
        <input type="text" class="new-schedule-form__date" name="endDate" value='${nextSaturday.toDateString()}' readonly>
        <p class="new-schedule-form__header">Roles:</p>
        <label for="roleManager">Shift Managers:</label>
        <input type="number" class="new-schedule-form__role-count" name="roleManager" value="1" readonly>
        <label for="roleCashier">Cashier:</label>
        <input type="number" class="new-schedule-form__role-count" name="roleCashier" value="1" min="0">
        <label for="roleSales">Sales person:</label>
        <input type="number" class="new-schedule-form__role-count" name="roleSales" value="1" min="0">
        <input type="submit">
      </form>
  `;
};

/** creates a new week schedule on form submitted */
const createNewWeekSchedule = (eve) => {
  eve.preventDefault();

  const cashierCount = eve.target.elements.roleCashier.value;
  const salesCount = eve.target.elements.roleSales.value;

  try {
    fetch("/api/schedule/create-new-week-for-scheduling", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nextSunday: nextSunday.toLocaleDateString(),
        cashierCount,
        salesCount,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data) throw new Error("no schedule data received from DB.");

        const weekDaysArr: Array<Date> = getWeekDaysDatesArr(
          new Date(data.weekSchedule.startDate)
        );

        thisScheduleId = data["weekSchedule"]._id;

        renderEmployeesPanel(weekDaysArr);
        renderAllocationsPanel(
          weekDaysArr,
          data.weekSchedule.scheduleRequirements
        );
      });
  } catch (error) {
    console.log(error);
  }
};

/** Calc. start and the end of dates of next week and renders them */
const renderEmployeesPanel = (weekDaysArr: Array<Date>) => {
  const employeesPanelElem = document.querySelector(
    ".employees-panel"
  ) as HTMLDivElement;
  // const weekStartElem = document.querySelector(".employees-panel__week-displayer__week-start") as HTMLDivElement;
  // const weekEndElem = document.querySelector(".employees-panel__week-displayer__week-end") as HTMLDivElement;

  employeesPanelElem.innerHTML = `
        <div class="employees-panel__week-displayer">
          <p class="employees-panel__week-displayer__text"><span class="employees-panel__week-displayer__week-start">${weekDaysArr[0].toDateString()}</span> - <br><span class="employees-panel__week-displayer__week-end">${weekDaysArr[6].toDateString()}</span></p>
        </div>

        <div class="employees-panel__search-box">
          
          <!-- <div class="employees-panel__search-box__search-box"> -->
            <form onsubmit="testt(event)">
              <input type="image" src="./images/magnifying-glass.png" alt="magnifying-glass" class="employees-panel__search-box__image">
              <label for="name"></label>
              <input type="text" name="name" class="employees-panel__search-box__text" value="Search employee">
            </form>
          <!-- </div> -->
        </div>

        <div class="employees-panel__employees-list-container">
          
        </div>

        <div class="comments-panel"></div>
  `;
};

const renderAllocationsPanel = (
  weekDaysArr: Array<Date>,
  scheduleRequirements: Array<string>
) => {
  const shiftsPanelElem = document.querySelector(
    ".shifts-panel"
  ) as HTMLDivElement;

  shiftsPanelElem.innerHTML = `
  <div class="shifts-panel__days-header-container">${renderWeekHeaders(
    weekDaysArr
  )}</div>
  ${renderRoleAllocationsPlaces(weekDaysArr, scheduleRequirements)}
  `;
};

const renderWeekHeaders = (weekDaysArr: Array<Date>): string => {
  const daysNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let daysCounter: number = -1;

  const daysHeadersHtml = weekDaysArr
    .map((dayHeader) => {
      daysCounter++;
      return `<div class="shifts-panel__day-box">
      <p class="shifts-panel__day-box__day">${daysNames[daysCounter]}</p>
      <p class="shifts-panel__day-box__date">${weekDaysArr[
        daysCounter
      ].getDate()} / ${weekDaysArr[daysCounter].getMonth()}</p>
      </div>`;
    })
    .join("");

  return daysHeadersHtml;
};

const renderRoleAllocationsPlaces = (
  weekDaysArr: Array<Date>,
  scheduleRequirements: Array<string>
): string => {
  const numRolesInScheduleRequirements = scheduleRequirements.length;
  let rolesCounter: number = -1;
  let weekDayCounter: number = -1;

  let rolesHtml: string = "";

  for (let i = 0; i < numRolesInScheduleRequirements; i++) {
    const numEmployeesRequiredForRole =
      scheduleRequirements[i]["numEmployeesRequired"];
    if (numEmployeesRequiredForRole === 0) continue;
    
    let oneStringRoleTypeName = (scheduleRequirements[i]["roleType"] === "Shift Manager") ? "ShiftManager" : (scheduleRequirements[i]["roleType"]);

    for (let j = 0; j < numEmployeesRequiredForRole; j++) {
      rolesHtml += `<div class="shifts-panel__role-row"><p class="shifts-panel__role-row__title">${scheduleRequirements[i]["roleType"]}</p>`;


      for (let weekdayIndex = 0; weekdayIndex < 7; weekdayIndex++) {
        rolesHtml += `<div class="shifts-panel__role-row__${oneStringRoleTypeName}-num${j}-weekday${weekdayIndex}">
        <img src="./images/add-employee-to-shift.png" alt="add-employee-to-shift" class="shifts-panel__role-row__icon" onclick="onShiftSelect('${scheduleRequirements[i]["roleType"]}', '${weekdayIndex}', '${j}')"></div>`;
      }
      rolesHtml += "</div>";
    }
  }

  return rolesHtml;
};

const getNextSundayDate = (todayDate: Date): Date => {
  const date = new Date(
    todayDate.getFullYear(),
    todayDate.getMonth(),
    todayDate.getDate() - todayDate.getDay() + 7
  );

  return date;
};

const getNextSaturdayDate = (todayDate: Date): Date => {
  const date = new Date(
    todayDate.getFullYear(),
    todayDate.getMonth(),
    todayDate.getDate() + (6 - todayDate.getDay()) + 7
  );

  return date;
};

const getWeekDaysDatesArr = (startDate: Date): Array<Date> => {
  let weekDaysArr: Array<Date> = [];

  for (let i = 0; i < 7; i++) {
    weekDaysArr.push(
      new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate() + (i - startDate.getDay())
      )
    );
  }

  return weekDaysArr;
};

const renderAllAvailableEmployees = async () => {
  // console.log("renderAllAvailableEmployees called");
  // fetch('/api/availability/get-all-available-employees')
  // .then( (res) => res.json())
  // .then( (data) =>
  // {
  //   try {
  //     if (!data) throw new Error("did not get available employees from DB");
  //     //console.log("weeks data: ", data.weekDays[0]);
  //     weekDays = data.weekDays[0];
  //     console.log(weekDays);
  //     console.log(weekDays["Sunday"]);
  //     //console.log("try: ", weekDays[1]);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // })
};

const onShiftSelect = (
  roleType: string,
  weekdayIndex: number,
  roleCount: number
) => {
  targetedDayIndex = weekdayIndex;
  targetedRoleType = roleType;
  targetedRoleCount = roleCount;

  try {
    fetch("/api/availability/get-employees-by-role-and-weekday", {
      method: "SEARCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role: roleType,
        weekday: weekdayIndex,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        processShiftSelection(data.employees, roleType, weekdayIndex);
      });
  } catch (error) {
    console.error(error);
  }
};

const processShiftSelection = (
  allAvailableEmployees: Array<Object>,
  roleType: string,
  weekdayIndex: number
) => {
  let allAvailableEmployeesOnDay: Array<string> = [];

  switch (String(weekdayIndex)) {
    case "0":
      allAvailableEmployeesOnDay = allAvailableEmployees[0]["sundayMorning"];
      break;

    case "1":
      allAvailableEmployeesOnDay = allAvailableEmployees[0]["mondayMorning"];
      break;

    case "2":
      allAvailableEmployeesOnDay = allAvailableEmployees[0]["tuesdayMorning"];
      break;

    case "3":
      allAvailableEmployeesOnDay = allAvailableEmployees[0]["wednesdayMorning"];
      break;

    case "4":
      allAvailableEmployeesOnDay = allAvailableEmployees[0]["thursdayMorning"];
      break;

    case "5":
      allAvailableEmployeesOnDay = allAvailableEmployees[0]["fridayMorning"];
      break;

    case "6":
      allAvailableEmployeesOnDay = allAvailableEmployees[0]["saturdayMorning"];
      break;
  }

  try {
    fetch("/api/role/get-role-id-by-name", {
      method: "SEARCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ targetName: roleType }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data) throw new Error("no name of Id found on DB");

        renderEmployeesPanelByRole(
          data.roleId[0]._id,
          allAvailableEmployeesOnDay,
          weekdayIndex
        );
      });
  } catch (error) {
    console.error(error);
  }
};

const renderEmployeesPanelByRole = (
  roleId: string,
  employees: Array<string>,
  weekdayIndex: number
) => {
  const commentsPanel = document.querySelector(".comments-panel");
  if (commentsPanel) {
    commentsPanel.innerHTML = "";
  }

  const employeeslengh: number = employees.length;

  const employeesNamesList = document.querySelector(
    ".employees-panel__employees-list-container"
  );

  if (!employeesNamesList)
    throw new Error(
      "did not find employees-panel__employees-list-container on DOM."
    );

  employeesNamesList.innerHTML = " ";

  for (let i = 0; i < employeeslengh; i++) {
    if (employees[i]["role"] !== roleId) continue;

    const comment: string = employees[i]["comment"];

    employeesNamesList.innerHTML += `<div class="employees-panel__employee-box" onmouseover="renderEmployeeComment('${employees[i]["employeeId"]}', '${weekdayIndex}')" onclick="processEmployeeAllocation('${employees[i]["employeeId"]}', '${employees[i]["name"]}', '${weekdayIndex}')">
            <p class="employees-panel__employee-name">${employees[i]["name"]}</p>
            <div class="employees-panel__employee-box__markings-container">
            </div>
          </div>`;
  }
};

const renderEmployeeComment = (
  targetEmployeeId: string,
  weekdayIndex: number
) => {
  const commentsPanel = document.querySelector(".comments-panel");

  try {
    fetch("/api/availability/get-comment-by-employee-id-and-weekday", {
      method: "SEARCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ employeeId: targetEmployeeId, weekdayIndex }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data) throw new Error("no comment of Id found on DB");

        const weekDayString = convertWeekIndexToDayString(String(weekdayIndex));
        const dayDBLenght = data.dayDB[weekDayString].length;

        for (let i = 0; i < dayDBLenght; i++) {
          if (data.dayDB[weekDayString][i]["employeeId"] === targetEmployeeId) {
            commentsPanel!.innerHTML = `<p>${data.dayDB[weekDayString][i]["comment"]}</p> 
          `;
            break;
          }
        }
      });
  } catch (error) {
    console.error(error);
  }
};

const convertWeekIndexToDayString = (weekdayIndex: string): string => {
  switch (weekdayIndex) {
    case "0":
      return "sundayMorning";
      break;
    case "1":
      return "mondayMorning";
      break;
    case "2":
      return "tuesdayMorning";
      break;
    case "3":
      return "wednesdayMorning";
      break;
    case "4":
      return "thursdayMorning";
      break;
    case "5":
      return "fridayMorning";
      break;
    case "6":
      return "saturdayMorning";
      break;

    default:
      console.log("no day shift index received");

      return "null";
      break;
  }
};

// const processEmployeeAllocation = (
//   employeeId: string,
//   employeeName: string
// ) => {

//   targetedRoleType = (targetedRoleType === "Shift Manager") ? "ShiftManager" : targetedRoleType;

//   const targetShift = document.querySelector(
//     `.shifts-panel__role-row__${targetedRoleType}-num${targetedRoleCount}-weekday${targetedDayIndex}`
//   );

//   console.log(targetShift);


  const processEmployeeAllocation = (
    employeeId: string,
    employeeName: string,
    weekdayIndex: string
  ) => {
    targetedRoleType = (targetedRoleType === "Shift Manager") ? "ShiftManager" : targetedRoleType;

    const targetShift = document.querySelector(
      `.shifts-panel__role-row__${targetedRoleType}-num${targetedRoleCount}-weekday${targetedDayIndex}`
    );

    if (!targetShift) {
      console.log("target shift allocation slot not found in DOM");
      return;
    }

    targetShift!.innerHTML = `<p class="shifts-panel__role-row__allocation-name">${employeeName}</p>`;

    const scheduleTable = (document.querySelector(".shifts-panel") as HTMLDivElement).innerHTML;

    try {
      fetch("/api/schedule/add-employee-to-schedule", {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          thisScheduleId,
          employeeId,
          weekdayIndex,
          scheduleTable
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

