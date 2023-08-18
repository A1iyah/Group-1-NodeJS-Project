//import { DateUnit } from "mongoose";
//import moment from "moment";

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

  const weekDatesArr = getScheduleDates(nextWeekSchedule["startDate"]);


  shiftsTable.innerHTML = `<thead class="shift-table__header-container">
  <tr class="shift-table__header-container">
      <th></th>
      <th><p>Sun.</p>
          <p>13.8</p>
      </th>
      <th><p>Mon.</p>
          <p>14.8</p>
      </th>
      <th><p>Tue.</p>
          <p>15.8</p>
      </th>
      <th><p>Wed.</p>
          <p>16.8</p>
      </th>
      <th><p>Thu.</p>
          <p>17.8</p>
      </th>
      <th><p>Fri.</p>
          <p>17.8</p>
      </th>
      <th><p>Sat.</p>
          <p>19.8</p>
      </th>
  </tr>
</thead>`
  
}

const getScheduleDates = (startDate: Date):Array<Date> =>
{
  let weekDatesArr: Array<Date> = [];
  const today = new Date();

  //const todayMoment = moment();
  // ד

  console.log("startDate: ", startDate);
  console.log("get date: ", (startDate as Date).getDate());
  //console.log("get date: ", startDate.getDate() + 1);
  
  

  for (let i = 0 ; i < 7 ; i++)
  {
    let start: Date = startDate;
    //weekDatesArr.push(start.setDate(startDate.getDate() + i));
  }

  return weekDatesArr;
}
