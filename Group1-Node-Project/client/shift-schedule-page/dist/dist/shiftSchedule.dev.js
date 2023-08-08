"use strict";

function main() {
  return regeneratorRuntime.async(function main$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(getActiveUser());

        case 2:
          renderNavBar(navBarElement);

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
}

main();