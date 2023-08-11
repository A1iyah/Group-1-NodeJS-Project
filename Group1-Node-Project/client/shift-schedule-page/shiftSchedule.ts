const navBarElement = document.querySelector(".nav-bar") as HTMLDivElement;
async function main() {
  await getActiveUser();
  renderNavBar(navBarElement);

  renderWeekDisplayer();
  renderAllEmployeesPanel();
}

main();

function testt(eve) {
  eve.preventDefault();
  console.log(eve.target.elements.name.value);

  console.log("works");
}

/// calc. start and the end of dates of next week and renders them
const renderWeekDisplayer = () => {
  const weekStartElem = document.querySelector(
    ".employees-panel__week-displayer__week-start"
  ) as HTMLDivElement;
  const weekEndElem = document.querySelector(
    ".employees-panel__week-displayer__week-end"
  ) as HTMLDivElement;

  const todayDate = new Date();
  const nextSunday = new Date(
    todayDate.getFullYear(),
    todayDate.getMonth(),
    todayDate.getDate() - todayDate.getDay() + 7
  ).toDateString();
  const nextSaturday = new Date(
    todayDate.getFullYear(),
    todayDate.getMonth(),
    todayDate.getDate() + (6 - todayDate.getDay()) + 7
  ).toDateString();

  weekStartElem.innerHTML = nextSunday;
  weekEndElem.innerHTML = nextSaturday;
};

const renderAllEmployeesPanel = () => {};
