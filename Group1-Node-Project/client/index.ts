const errorMessage = document.querySelector(
  ".login__error-message"
) as HTMLDivElement;

function openHP(check: string, string: string) {
  if (check) {
    const url = new URL(string, window.location.href);
    console.log("new URL:", url.href);
    window.location.href = url.href;
  } else {
    errorMessage.style.display = "block";
  }
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

    let pageToOpen: string;

    if (role === "employee") {
      pageToOpen = "./employeeHP/employeeHP.html";
    } else if (role === "manager") {
      pageToOpen = "./managerHP/managerHP.html";
    } else if (role === "admin") {
      pageToOpen = "./shift-schedule-page/shiftSchedule.html";
    }

    fetch("/api/cookies/login", {
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
        openHP(check, pageToOpen);
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
  } catch (error) {
    console.log(error);
  }
}
