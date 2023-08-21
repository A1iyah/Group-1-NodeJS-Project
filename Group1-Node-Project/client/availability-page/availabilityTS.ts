let userDB;
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

    const currentTime = Date.now();

    updateClock();
  }
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

const buttons: NodeListOf<HTMLDivElement> = document.querySelectorAll(
  ".availability-button"
);

const clickButton = document.querySelector(
  ".availability-button"
) as HTMLButtonElement;

const comment = document.getElementById("comment") as HTMLTextAreaElement;

const form = document.querySelector(".availabilityForm") as HTMLFormElement;

const submitBtn = document.querySelector(".submit-btn") as HTMLButtonElement;

const availabilityDate: any = document.querySelector(
  ".availabilityForm__date"
) as HTMLDivElement;

const chartDates: any = document.querySelector(
  ".availabilityForm__chartDates"
) as HTMLDivElement;

const successMessage = document.querySelector(
  ".success-message"
) as HTMLDivElement;

// DATES -
// Set up week dates -
function updateWeekDates() {
  const weekDatesDiv = document.getElementById("weekDates") as HTMLDivElement;

  const today = new Date();
  const dayOfWeek = today.getDay();

  const sunday = new Date(today);
  sunday.setDate(today.getDate() - dayOfWeek);

  const saturday = new Date(today);
  saturday.setDate(today.getDate() + (6 - dayOfWeek));

  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
  };

  weekDatesDiv.textContent = `<${sunday.toLocaleDateString(
    undefined,
    options
  )} - ${saturday.toLocaleDateString(undefined, options)}>`;

  return { sunday, saturday };
}

// Chart dates -
function updateChartDates() {
  const chartDatesContainer = document.querySelector(
    ".availabilityForm__table__chartDatesContainer"
  );
  const dayElements = document.querySelectorAll(
    ".availabilityForm__table th:not(:first-child)"
  );

  const { sunday } = updateWeekDates();

  dayElements.forEach((dayElement, index) => {
    const currentDate = new Date(sunday);
    currentDate.setDate(sunday.getDate() + index);

    const month = currentDate.getMonth() + 1;
    const dayOfMonth = currentDate.getDate();

    const dateElement = document.createElement("div");
    dateElement.classList.add("availabilityForm__chartDate");
    dateElement.textContent = `${dayOfMonth}.${month}`;

    chartDatesContainer!.appendChild(dateElement);
  });
}
updateChartDates();
// End of dates functions //

// Toggle function -
function toggleButton(event: Event) {
  const clickedButton = event.target as HTMLButtonElement;
  const currentImage = window.getComputedStyle(clickedButton).backgroundImage;

  if (currentImage.includes("can.png")) {
    clickedButton.style.backgroundImage = `url(./cant.png)`;
  } else {
    clickedButton.style.backgroundImage = `url(./can.png)`;
  }
}

// Handle form submit -
async function handleFormSubmit(event: Event) {
  event.preventDefault();

  const commentValue = comment.value;

  const availabilityData: Record<string, boolean> = {};

  buttons.forEach((button) => {
    const day = button.getAttribute("data-day");
    const currentImage = window.getComputedStyle(button).backgroundImage;
    const isAvailable = currentImage.includes("can.png");

    if (day) {
      availabilityData[day] = isAvailable;
    }
  });

  const userRole = user.role === (null || undefined) ? "Manager" : user.role;

  try {
    const response = await fetch(`/api/availability/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        availabilityData,
        commentValue,
        userId: user._id,
        role: { userRole },
        name: user.name,
      }),
    });

    if (response.ok) {
      console.log("Availability updated successfully");

      successMessage.style.display = "block";
    } else {
      console.error("Error updating availability");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  buttons.forEach((button) => {
    button.addEventListener("click", toggleButton);
  });

  updateWeekDates();

  form.addEventListener("submit", handleFormSubmit);
});
