const dateToday = document.querySelector(".shift__date") as HTMLElement;
const startEndShift = document.querySelector(
  ".shift__startEndShift"
) as HTMLDivElement;

const startEndButtonS = document.querySelector(
  ".shift__startEndShift__start"
) as HTMLButtonElement;

const startEndButtonE = document.querySelector(
  ".shift__startEndShift__end"
) as HTMLButtonElement;

const startEndClock = document.querySelector(
  ".shift__startEndShift__clock"
) as HTMLDivElement;

const moveToShiftSchedule = document.querySelector(
  ".moveToShiftSchedule"
) as HTMLButtonElement;

let userDB = null;

async function handleLoadEmployee() {
  try {
    const response = await fetch("/api/employee/get-employee");
    const data = await response.json();
    console.log("data", data);
    const { employee } = data;
    const userName: HTMLDivElement | null = document.querySelector("#userName");

    if (!employee) throw new Error("didn't get admin from DB");
    userDB = employee;
    if (!userName) throw new Error("No user element on DOM");
    userName.innerText = employee.name;
  } catch (error) {
    console.error(error);
  }

  dateToday.innerHTML = new Date().toLocaleString();
}

let startTime: number = Date.now();
let currentTime: number | null = null;
let intervalId: number | null | any = null;
let totalTimeShift: any = null;
let formattedTime: any = null;

startEndButtonS.addEventListener("click", (e) => {
  clearInterval(intervalId);
  startEndClock.innerHTML = `00:00:00`;
  startTime = Date.now();
  currentTime = null;
  console.log(formattedTime);
  intervalId = null;
  startEndButtonS.style.display = "none";
  startEndButtonE.style.display = "block";

  startClock();
});

function updateElapsedTime() {
  const currentTime = Date.now();
  const elapsedTime = currentTime - startTime;

  const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
  const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);

  const formattedTime = `${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  startEndClock.innerHTML = formattedTime;
  totalTimeShift = formattedTime;
}

function startClock() {
  intervalId = setInterval(updateElapsedTime, 1000);
}

startEndButtonE.addEventListener("click", (e) => {
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
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userDB, totalTimeShift }),
    });
  }
}

moveToShiftSchedule.addEventListener("click", (e) => {
  const url = new URL(
    "../shift-schedule-page/shiftSchedule.html",
    window.location.href
  );
  console.log("new URL:", url.href);
  window.location.href = url.href;
});
