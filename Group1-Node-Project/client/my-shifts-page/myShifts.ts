//import { DateUnit } from "mongoose";
const navBarElement = document.querySelector(".nav-bar") as HTMLDivElement;
const navBarElem = document.querySelector(".nav-bar") as HTMLDivElement;
const runningClock = document.querySelector(".running-clock") as HTMLDivElement;

let user: any;
let userType: number;
let allCompanyEmployeesInRole: object[] = [];

async function main() {
  const data = await loadActiveUser();
  user = data.user;
  userType = data.userType;
  renderNavBar(navBarElem, userType, user);

  // runningClockPage();
  const totalTimeShift = localStorage.getItem("totalTimeShift");
  if (totalTimeShift) {
    runningClock.innerHTML = totalTimeShift;

    const startTimeString = localStorage.getItem("startTime");
    startTime1 = parseInt(startTimeString!);

    const currentTime = Date.now();
    updateClock();
  }

  renderTable();
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

const renderTable = () => {
  try {
    fetch("/api/schedule/get-next-week-schedule", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        //renderShiftsTable(data.nextWeekSchedule[0]);

        const shiftsTableElem = document.querySelector(
          ".shift-table"
        ) as HTMLDivElement;

        shiftsTableElem.innerHTML = data.nextWeekSchedule[0]["table"];
      });
  } catch (error) {
    console.error(error);
  }
};

/** Main function to receive the schedule data of next week, and calls the main rendering func. */
const handleGetScheduleData = () => {
  try {
    fetch("/api/schedule/get-next-week-schedule", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        renderShiftsTable(data.nextWeekSchedule[0]);
      });
  } catch (error) {
    console.error(error);
  }
};

/** Main function to handle rendering of the entire schedule table */
const renderShiftsTable = async (nextWeekSchedule: Object) => {
  const shiftsTable = document.querySelector(".shift-table") as HTMLDivElement;

  let htmlArr: string[] = [];
  let htmlResult: string = "";

  shiftsTable.innerHTML = `<thead class="shift-table__header-container">
  <tr class="shift-table__header-container">
      <th></th>
      ${weekHeadersHtml(nextWeekSchedule["startDate"])}
  </tr>
  </thead>
  <tbody class="shift-table__body-container">
  </tbody>
  `;

  rolesRowsHtml(nextWeekSchedule);
};

/** Returns the html for the table weekdays headers */
const weekHeadersHtml = (startDate: Date): string => {
  const weekDatesArr: Date[] = getScheduleDates(startDate);

  const html: string = weekDatesArr
    .map((day) => {
      return `<th><p>${day.toLocaleDateString("en-Us", {
        weekday: "short",
      })}.</p>
            <p>${day.getDate()}.${day.getMonth()}</p>
            </th>`;
    })
    .join("");

  return html;
};

/** Returns the html of the roles rows and allocation of employees during the week */
const rolesRowsHtml = (nextWeekSchedule: Object) => {
  const scheduleRequirementsArrLenght: number =
    nextWeekSchedule["scheduleRequirements"].length;
  const tableBodyContainer = document.querySelector(
    ".shift-table__body-container"
  ) as HTMLDivElement;

  // Loops on each role type requirement to render it
  for (let i = 0; i < scheduleRequirementsArrLenght; i++) {
    const roleCountRequirement =
      nextWeekSchedule["scheduleRequirements"][i]["numEmployeesRequired"];

    if (roleCountRequirement === 0) continue;

    // Performs rendering of the role row if employees of that role are required in the schedule
    try {
      fetch("/api/employee/get-employees-by-role-type", {
        method: "SEARCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roleType: nextWeekSchedule["scheduleRequirements"][i].roleType,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          const html: string = singleRoleColumnHtml(
            nextWeekSchedule["scheduleRequirements"][i].roleType,
            roleCountRequirement,
            nextWeekSchedule,
            data["employees"]
          );

          tableBodyContainer.innerHTML += html;
        });
    } catch (error) {
      console.error(error);
    }
  }
};

/** renders a single row for role */
const singleRoleColumnHtml = (
  roleType: string,
  roleCountRequirement: number,
  nextWeekSchedule: Object,
  allCompanyEmployeesInRole: object[]
): string => {
  let rowHtmlArr: string[] = [];
  let weekday: string;
  console.log("nextWeekSchedule: ", nextWeekSchedule);

  // loops through the employees in a schedule according to the role and number of times that role is required (rows)
  for (let roleCount = 0; roleCount < roleCountRequirement; roleCount++) {
    let startHtml: string = `<tr class="shift-table__roles-row"><td class="shift-table__role-row__role">${roleType}</td>`;
    rowHtmlArr.push(startHtml);

    // fills the html for the 7 days of the week
    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      weekday = convertWeekdayIndexToWeekdayName(String(dayIndex));

      let employeeNameInSchedule = (
        nextWeekSchedule[weekday] as Array<String>
      ).map((employeeIdInSchedule) => {
        if (!employeeIdInSchedule) return "";

        let companyEmployeeObj = allCompanyEmployeesInRole.find(
          (obj) => obj["_id"] === employeeIdInSchedule
        );
        //console.log("nextWeekSchedule[weekday]: ", nextWeekSchedule[weekday]);

        //console.log("employeeIdInSchedule: ", employeeIdInSchedule);
        //console.log("companyEmployeeObj: ", companyEmployeeObj);

        if (companyEmployeeObj !== undefined) {
          let htmlText: string = `<td class="shift-table__role-row__employee">${companyEmployeeObj["name"]}</td>`;
          rowHtmlArr.push(htmlText);

          const index = (nextWeekSchedule[weekday] as Array<String>).indexOf(
            employeeIdInSchedule
          );
          nextWeekSchedule[weekday].splice(index, 1);
        }

        // else
        // {
        //   rowHtmlArr.push(`<td class="shift-table__role-row__employee">Unassigned</td>`);
        // }
      });

      //console.log(employeeNameInSchedule);
    }

    rowHtmlArr.push(`</tr>`);
  }

  //rowHtmlArr.push(`</tr>`);

  return rowHtmlArr.join("");
};

/** Receives an index number from 0 to 6 and returns the name of the week day as string */
const convertWeekdayIndexToWeekdayName = (weekdayIndex: string): string => {
  switch (weekdayIndex) {
    case "0":
      return "sunday";
      break;

    case "1":
      return "monday";
      break;

    case "2":
      return "tuesday";
      break;

    case "3":
      return "wednesday";
      break;

    case "4":
      return "thursday";
      break;

    case "5":
      return "friday";
      break;

    case "6":
      return "saturday";
      break;

    default:
      return "";
  }
};

/** A helper function.
 * @receives a date
 * @returns an array of Date of a week, starting from the date received
 */
const getScheduleDates = (startDate: Date): Date[] => {
  let weekDatesArr: Date[] = [];
  const nextSunday = new Date(startDate);
  let today = new Date();

  for (let i = 0; i < 7; i++) {
    let newDate = new Date(today.setDate(nextSunday.getDate() + i));
    //console.log(newDate);

    // if (weekDatesArr[i-1])
    // {
    //   if (weekDatesArr[i-1].getDate() > newDate.getDate())
    //   {
    //     newDate = new Date(today.setDate(nextSunday.getDate() + i));
    //   }
    // }

    // if (newDate.getDate() < weekDatesArr[i-1].getDate())
    // {
    //   console.log("yes");

    //   //newDate = new Date(today.setDate(nextSunday.getDate() + (i - 1)));
    // }

    weekDatesArr.push(newDate);
    //i++;
  }

  return weekDatesArr;
};
