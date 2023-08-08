let userType: UserType;

enum UserType
{
    Admin,
    Manager,
    Employee
}

async function getUser() 
{
    try {
        const responseManager = await fetch("/api/manager/get-manager");
        const dataManager = await responseManager.json();
        const { managerDB } = dataManager;
        console.log("user: ", managerDB);

        if (dataManager.ok === true && managerDB._id !== null)
        {
            userType = UserType.Employee;
            console.log("userType: ", userType);
            return;
        }

        const responseAdmin = await fetch("/api/admin/get-admin");
        const dataAdmin = await responseAdmin.json();
        const { adminDB } = dataAdmin;
        console.log("user: ", adminDB);

        if (dataAdmin.ok === true && adminDB._id !== null)
        {
            userType = UserType.Admin;
            console.log("userType: ", userType);
            
            return;
        }
        
               
        
        

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