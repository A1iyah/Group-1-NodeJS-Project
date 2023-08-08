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
        if (role === "employee") {
            fetch("/api/employee/login", {
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
                openHP(check, "./employeeHP/employeeHP.html");
            });
        }
        else if (role === "manager") {
            fetch("/api/manager/login", {
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
                openHP(check, "./managerHP/managerHP.html");
            });
        }
        else if (role === "admin") {
            fetch("/api/admin/login", {
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
                openHP(check, "./adminHP/adminHP.html");
            });
        }
        else
            throw new Error("role not found");
    }
    catch (error) {
        console.log(error);
    }
}
