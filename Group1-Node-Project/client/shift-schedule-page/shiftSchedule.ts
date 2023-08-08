async function main() {
  renderNavBar(navBarElement);
  await getActiveUser();

  const userName: HTMLDivElement | null = document.querySelector("#userName");

  if (!userName) throw new Error("No user element on DOM");
  userName.innerText = user.name;

  main();
}
