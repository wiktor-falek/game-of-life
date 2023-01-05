function initializeBoard(width, height, population = 0) {
  const length = width * height;
  // Optimization #1: 1d array
  const map = new Array(length);

  // Optimization #2: don't iterate over whole map if population is 0
  if (population === 0) {
    map.fill({ state: 0, neighborCount: 0 });
  } else {
    for (let i = 0; i < map.length; i++) {
      const roll = Math.random() * 100;
      // Optimization #3: store integers instead of booleans
      const state = +(population > roll);
      // Optimization #4: storing neighbor count in the cell
      // instead  of looking at adjacent indices on each iteration
      const cell = { state, neighborCount: 0 };
      map[i] = cell;
    }

    for (let i = 0; i < map.length; i++) {
      // set neighborCount for each cell

      // TODO
      // the problem is that im iterating over 1d array, but this requires 2d coordinates
      // getAliveNeighborsCount()
    }
  }

  return { width, height, map };
}

function getCell(x, y, board) {
  // Optimization #5: board being a object that stores
  // width and height to avoid calculating it multiple times
  const { width, height, map } = board;

  // support indices smaller than 0 and bigger than width or height to make board toroidal
  const xIndex = ((x % width) + width) % width;
  const yIndex = ((y % height) + height) % height;

  // map 2d position to 1d index
  const index = xIndex + yIndex * width;

  return map[index];
}

function getAliveNeighborsCount(x, y, board) {
  const neighborCoordinates = [
    [x - 1, y - 1],
    [x - 1, y],
    [x - 1, y + 1],
    [x, y - 1],
    [x, y + 1],
    [x + 1, y - 1],
    [x + 1, y],
    [x + 1, y + 1],
  ];
  let aliveCount = 0;

  neighborCoordinates.forEach((position) => {
    const [x, y] = position;
    const cell = getCell(x, y, board)
    aliveCount += cell.state;
  });
  return aliveCount;
}

function nextGeneration(board) {
  const { width, height, map } = board;

  const newBoard = initializeBoard(width, height, 0);

  for (let i = 0; i < map.length; i++) {
    // cell logic
    // increment adjacent cells neighborCount if the cell is alive
  }

  // for (let y = 0; y < height; y++) {
  //   for (let x = 0; x < width; x++) {
  //     // let aliveNeighborsCount = getAliveNeighborsCount(x, y, board);
  //     let cellValue = getCellValue(x, y, board);
  //     if (
  //       (aliveNeighborsCount === 2 && cellValue) ||
  //       aliveNeighborsCount === 3
  //     ) {
  //       newBoard[y][x] = true;
  //     }
  //   }
  // }
  return newBoard;
}
