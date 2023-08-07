function handleLogin(ev) {
    try {
        ev.preventDefault();
        var email = ev.target.elements.email.value;
        var password = ev.target.elements.password.value;
        if (!email)
            throw new Error("email not found");
        if (!password)
            throw new Error("password not found");
        // fetch("/api/admin/login", {
        //   method: "POST",
        //   headers: {
        //     Accept: "application/json",
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({ email, password }),
        // })
        //   .then((res) => res.json())
        //   .then((data) => {
        //     console.log(data);
        //   });
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
            console.log(data);
        });
    }
    catch (error) {
        console.log(error);
    }
}
