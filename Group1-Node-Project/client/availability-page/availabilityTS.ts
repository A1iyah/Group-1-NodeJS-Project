async function main() {
  await getActiveUser();

  renderNavBar(navBarElement);
}
main();

//
const buttons: NodeListOf<HTMLDivElement> = document.querySelectorAll(
  ".availability-button"
);
const comment = document.getElementById("comment") as HTMLTextAreaElement;
const form = document.querySelector(".availabilityForm") as HTMLFormElement;
const submitBtn = document.querySelector(".submit-btn") as HTMLButtonElement;
const availabilityDate: any = document.querySelector(
  ".availabilityForm__date"
) as HTMLDivElement;
const chartDates: any = document.querySelector(
  ".availabilityForm__chartDates"
) as HTMLDivElement;

// Set up week dates -
function setupWeekDates() {
  const weekDatesDiv = document.getElementById("weekDates") as HTMLDivElement;
  const { sunday, saturday } = getCurrentWeekDates();
  weekDatesDiv.textContent = `<${formatDate(sunday)} - ${formatDate(
    saturday
  )}>`;
}

// Get current Sunday and Saturday dates -
function getCurrentWeekDates() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - dayOfWeek);
  const saturday = new Date(today);
  saturday.setDate(today.getDate() + (6 - dayOfWeek));

  return { sunday, saturday };
}

// Format the date -
function formatDate(date) {
  const options = { month: "short", day: "numeric" };
  return date.toLocaleDateString(undefined, options);
}

// Chart dates -
function updateChartDates() {
  const dayElements = document.querySelectorAll(
    ".availabilityForm__table th:not(:first-child)"
  );

  const { sunday } = getCurrentWeekDates();

  dayElements.forEach((dayElement, index) => {
    const currentDate = new Date(sunday);
    currentDate.setDate(sunday.getDate() + index);

    const month = currentDate.getMonth() + 1;
    const dayOfMonth = currentDate.getDate();

    const dateClassName = "availabilityForm__chartDate";

    const dateElement = document.createElement("div");
    dateElement.classList.add(dateClassName);
    dateElement.textContent = `${dayOfMonth}.${month}`;

    dayElement.parentElement?.appendChild(dateElement);
  });
}
updateChartDates();

// Toggle function -
function toggleButton(event: Event) {
  const clickedButton = event.target as HTMLButtonElement;
  const day = clickedButton.getAttribute("data-day");

  if (clickedButton.textContent === "can") {
    clickedButton.textContent = "can't";
  } else {
    clickedButton.textContent = "can";
  }
}

// Handle form submit -
async function handleFormSubmit(event: Event) {
  event.preventDefault();

  const commentValue = comment.value;
  const userId = user._id;

  const availabilityData: Record<string, boolean> = {};

  buttons.forEach((button) => {
    const day = button.getAttribute("data-day");
    const isAvailable = button.textContent === "can";

    if (day) {
      availabilityData[day] = isAvailable;
    }
  });

  try {
    const response = await fetch(`/api/availability/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ availabilityData, commentValue, userId }),
    });

    if (response.ok) {
      console.log("Availability updated successfully");
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

  setupWeekDates();

  form.addEventListener("submit", handleFormSubmit);
});
// Chart dates -
// function days() {
//   const today = new Date();

//   let week = Array.from(Array(7).keys()).map((idx) => {
//     const d = new Date();
//     d.setDate(d.getDate() - d.getDay() + idx);
//     return d;
//   });

//   chartDates.innerHTML = week;
// }
// days();
