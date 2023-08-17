const navBarElement = document.querySelector(".nav-bar") as HTMLDivElement;
const runningClock = document.querySelector(".running-clock") as HTMLDivElement;

let weekDays;
let nextSunday: Date;
let nextSaturday: Date;
let startTime1: number;
let intervalIdNew = null;
let targetedDayIndex: number;
let targetedRoleType: string;
let targetedRoleCount: number;
let thisScheduleId: number;

async function main() {
  await getActiveUser();
  renderNavBar(navBarElement);

  const totalTimeShift = localStorage.getItem("totalTimeShift");
  if (totalTimeShift) {
    runningClock.innerHTML = totalTimeShift;

    const startTimeString = localStorage.getItem("startTime");
    startTime1 = parseInt(startTimeString!);
    console.log(startTime1);

    const currentTime = Date.now();
    console.log(currentTime);

    // const elapsedTime = currentTime - startTime1;
    updateClock();
  }

  renderAllAvailableEmployees();
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