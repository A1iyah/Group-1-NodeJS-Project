//import { DateUnit } from "mongoose";
const navBarElement = document.querySelector(".nav-bar") as HTMLDivElement;
const navBarElem = document.querySelector(".nav-bar") as HTMLDivElement;
const runningClock = document.querySelector(".running-clock") as HTMLDivElement;

let user: any;
let userType: number;

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
    console.log(startTime1);

    const currentTime = Date.now();
    console.log(currentTime);

  }
  
  handleShiftsDisplay();
}
main();

function continueUpdateElapsedTime() {
  const currentTime = Date.now();
  console.log(currentTime);

  const elapsedTime = currentTime - startTime1;
  console.log(elapsedTime);

  const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
  const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);

  const formattedTime = `${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  runningClock.innerHTML = formattedTime;
  totalTimeShift = formattedTime;
  console.log(totalTimeShift);
  localStorage.setItem("totalTimeShift", formattedTime);
}

function updateClock() {
  intervalId = setInterval(continueUpdateElapsedTime, 1000);
}

const handleShiftsDisplay = () =>
{
  console.log("handling shift dis");
  

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
        console.log("data: ", data.nextWeekSchedule[0]);
        renderShiftsTable(data.nextWeekSchedule[0]);
        

        
      });
  } catch (error) {
    console.error(error);
  }
}

const renderShiftsTable = (nextWeekSchedule: Object) =>
{
  const shiftsTable = document.querySelector(".shift-table") as HTMLDivElement;

  shiftsTable.innerHTML = `<thead class="shift-table__header-container">
  <tr class="shift-table__header-container">
      <th></th>
      ${weekHeadersHtml(nextWeekSchedule["startDate"])}
  </tr>
  </thead>
  <tbody class="shift-table__body-container">
  ${rolesAndAllocationHtml(nextWeekSchedule)}
  </tbody>
  `
  
}

/** Returns the html for the table weekdays headers */
const weekHeadersHtml = (startDate: Date):string => {
  const weekDatesArr: Date[] = getScheduleDates(startDate);
  
  const html:string = weekDatesArr.map( (day) => {
    return `<th><p>${day.toLocaleDateString('en-Us', {weekday: 'short'})}.</p>
            <p>${day.getDate()}.${day.getMonth()}</p>
            </th>`;
  }).join("");

  return html;
}

/** Returns an array of dates of the a whole week.
 * @receives a date
 * @returns an array of Date of a week, starting from the date received
 */ 
const getScheduleDates = (startDate: Date): Date[] =>
{
  let weekDatesArr: Date[] = [];
  const nextSunday = new Date(startDate);
  let today = new Date();

  for (let i = 0 ; i < 7 ; i++)
  {
    let newDate = new Date(today.setDate(nextSunday.getDate() + i));
    weekDatesArr.push(newDate)
  }

  return weekDatesArr;
}

/** Returns the html of the roles and allocation of employees during the week */
const rolesAndAllocationHtml = (nextWeekSchedule: Object):string =>
{
  const scheduleRequirementsArrLenght: number = nextWeekSchedule["scheduleRequirements"].length;
  let htmlArr: string[] = []; 
  let resultHtml: string = "";
  
  for (let i = 0 ; i < scheduleRequirementsArrLenght ; i++)
  {
    const tableRowStartHtml = `<tr class="shift-table__roles-row">
    <td class="shift-table__role-row__role">Shift Manager</td>`;

    const tableRowCloseHtml = `</tbody>`;

    htmlArr.push(tableRowStartHtml);
    
    const roleCountRequirement = nextWeekSchedule["scheduleRequirements"][i]["numEmployeesRequired"];

    if (roleCountRequirement > 0)
    
    {
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
            console.log("data: ", data.nextWeekSchedule[0]);
            renderShiftsTable(data.nextWeekSchedule[0]);
            
    
            
          });
      } catch (error) {
        console.error(error);
      }



      for (let roleCount = 0 ; roleCount < roleCountRequirement ; roleCount++)
      {
      const html:string = singleRoleColumnHtml(nextWeekSchedule["scheduleRequirements"][i].roleType, roleCount, nextWeekSchedule);
      htmlArr.push(html);
      }
    }
    
    

    htmlArr.push(tableRowCloseHtml);
  }
  
  return resultHtml.concat(...htmlArr);
}

const singleRoleColumnHtml = (roleType: string, roleCount: number, nextWeekSchedule: Object):string =>
{


  return "";
}