enum UserType
{
    Admin,
    Manager,
    Employee
}

const renderNavBar = (userType: UserType, navBarElem: HTMLDivElement) =>
{
    console.log(userType, navBarElem);

    switch (userType) {
        case UserType.Admin:
            
            break;
        case UserType.Manager:

        break;

        case UserType.Employee:
            
            break;
    }
}

const renderNavBarStartEndShiftLink = () =>
{

}

const renderNavBarShiftsScheduleLink = () =>
{
    
}

const renderNavBarAvailabilityLink = () =>
{
    
}

const renderNavBarEmployeesLink = () =>
{
    
}

const renderNavBarReportsLink = () =>
{
    
}