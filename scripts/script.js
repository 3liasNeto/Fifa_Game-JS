import Game from "./game.js";

function getElements() {
  return {
    pitch: document.getElementById("pitch"),
    pool: document.getElementById("pool"),
    poolCount: document.getElementById("pool-count"),
    filters: document.getElementById("filters"),
    search: document.getElementById("search"),
    reset: document.getElementById("reset"),
    counter: document.getElementById("counter"),
    progress: document.getElementById("progress"),
    formation: document.getElementById("formation"),
  };
}

function init() {
  const els = getElements();

  const missing = Object.keys(els).filter((key) => !els[key]);

  if (missing.length) {
    throw new Error(
      `Elementos ausentes no HTML: ${missing.join(", ")}`,
    );
  }

  const game = new Game(els);

  game.init();
}

init();