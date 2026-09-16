import { FORMATIONS } from "./team.js";

function emptyLineup(index) {
  return FORMATIONS[index].slots.reduce(function (acc, slot) {
    acc[slot.id] = null;
    return acc;
  }, {});
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, function (char) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[char];
  });
}

function lineupWithout(lineup, playerId) {
  return Object.keys(lineup).reduce((acc, slotId) => {
    acc[slotId] = lineup[slotId] === playerId ? null : lineup[slotId];

    return acc;
  }, {});
}

function normalize(value) {
  return String(value).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

export { emptyLineup, escapeHtml, lineupWithout, normalize };
