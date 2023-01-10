import { initializeBoard, getCellValue, nextGeneration } from "./gol";

function getRowsAndColumns() {
  // tile is ~30 pixels on small screen and ~45 on bigger
  const pseudoTileSize =
    document.body.clientWidth <= 768 && document.body.clientHeight <= 1024
      ? 30
      : 45;
  const rows = Math.floor(document.body.clientHeight / pseudoTileSize);
  const columns = Math.floor(document.body.clientWidth / pseudoTileSize);
  return { rows, columns };
}

const createTile = (index: number, rows: number, columns: number) => {
  const tile = document.createElement("div");
  tile.classList.add("tile");
  tile.classList.add("tile__dead");
  tile.setAttribute("x", `${index % columns}`);
  tile.setAttribute("y", `${Math.floor(index / columns)}`);

  tile.addEventListener("mousedown", (event: Event) => {
    // if (e.target === null) return;
    const target = event.target as HTMLElement;

    const xAttribute = target.getAttribute("x");
    const yAttribute = target.getAttribute("y");
    if (xAttribute === null || yAttribute === null) {
      throw new Error(`Cell (${xAttribute}, ${yAttribute}) not found`);
    }
    const x = parseInt(xAttribute);
    const y = parseInt(yAttribute);
    const cellState = getCellValue(x, y, board);

    board[y][x] = !cellState; // TODO: call a function instead to flip cell state inside board

    if (cellState === true) {
      // if cell is alive change class to dead
      tile.classList.remove("tile__alive");
      tile.classList.add("tile__dead");
    } else {
      tile.classList.remove("tile__dead");
      tile.classList.add("tile__alive");
    }
  });

  return tile;
};

const createGrid = (rows: number, columns: number) => {
  const tiles = document.querySelector(".tiles") as HTMLElement;
  if (tiles === null) throw new Error("Element not found #tiles");

  tiles.innerHTML = "";

  tiles.style.setProperty("--columns", columns.toString());
  tiles.style.setProperty("--rows", rows.toString());

  // create individual tiles in DOM
  Array.from(Array(rows * columns)).map((_tile, index) => {
    tiles.appendChild(createTile(index, rows, columns));
  });
};

const renderBoard = (rows: number, columns: number) => {
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      const cellValue = getCellValue(x, y, board);
      const tile = document.querySelector(
        `.tile[x="${x}"][y="${y}"]`
      ) as HTMLElement;
      if (tile === null)
        throw new Error(`Element not found .tile[x="${x}"][y="${y}"]`);

      if (cellValue) {
        tile.classList.remove("tile__dead");
        tile.classList.add("tile__alive");
      } else {
        tile.classList.remove("tile__alive");
        tile.classList.add("tile__dead");
      }
    }
  }
};


// GLOBALS
let { rows, columns } = getRowsAndColumns();
let board = initializeBoard(columns, rows, 20);

window.onresize = () => {
  // This is not the cleanest way to do this
  const updated = getRowsAndColumns();
  rows = updated.rows;
  columns = updated.columns;

  board = initializeBoard(columns, rows, 20);
  createGrid(rows, columns);
  renderBoard(rows, columns);
};

window.onload = () => {
  let paused = false;
  
  createGrid(rows, columns);

  setInterval(() => {
    if (document.hidden || paused) {
      return;
    }
    board = nextGeneration(board);
    renderBoard(rows, columns);
  }, 300);

  const pauseButton = document.querySelector("#pause") as HTMLButtonElement;
  const nextButton = document.querySelector("#next") as HTMLButtonElement;
  const resetButton = document.querySelector("#reset") as HTMLButtonElement;
  const clearButton = document.querySelector("#clear") as HTMLButtonElement;

  if (pauseButton === null) throw new Error("#pause element not found");
  if (nextButton  === null) throw new Error("#next element not found");
  if (resetButton === null) throw new Error("#reset element not found");
  if (clearButton === null) throw new Error("#clear element not found");

  pauseButton.addEventListener("click", () => {
    paused = !paused;
    pauseButton.innerHTML = paused ? "Resume" : "Pause";
    nextButton.disabled = !paused;
  });

  nextButton.disabled = true;
  nextButton.addEventListener("click", () => {
    if (paused) {
      board = nextGeneration(board);
      renderBoard(rows, columns);
    }
  });

  resetButton.addEventListener("click", () => {
    board = initializeBoard(columns, rows, 20);
    renderBoard(rows, columns);
  });

  clearButton.addEventListener("click", () => {
    board = initializeBoard(columns, rows, 0);
    renderBoard(rows, columns);
  });
};
