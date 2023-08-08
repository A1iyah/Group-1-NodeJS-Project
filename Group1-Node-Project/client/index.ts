function openHP(check: string, string: string) {
  const url = new URL(string, window.location.href);
  console.log("new URL:", url.href);
  window.location.href = url.href;
}

function handleLogin(ev) {
  try {
    ev.preventDefault();
    const email = ev.target.elements.email.value;
    const password = ev.target.elements.password.value;
    const role = ev.target.elements.role.value;
    if (!email) throw new Error("email not found");
    if (!password) throw new Error("password not found");
    if (!role) throw new Error("role not found");

    if (role === "employee") {
      fetch("/api/employee/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.ok);
          let check = data.ok;
          openHP(check, "./employeeHP/employeeHP.html");
        });
    } else if (role === "manager") {
      fetch("/api/manager/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.ok);
          let check = data.ok;
          openHP(check, "./managerHP/managerHP.html");
        });
    } else if (role === "admin") {
      fetch("/api/admin/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.ok);
          let check = data.ok;
          openHP(check, "./adminHP/adminHP.html");
        });
    } else throw new Error("role not found");
  } catch (error) {
    console.log(error);
  }
}
