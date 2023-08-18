var errorMessage = document.querySelector(".login__error-message");
function openHP(check, string) {
    if (check) {
        var url = new URL(string, window.location.href);
        console.log("new URL:", url.href);
        window.location.href = url.href;
    }
    else {
        errorMessage.style.display = "block";
    }
}
function handleLogin(ev) {
    try {
        ev.preventDefault();
        var email = ev.target.elements.email.value;
        var password = ev.target.elements.password.value;
        var role = ev.target.elements.role.value;
        if (!email)
            throw new Error("email not found");
        if (!password)
            throw new Error("password not found");
        if (!role)
            throw new Error("role not found");
        var pageToOpen_1;
        if (role === "Employee") {
            pageToOpen_1 = "./employeeHP/employeeHP.html";
        }
        else if (role === "Manager") {
            pageToOpen_1 = "./managerHP/managerHP.html";
        }
        else if (role === "Admin") {
            pageToOpen_1 = "./shift-schedule-page/shiftSchedule.html";
        }
        fetch("/api/cookies/login", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password,
                systemRole: role
            })
        })
            .then(function (res) { return res.json(); })
            .then(function (data) {
            console.log(data.ok);
            var check = data.ok;
            openHP(check, pageToOpen_1);
        });
    }
    catch (error) {
        console.log(error);
    }
}
