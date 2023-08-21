const errorMessage = document.querySelector(
  ".login__error-message"
) as HTMLDivElement;

function openHP(check: string, string: string) {
  if (check) {
    const url = new URL(string, window.location.href);
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

    if (role === "Employee") {
      pageToOpen = "./employeeHP/employeeHP.html";
    } else if (role === "Manager") {
      pageToOpen = "./managerHP/managerHP.html";
    } else if (role === "Admin") {
      pageToOpen = "./employee-list-page/employeesPage.html";
    }

    fetch("/api/cookies/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        systemRole: role,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        let check = data.ok;
        openHP(check, pageToOpen);
      });
  } catch (error) {
    console.log(error);
  }
}
