const navBarElement = document.querySelector(".nav-bar") as HTMLDivElement;
const userName = document.querySelector("#userName") as HTMLDivElement;

const salaryButton = document.querySelector(
  ".reportButtons__salary"
) as HTMLDivElement;

const managerButton = document.querySelector(
  ".reportButtons__manager"
) as HTMLDivElement;

const employeeButton = document.querySelector(
  ".reportButtons__employee"
) as HTMLDivElement;

const reportsBySalary = document.querySelector(
  ".salaryReports"
) as HTMLDivElement;

// const reportsByManager = document.querySelector(
//   ".salaryReports"
// ) as HTMLDivElement;

// const reportsByEmployee = document.querySelector(
//   ".salaryReports"
// ) as HTMLDivElement;

const reportSalaryUp = document.querySelector(
  ".salaryReports__salaryUp"
) as HTMLDivElement;

const reportSalaryDown = document.querySelector(
  ".salaryReports__salaryDown"
) as HTMLDivElement;

const reportSalaryBetween = document.querySelector(
  ".salaryReports__between"
) as HTMLDivElement;

async function main() {
  await getActiveUser();

  renderNavBar(navBarElement);

}

main();

salaryButton.addEventListener("click", (e) => {
  reportsBySalary.style.display = "flex";
});

function HandleSalaryUp(ev) {
  try {
    ev.preventDefault();
    const salaryUp = ev.target.elements.salaryUp.value;
    if (!salaryUp) throw new Error("no salary entered");
    console.log(salaryUp);
  } catch (error) {
    console.log(error);
  }
}
