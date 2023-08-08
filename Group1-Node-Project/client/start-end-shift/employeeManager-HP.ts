// const dateToday = document.querySelector(".shift__date") as HTMLElement;
// const startEndShift = document.querySelector(
//   ".shift__startEndShift"
// ) as HTMLDivElement;

// const startEndButtonS = document.querySelector(
//   ".shift__startEndShift__start"
// ) as HTMLButtonElement;

// const startEndButtonE = document.querySelector(
//   ".shift__startEndShift__end"
// ) as HTMLButtonElement;

// const startEndClock = document.querySelector(
//   ".shift__startEndShift__clock"
// ) as HTMLDivElement;

// let userDB = null;

// async function handleLoadUser() {
//   // try {
//   //   const response = await fetch("/api/admin/get-admin");
//   //   const data = await response.json();
//   //   console.log("data", data);
//   //   const { user } = data;
//   //   const userName: HTMLDivElement | null = document.querySelector("#userName");

//   //   if (!user) throw new Error("didn't get admin from DB");
//   //   if (!userName) throw new Error("No user element on DOM");
//   //   userName.innerText = user.name;
//   // } catch (error) {
//   //   console.error(error);
//   // }

//   try {
//     const response = await fetch("/api/manager/get-manager");
//     const data = await response.json();
//     console.log("data", data);
//     const { manager } = data;
//     const userName: HTMLDivElement | null = document.querySelector("#userName");

//     if (!manager) throw new Error("didn't get admin from DB");
//     userDB = manager;
//     if (!userName) throw new Error("No user element on DOM");
//     userName.innerText = manager.name;
//   } catch (error) {
//     console.error(error);
//   }

//   dateToday.innerHTML = new Date().toLocaleString();
// }

// let startTime: number = Date.now();
// let currentTime: number | null = null;
// let intervalId: number | null | any = null;
// let totalTimeShift: any = null;
// let formattedTime: any = null;

// startEndButtonS.addEventListener("click", (e) => {
//   clearInterval(intervalId);
//   startEndClock.innerHTML = `00:00:00`;
//   startTime = Date.now();
//   currentTime = null;
//   console.log(formattedTime);
//   intervalId = null;
//   startEndButtonS.style.display = "none";
//   startEndButtonE.style.display = "block";

//   startClock();
// });

// function updateElapsedTime() {
//   const currentTime = Date.now();
//   const elapsedTime = currentTime - startTime;

//   const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
//   const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
//   const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);

//   const formattedTime = `${String(hours).padStart(2, "0")}:${String(
//     minutes
//   ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
//   startEndClock.innerHTML = formattedTime;
//   totalTimeShift = formattedTime;
// }

// function startClock() {
//   intervalId = setInterval(updateElapsedTime, 1000);
// }

// startEndButtonE.addEventListener("click", (e) => {
//   startEndButtonS.style.display = "block";
//   startEndButtonE.style.display = "none";
//   stopClock();
// });

// function stopClock() {
//   if (intervalId) {
//     console.log(totalTimeShift);
//     clearInterval(intervalId);
//     intervalId = null;
//     startTime = Date.now();
//     fetch("/api/manager/add-attendance", {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ userDB, totalTimeShift }),
//     });
//   }
// }
