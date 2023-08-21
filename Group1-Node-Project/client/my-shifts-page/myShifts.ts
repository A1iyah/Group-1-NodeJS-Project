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
          ".shift-panel"
        ) as HTMLDivElement;

        shiftsTableElem.innerHTML = data.nextWeekSchedule[0]["table"];

        markUserInTable(data.nextWeekSchedule[0]["table"]);
        removePluses(data.nextWeekSchedule[0]["table"]);
      });
  } catch (error) {
    console.error(error);
  }
};

const markUserInTable = (tableHtml: string) =>
{
  const markString = "shifts-panel__role-row__employee-box--marked";
  const markedCells:NodeListOf<HTMLDivElement> = document.querySelectorAll(`.${markString}`);

  if (markedCells){
    markedCells.forEach( cell =>
      {
        cell.classList.remove(markString);
      });
  }

  const allAllocationNamesElem: NodeListOf<HTMLParagraphElement> = document.querySelectorAll(".shifts-panel__role-row__allocation-name");

  allAllocationNamesElem.forEach(allocatedNameElem =>{
    if (allocatedNameElem.innerHTML === user["name"])
    {
      allocatedNameElem.parentElement?.classList.add(markString);
    }
  });
}

const removePluses = (tableHtml: string) =>
{
  const allPlusElem: NodeListOf<HTMLParagraphElement> = document.querySelectorAll(".shifts-panel__role-row__plus");

  allPlusElem.forEach( plusParagraph => {
    plusParagraph.parentElement!.innerHTML = `<p class="shifts-panel__role-row__unassigned-cell">Unassigned</p>`
  });
}