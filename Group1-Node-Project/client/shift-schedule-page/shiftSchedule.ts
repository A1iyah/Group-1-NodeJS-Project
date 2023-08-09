async function main() {
  await getActiveUser();
  renderNavBar(navBarElement);

  const userName: HTMLDivElement | null = document.querySelector("#userName");

  if (!userName) throw new Error("No user element on DOM");
  userName.innerText = user.name;
}

main();
