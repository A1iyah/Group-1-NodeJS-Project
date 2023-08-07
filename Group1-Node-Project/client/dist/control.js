var UserType;
(function (UserType) {
    UserType[UserType["Admin"] = 0] = "Admin";
    UserType[UserType["Manager"] = 1] = "Manager";
    UserType[UserType["Employee"] = 2] = "Employee";
})(UserType || (UserType = {}));
var renderNavBar = function (userType, navBarElem) {
    console.log(userType, navBarElem);
    switch (userType) {
        case UserType.Admin:
            break;
        case UserType.Manager:
            break;
        case UserType.Employee:
            break;
    }
};
var renderNavBarStartEndShiftLink = function () {
};
var renderNavBarShiftsScheduleLink = function () {
};
var renderNavBarAvailabilityLink = function () {
};
var renderNavBarEmployeesLink = function () {
};
var renderNavBarReportsLink = function () {
};
