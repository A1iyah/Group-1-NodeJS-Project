function openHP(check, string) {
    var url = new URL(string, window.location.href);
    console.log("new URL:", url.href);
    window.location.href = url.href;
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
        if (role === "employee") {
            pageToOpen_1 = "./employeeHP/employeeHP.html";
        }
        else if (role === "manager") {
            pageToOpen_1 = "./managerHP/managerHP.html";
        }
        else if (role === "admin") {
            pageToOpen_1 = "./shift-schedule-page/shiftSchedule.html";
        }
        fetch("/api/cookies/login", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email, password: password })
        })
            .then(function (res) { return res.json(); })
            .then(function (data) {
            console.log(data.ok);
            var check = data.ok;
            openHP(check, pageToOpen_1);
        });
        // if (role === "employee") {
        //   fetch("/api/employee/login", {
        //     method: "POST",
        //     headers: {
        //       Accept: "application/json",
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({ email, password }),
        //   })
        //     .then((res) => res.json())
        //     .then((data) => {
        //       console.log(data.ok);
        //       let check = data.ok;
        //       openHP(check, "./employeeHP/employeeHP.html");
        //     });
        // } else if (role === "manager") {
        //   fetch("/api/manager/login", {
        //     method: "POST",
        //     headers: {
        //       Accept: "application/json",
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({ email, password }),
        //   })
        //     .then((res) => res.json())
        //     .then((data) => {
        //       console.log(data.ok);
        //       let check = data.ok;
        //       openHP(check, "./managerHP/managerHP.html");
        //     });
        // } else if (role === "admin") {
        //   fetch("/api/admin/login", {
        //     method: "POST",
        //     headers: {
        //       Accept: "application/json",
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({ email, password }),
        //   })
        //     .then((res) => res.json())
        //     .then((data) => {
        //       console.log(data.ok);
        //       let check = data.ok;
        //       openHP(check, "./shift-schedule-page/shiftSchedule.html");
        //     });
    }
    catch (error) {
        console.log(error);
    }
}
