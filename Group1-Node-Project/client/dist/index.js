var handleLogin = function (eve) {
    eve.preventDefault();
    console.log("login received");
    /*
        fetch from admin by user name and password:
            if exists:
                send cookie with admin user's details
                goto adminMainPage
            else:
                fetch from other users by user name and password.
                if exists:
                    if userType is manager:
                        send cookie with manager user's details
                        goto managerMainPage,
                    else:
                        send cookie with employee user's details
                        goto employeeMainPage
                else:
                    process login failed
     */
};
