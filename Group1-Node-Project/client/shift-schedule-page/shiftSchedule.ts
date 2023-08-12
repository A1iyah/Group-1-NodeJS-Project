const navBarElement = document.querySelector(".nav-bar") as HTMLDivElement;

let weekDays;
let nextSunday:Date;
let nextSaturday: Date;

async function main() {
  await getActiveUser();
  renderNavBar(navBarElement);
  
  renderAllAvailableEmployees();
}

main();

/** Renders the form to create a new week */
const displayWeekScheduleConfig = () =>
{
  const newScheduleFormElem = document.querySelector(".new-schedule-form") as HTMLDivElement;

  nextSunday = getNextSundayDate(new Date());
  nextSaturday = getNextSaturdayDate(new Date());

  newScheduleFormElem.innerHTML = `
      <form onsubmit="createNewWeekSchedule(event)">
        <label for="startDate">New schedule starts at:</label>
        <input type="text" class="new-schedule-form__date" name="startDate" value='${nextSunday.toDateString()}' readonly>
        <label for="endDate">New schedule end's at:</label>
        <input type="text" class="new-schedule-form__date" name="endDate" value='${nextSaturday.toDateString()}' readonly>
        <p class="new-schedule-form__header">Roles:</p>
        <label for="roleManager">Shift Managers:</label>
        <input type="number" class="new-schedule-form__role-count" name="roleManager" value="1" readonly>
        <label for="roleCashier">Cashier:</label>
        <input type="number" class="new-schedule-form__role-count" name="roleCashier" value="1" min="0">
        <label for="roleSales">Sales person:</label>
        <input type="number" class="new-schedule-form__role-count" name="roleSales" value="1" min="0">
        <input type="submit">
      </form>
  `;
}

/** creates a new week schedule on form submitted */
const createNewWeekSchedule = (eve) =>
{
  eve.preventDefault();
  
  const cashierCount = eve.target.elements.roleCashier.value;
  const salesCount = eve.target.elements.roleSales.value;

  try {

      fetch("/api/schedule/create-new-week-for-scheduling",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        {
          nextSunday: nextSunday.toLocaleDateString(),
          cashierCount, 
          salesCount,
        }
      )
    })
    .then( (res) => res.json())
    .then((data) =>
    {
      if (!data) throw new Error("no schedule data received from DB.");

      console.log("start date: ", data.weekSchedule);
      
      const weekDaysArr: Array<Date> = getWeekDaysDatesArr(new Date(data.weekSchedule.startDate));
      
      renderEmployeesPanel(weekDaysArr);
      renderAllocationsPanel(weekDaysArr, data.weekSchedule.scheduleRequirements);
      


    })
    
  } catch (error) {
    console.log(error);
  }
  
}

function testt(eve) {
  eve.preventDefault();
  console.log(eve.target.elements.name.value);

  console.log("works");
}

/** Calc. start and the end of dates of next week and renders them */ 
const renderEmployeesPanel = (weekDaysArr: Array<Date>) =>{
  const employeesPanelElem = document.querySelector(".employees-panel") as HTMLDivElement;
  // const weekStartElem = document.querySelector(".employees-panel__week-displayer__week-start") as HTMLDivElement;
  // const weekEndElem = document.querySelector(".employees-panel__week-displayer__week-end") as HTMLDivElement;

  employeesPanelElem.innerHTML= `
        <div class="employees-panel__week-displayer">
          <p class="employees-panel__week-displayer__text"><span class="employees-panel__week-displayer__week-start">${weekDaysArr[0].toDateString()}</span> - <br><span class="employees-panel__week-displayer__week-end">${weekDaysArr[6].toDateString()}</span></p>
        </div>

        <div class="employees-panel__search-box">
          
          <!-- <div class="employees-panel__search-box__search-box"> -->
            <form onsubmit="testt(event)">
              <input type="image" src="./images/magnifying-glass.png" alt="magnifying-glass" class="employees-panel__search-box__image">
              <label for="name"></label>
              <input type="text" name="name" class="employees-panel__search-box__text" value="Search employee">
            </form>
          <!-- </div> -->
        </div>

        <div class="employees-panel__employees-list-container">
          <div class="employees-panel__employee-box">
            <p class="employees-panel__employee-name">Neo Meo</p>
            <div class="employees-panel__employee-box__markings-container">
              <p class="employees-panel__employee-box__allocations-count">2</p>
              <img src="./images/green-v.png" alt="green-v" class="employees-panel__employee-box__availability-img">
            </div>
          </div>
        </div>

        <div class="comments-panel"></div>
  `;

}

const renderAllocationsPanel = (weekDaysArr: Array<Date>, scheduleRequirements: Array<string>) =>
{
  const shiftsPanelElem = document.querySelector(".shifts-panel") as HTMLDivElement;
  
  shiftsPanelElem.innerHTML = `
  <div class="shifts-panel__days-header-container">${renderWeekHeaders(weekDaysArr)}</div>
  ${renderRoleAllocationsPlaces(weekDaysArr, scheduleRequirements)}
  `;
  
  
};

const renderWeekHeaders = (weekDaysArr: Array<Date>):string =>
{
  const daysNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let daysCounter: number = -1;
  

  const daysHeadersHtml = weekDaysArr.map( (dayHeader) =>
  {
    daysCounter++;
    return `<div class="shifts-panel__day-box">
      <p class="shifts-panel__day-box__day">${daysNames[daysCounter]}</p>
      <p class="shifts-panel__day-box__date">${weekDaysArr[daysCounter].getDate()} / ${weekDaysArr[daysCounter].getMonth()}</p>
      </div>`
  }).join("");
  
  return daysHeadersHtml; 
}

const renderRoleAllocationsPlaces = (weekDaysArr: Array<Date>, scheduleRequirements: Array<string>):string =>{
  console.log("scheduleReq: ", scheduleRequirements);
  const numRolesInScheduleRequirements = scheduleRequirements.length;
  let rolesCounter:number = -1;
  let weekDayCounter:number = -1;

  let rolesHtml:string = "";


  for (let i = 0 ; i < numRolesInScheduleRequirements ;i++)
  {
    const numEmployeesRequiredForRole = scheduleRequirements[i]["numEmployeesRequired"];
    if (numEmployeesRequiredForRole === 0) continue;

    for(let j = 0 ; j < numEmployeesRequiredForRole; j++)
    {
      rolesHtml += `<div class="shifts-panel__role-row"><p class="shifts-panel__role-row__title">${scheduleRequirements[i]["roleType"]}</p>`
      
      for (let weekdayIndex = 0 ; weekdayIndex < 7 ; weekdayIndex++)
      {
        rolesHtml += `<div class="shifts-panel__role-row__${scheduleRequirements[i]["roleType"]}-num${j}-weekday${weekdayIndex}">
        <img src="./images/add-employee-to-shift.png" alt="add-employee-to-shift" class="shifts-panel__role-row__icon" onclick="onShiftSelect('${scheduleRequirements[i]["roleType"]}', ${weekdayIndex})"></div>`;
      }
      rolesHtml += "</div>";
    }
  }

  return rolesHtml;
}

const getNextSundayDate = (todayDate: Date):Date =>
{
  const date = new Date(todayDate.getFullYear(), todayDate.getMonth(), (todayDate.getDate()-todayDate.getDay())+7);

  return date;
}

const getNextSaturdayDate = (todayDate: Date):Date =>
{
  const date = new Date(todayDate.getFullYear(), todayDate.getMonth(), (todayDate.getDate() + (6 - todayDate.getDay()))+7);

  return date;
}

const getWeekDaysDatesArr = (startDate: Date):Array<Date> =>
{
  let weekDaysArr:Array<Date> = [];

  for (let i = 0; i< 7 ; i++)
  {
    weekDaysArr.push(new Date(startDate.getFullYear(), startDate.getMonth(), (startDate.getDate() + (i - startDate.getDay()))));
  }

  return weekDaysArr;
}

const renderAllAvailableEmployees = async () =>{
  // console.log("renderAllAvailableEmployees called");
  
  // fetch('/api/availability/get-all-available-employees')
  // .then( (res) => res.json())
  // .then( (data) =>
  // {
  //   try {
  //     if (!data) throw new Error("did not get available employees from DB");

  //     //console.log("weeks data: ", data.weekDays[0]);
  //     weekDays = data.weekDays[0];
  //     console.log(weekDays);
  //     console.log(weekDays["Sunday"]);
  //     //console.log("try: ", weekDays[1]);

      
      
      
  //   } catch (error) {
  //     console.error(error);
  //   }
  // })
}

const onShiftSelect = (roleType: string, weekdayIndex: number) =>
{
  console.log(roleType, weekdayIndex);
  

  try {
    fetch('/api/availability/get-employees-by-role-and-weekday',
  {
    method: "SEARCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(
      {
        role: roleType, 
        weekday: weekdayIndex
      }
    )
    })
    .then( (res) => res.json())
    .then( (data) => {
      console.log(data);
      
    });
  } catch (error) {
    console.error(error);
    
  }


  
  
}

