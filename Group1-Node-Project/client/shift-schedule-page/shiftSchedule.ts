async function main() {
  await getActiveUser();
  renderNavBar(navBarElement);

  // const startShift = localStorage.getItem("totalTimeShift");
  // if (startShift) {
  //   startClock();
  // }
}

main();
