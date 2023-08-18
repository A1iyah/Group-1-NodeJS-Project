let startTime: number = Date.now();
let currentTime: number | null = null;
let intervalId: number | null | any = null;
let totalTimeShift: any = null;
let formattedTime: any = null;

let user: any;
let userType: number;

async function main() {
  const data = await loadActiveUser();
  user = data.user;
  userType = data.userType;
  console.log(user);
  console.log(userType);

  dateToday.innerHTML = new Date().toLocaleString();
  const userName: HTMLDivElement | null = document.querySelector("#userName");
  if (!userName) throw new Error("No user element on DOM");
  userName.innerText = user.name;

  renderNavBar(navBarElem, userType, user);
  totalTimeShift = localStorage.getItem("totalTimeShift");
  if (totalTimeShift) {
    startEndClock.innerHTML = totalTimeShift;

    const startTimeString = localStorage.getItem("startTime");
    startTime = parseInt(startTimeString!);
    console.log(startTime);

    const currentTime = Date.now();
    console.log(currentTime);

    startEndButtonS.style.display = "none";
    startEndButtonE.style.display = "block";

    startClock();
  }
}

main();

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

let userDB = null;

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
  localStorage.setItem("startTime", String(startTime));
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
  localStorage.setItem("totalTimeShift", formattedTime);
}

function startClock() {
  intervalId = setInterval(updateElapsedTime, 1000);
}

startEndButtonE.addEventListener("click", (e) => {
  startEndButtonS.style.display = "block";
  startEndButtonE.style.display = "none";
  stopClock();
  localStorage.removeItem("startTime");
  localStorage.removeItem("totalTimeShift");
});

function stopClock() {
  if (intervalId) {
    console.log(totalTimeShift);
    clearInterval(intervalId);
    intervalId = null;
    startTime = Date.now();
    fetch("/api/manager/add-attendance", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user, totalTimeShift }),
    });
  }
}

// moveToShiftSchedule.addEventListener("click", (e) => {
//   const url = new URL(
//     "../shift-schedule-page/shiftSchedule.html",
//     window.location.href
//   );
//   console.log("new URL:", url.href);
//   window.location.href = url.href;
// });
