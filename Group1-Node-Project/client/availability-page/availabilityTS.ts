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
const form = document.getElementById("availabilityForm") as HTMLFormElement;
const submitBtn = document.querySelector(".submit-btn") as HTMLButtonElement;

// Onclick for each check button -
document.addEventListener("DOMContentLoaded", () => {
  buttons.forEach((button) => {
    button.addEventListener("click", toggleButton);
  });

  form.addEventListener("submit", handleFormSubmit);
});

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

// Handle form button -
async function handleFormSubmit(event: Event) {
  event.preventDefault();

  const commentValue = comment.value;
  const userId = user._id;

  // const availabilityData: String = {};
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
