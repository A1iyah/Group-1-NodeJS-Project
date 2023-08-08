async function main() {
  await getActiveUser();

  renderNavBar(navBarElement);
}

main();


async function handleLoadAdmin() {
  try {
    const response = await fetch("/api/admin/get-admin");
    const data = await response.json();
    console.log("data", data);
    const { admin } = data;
    const userName: HTMLDivElement | null = document.querySelector("#userName");

    if (!admin) throw new Error("didn't get admin from DB");
    userDB = admin;
    if (!userName) throw new Error("No user element on DOM");
    userName.innerText = admin.name;
  } catch (error) {
    console.error(error);
  }

  dateToday.innerHTML = new Date().toLocaleString();
}
