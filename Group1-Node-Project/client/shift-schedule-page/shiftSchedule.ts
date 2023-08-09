const navBarElement = document.querySelector(".nav-bar") as HTMLDivElement;
async function main() {
  await getActiveUser();
  renderNavBar(navBarElement);
}

main();
