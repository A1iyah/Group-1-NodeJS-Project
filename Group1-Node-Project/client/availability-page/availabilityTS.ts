document.addEventListener("DOMContentLoaded", () => {
  const buttons = Array.from(document.querySelectorAll(".availability-button"));
  const form = document.getElementById("availabilityForm") as HTMLFormElement;

  buttons.forEach((button) => {
    button.addEventListener("click", toggleButton);
  });

  form.addEventListener("submit", handleFormSubmit);
});

////////////////////////////////////////////////////////
function toggleButton(event: Event) {
  const clickedButton = event.target as HTMLButtonElement;
  const day = clickedButton.getAttribute("data-day");

  if (clickedButton.textContent === "✅") {
    clickedButton.textContent = "❌";
  } else {
    clickedButton.textContent = "✅";
  }
}

////////////////////////////////////////////////////////
async function handleFormSubmit(event: Event) {
  event.preventDefault();

  const buttons = Array.from(document.querySelectorAll(".availability-button"));
  const availabilityData: Record<string, boolean> = {};

  buttons.forEach((button) => {
    const day = button.getAttribute("data-day");
    const isAvailable = button.textContent === "✅";

    if (day) {
      availabilityData[day] = isAvailable;
    }
  });

  const comment = document.getElementById("comment") as HTMLTextAreaElement;
  const commentValue = comment.value;

  try {
    const response = await fetch(`/api/availability/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ availabilityData, commentValue }),
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
