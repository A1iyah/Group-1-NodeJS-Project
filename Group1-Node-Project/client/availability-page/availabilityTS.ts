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
  const day = clickedButton.getAttribute("data-day");

  if (clickedButton.textContent === "can") {
    clickedButton.textContent = "can't";
  } else {
    clickedButton.textContent = "can";
    clickedButton.style.backgroundColor = "rgb(21, 246, 92)";
  }
}

// Handle form submit -
async function handleFormSubmit(event: Event) {
  event.preventDefault();

  const commentValue = comment.value;

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
      body: JSON.stringify({ availabilityData, commentValue, userId: user._id, role: userType }),
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

  updateWeekDates();

  form.addEventListener("submit", handleFormSubmit);
});
