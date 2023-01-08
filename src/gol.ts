function initializeBoard(
  width: number,
  height: number,
  population: number = 0
) {
  const board = new Array(height);
  for (let i = 0; i < board.length; i++) {
    let row = new Array(width).fill(0);
    if (population !== 0) {
      row = row.map(() => (population > Math.random() * 100 ? 1 : 0));
    }
    board[i] = row;
  }

  return board;
}

function getCellValue(x, y, board) {
  const width = board[0].length;
  const height = board.length;
  // support indices that are negative or bigger than length of array
  const xIndex = ((x % width) + width) % width;
  const yIndex = ((y % height) + height) % height;
  return board[yIndex][xIndex];
}

function flipCellValue(x: number, y: number, board) {
  const cell = getCellValue(x, y, board);
  cell.state = cell.state === 1 ? 0 : 1;
}

function getAliveNeighborsCount(x: number, y: number, board) {
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

  neighborCoordinates.forEach((pos) => {
    let [x, y] = pos;
    aliveCount += getCellValue(x, y, board);
  });
  return aliveCount;
}

function nextGeneration(board) {
  const width = board[0].length;
  const height = board.length;
  const newBoard = initializeBoard(width, height);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      // Optimized version (work in progress)
      // Storing the neighborCount inside the cell itself, and incrementing/decrementing all neighbors
      // when the state of the cell flips
      // if (cell.aliveNeighbors === 3 && !cell.state) {
      //   // cell becomes alive
      //   newMapCell.state = 1;
      //   incrementNeighbors(i, newBoard);
      // }
  
      // if (cell.aliveNeighbors != 2 && cell.state) {
      //   // cell dies
      //   newMapCell.state = 0;
      //   decrementNeighbors(i, newBoard);
      // }


      let aliveNeighborsCount = getAliveNeighborsCount(x, y, board);
      let cellValue = getCellValue(x, y, board);
      if (
        (aliveNeighborsCount === 2 && cellValue) ||
        aliveNeighborsCount === 3
      ) {
        newBoard[y][x] = true;
      }
    }
  }
  return newBoard;
}

export { initializeBoard, nextGeneration, getCellValue, flipCellValue };
