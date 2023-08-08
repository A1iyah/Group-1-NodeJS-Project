let userType: UserType;

enum UserType
{
    Admin,
    Manager,
    Employee
}

async function getUserType() 
{
    try {
        const response = await fetch("/api/admin/get-admin");
        const data = await response.json();
        console.log("data", data);
        const {userDB } = data;
        console.log("user: ", userDB);
        
        //if (response.ok === false) throw new Error("response from DB not ok");
        
        
        

    } catch (error) {
        console.error(error);
    }
}



const renderNavBar = (userType: UserType, navBarElem: HTMLDivElement) =>
{
    console.log(userType, navBarElem);

    switch (userType) {
        case UserType.Admin:
            
            break;
        case UserType.Manager:
            const navBarHtml: string = `<div class="nav-bar__links-group">
            <p class="nav-bar__link" onclick="gotoPage('../start-end-shift/employeeManager-HP.html')">Start / End Shift</p>
            <p class="nav-bar__link nav-bar__link--bold">Shift Schedule</p>
            <p class="nav-bar__link">Availability</p>
            <p class="nav-bar__link">Employees</p>
            <p class="nav-bar__link">Reports</p>
            </div>
            <p class="nav-bar__user-name">John Wick</p>`;
            navBarElem.innerHTML = navBarHtml;
        break;

        case UserType.Employee:
            
            break;
    }
}

const gotoPage = (targetPage: string) =>{
    window.location.href = targetPage;
}