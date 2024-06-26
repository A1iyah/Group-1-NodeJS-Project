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
  displayWeekScheduleConfig();
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
        <label for="startDate" class="new-schedule-form__label">Schedule start date:</label>
        <input type="text" class="new-schedule-form__date" name="startDate" value='${nextSunday.toDateString()}' readonly>
        <label for="endDate" class="new-schedule-form__label">Schedule end date:</label>
        <input type="text" class="new-schedule-form__date" name="endDate" value='${nextSaturday.toDateString()}' readonly>
        <p class="new-schedule-form__header">Roles:</p>
        <label for="roleManager" class="new-schedule-form__label">Shift Managers:</label>
        <input type="number" class="new-schedule-form__input" name="roleManager" value="1" readonly>
        <label for="roleCashier" class="new-schedule-form__label">Cashier:</label>
        <input type="number" class="new-schedule-form__input" name="roleCashier" value="1" min="0">
        <label for="roleSales" class="new-schedule-form__label">Sales person:</label>
        <input type="number" class="new-schedule-form__input" name="roleSales" value="1" min="0">
        <input type="submit" value="Create new week schedule" class="new-schedule-form__submit-btn">
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
        <div class="employees-panel__week-display">
          <p class="employees-panel__week-display__text">${weekDaysArr[0].toDateString()} - </p>
          <p class="employees-panel__week-display__text">${weekDaysArr[6].toDateString()}</p>
        </div>

        <div class="employees-panel__employees-list-container">
        </div>
  `;

  // employeesPanelElem.innerHTML = `
  //       <div class="employees-panel__week-display">
  //         <p class="employees-panel__week-display__text"><span class="employees-panel__week-display__week-start">${weekDaysArr[0].toDateString()}</span> - <br><span class="employees-panel__week-display__week-end">${weekDaysArr[6].toDateString()}</span></p>
  //       </div>

  //       <div class="employees-panel__employees-list-container">
  //       </div>
  // `;
};

const renderAllocationsPanel = (
  weekDaysArr: Array<Date>,
  scheduleRequirements: Array<string>
) => {
  const shiftsPanelElem = document.querySelector(
    ".shifts-panel-wrapper"
  ) as HTMLDivElement;

  // shiftsPanelElem.innerHTML = `
  // <div class="shifts-panel__days-header-container">${renderWeekHeaders(
  //   weekDaysArr
  // )}</div>
  // ${renderRoleAllocationsPlaces(weekDaysArr, scheduleRequirements)}
  // `;

  shiftsPanelElem.innerHTML = `
  <table class="shifts-panel">
  <thead class="shifts-panel__header-container">
  <tr class="shifts-panel__header-container">
      <th></th>
  ${renderWeekHeaders(weekDaysArr)}
  </tr>
  </thead>
  <tbody class="shifts-panel__body-container">
  ${renderRoleAllocationsPlaces(weekDaysArr, scheduleRequirements)}
  </tbody>
  </table>`;
};

//border="0" cellpadding="17" width="400" height="100"

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
      return `<th class="shifts-panel__day-box"><p class="shifts-panel__day-box__day">${daysNames[daysCounter]}</p>
      <p class="shifts-panel__day-box__date">${weekDaysArr[
        daysCounter
      ].getDate()} / ${weekDaysArr[daysCounter].getMonth()}</p>
      </th>`;
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

    let oneStringRoleTypeName =
      scheduleRequirements[i]["roleType"] === "Shift Manager"
        ? "ShiftManager"
        : scheduleRequirements[i]["roleType"];

    for (let j = 0; j < numEmployeesRequiredForRole; j++) {
      rolesHtml += `<tr class="shifts-panel__role-row">
      <td class="shifts-panel__role-row__role">
      ${scheduleRequirements[i]["roleType"]}</td>`;

      for (let weekdayIndex = 0; weekdayIndex < 7; weekdayIndex++) {
        rolesHtml += `<td class="shifts-panel__role-row__employee-box shifts-panel__role-row__${oneStringRoleTypeName}-num${j}-weekday${weekdayIndex}">
        <p class="shifts-panel__role-row__plus" onclick="onShiftSelect('${scheduleRequirements[i]["roleType"]}', '${weekdayIndex}', '${j}')">+</p>
        `;
      }
      rolesHtml += "</ td>";
    }
  }


  return rolesHtml;
};

//<img src="./images/add-employee-to-shift.png" alt="add-employee-to-shift" class="shifts-panel__role-row__icon" onclick="onShiftSelect('${scheduleRequirements[i]["roleType"]}', '${weekdayIndex}', '${j}')">

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

const onShiftSelect = (
  roleType: string,
  weekdayIndex: number,
  roleCount: number
) => {
  targetedDayIndex = weekdayIndex;
  targetedRoleType = roleType;
  targetedRoleCount = roleCount;

  handleRollCellMarking(roleType, weekdayIndex, roleCount);
  
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
            <p class="employees-panel__employee-box__employee-name">${employees[i]["name"]}</p>
          </div>`;
  }
};

const unRenderEmployeeComment = () =>
{
  const commentsPanel = document.querySelector(".comments-panel") as HTMLDivElement;
  
  commentsPanel.innerHTML = "";

  commentsPanel.classList.toggle("comments-panel__visible");
}

const renderCommentBox = () =>
{
  const commentsPanel = document.querySelector(".comments-panel") as HTMLDivElement;
  commentsPanel.classList.toggle("comments-panel__visible");
}

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
            commentsPanel!.innerHTML = `<p class="comments-panel__name">${data.dayDB[weekDayString][i]["name"]}</p>
            <p class="comments-panel__comment">${data.dayDB[weekDayString][i]["comment"]}</p> 
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

const handleRollCellMarking = (roleType: string,
  weekdayIndex: number,
  roleCount: number) =>
{
  const flaggedAtt = "shifts-panel__role-row__employee-box--marked";

  const allFlaggedPos: NodeListOf<HTMLDivElement> = document.querySelectorAll(".shifts-panel__role-row__employee-box--marked");
  
  if (allFlaggedPos)
  {
    allFlaggedPos.forEach(element => {
      element.classList.remove(flaggedAtt);
    });
  }

  let targetPos: HTMLDivElement;
  
  if (roleType==="Shift Manager"){
    targetPos = document.querySelector(`.shifts-panel__role-row__ShiftManager-num${roleCount}-weekday${weekdayIndex}`) as HTMLDivElement;
  }
  else{
    targetPos = document.querySelector(`.shifts-panel__role-row__${roleType}-num${roleCount}-weekday${weekdayIndex}`) as HTMLDivElement;
  }

  if (targetPos){
    targetPos.classList.add(flaggedAtt);
  }
}

const processEmployeeAllocation = (
  employeeId: string,
  employeeName: string,
  weekdayIndex: string
) => {
  targetedRoleType =
    targetedRoleType === "Shift Manager" ? "ShiftManager" : targetedRoleType;

  const targetShift = document.querySelector(
    `.shifts-panel__role-row__${targetedRoleType}-num${targetedRoleCount}-weekday${targetedDayIndex}`
  );

  if (!targetShift) {
    console.log("target shift allocation slot not found in DOM");
    return;
  }

  targetShift!.innerHTML = `<p class="shifts-panel__role-row__allocation-name">${employeeName}</p>`;

  const scheduleTable = (
    document.querySelector(".shifts-panel") as HTMLDivElement
  ).innerHTML;

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
        scheduleTable,
      }),
    });
  } catch (error) {
    console.log(error);
  }
};
