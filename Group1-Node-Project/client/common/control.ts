let userType: UserType;
let user: any;
enum UserType
{
    Admin,
    Manager,
    Employee
}

async function getActiveUser() 
{
    try {
        const responseManager = await fetch("/api/manager/get-manager");
        const dataManager = await responseManager.json();
        const { manager } = dataManager;
        console.log("dataManager: ", dataManager);
        
        console.log("user: ", manager);

        if (dataManager.ok === true && manager._id !== null)
        {
            userType = UserType.Manager;
            user = manager;
            console.log("userType: ", userType);
            return;
        }
  
    } catch (error) {
        console.error(error);
    }

    try {
        const responseAdmin = await fetch("/api/admin/get-admin");
        const dataAdmin = await responseAdmin.json();
        const { admin } = dataAdmin;
        console.log("user: ", admin);

        if (dataAdmin.ok === true && admin._id !== null)
        {
            userType = UserType.Admin;
            user = admin;
            console.log("userType: ", userType);
            
            return;
        }
        
    } catch (error) {
        console.error(error);
    }

    try {
        const responseEmployee = await fetch("/api/employee/get-employee");
        const dataEmployee = await responseEmployee.json();
        const { employee } = dataEmployee;
        console.log("user: ", employee);

        if (dataEmployee.ok === true && employee._id !== null)
        {
            userType = UserType.Employee;
            user = employee;
            console.log("userType: ", userType);
            
            return;
        }
        
    } catch (error) {
        console.error(error);
    }
    
}

const renderNavBar = (navBarElem: HTMLDivElement) =>
{
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