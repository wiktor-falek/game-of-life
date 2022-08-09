function initializeBoard(width, height, population = 0) {
    const row = new Array(width).fill(false);
    const board = new Array(height)
        .fill(row)
        .map((row) => {
        return row.map(() => {
            let roll = Math.random() * 100;
            return (population > roll);
        });
    });
    return board;
}

function getCellValue(x, y, board) {
    const width = board[0].length;
    const height = board.length;
    const xIndex = ((x % width) + width) % width;
    const yIndex = ((y % height) + height) % height;
    return board[yIndex][xIndex];
}

function getAliveNeighborsCount(x, y, board) {
    const neighborCoordinates = [
        [x - 1, y - 1], [x - 1, y], [x - 1, y + 1],
        [x, y - 1], [x, y + 1],
        [x + 1, y - 1], [x + 1, y], [x + 1, y + 1]
    ];
    let aliveCount = 0;
    neighborCoordinates.forEach((pos) => {
        let [x, y] = pos;
        aliveCount += +getCellValue(x, y, board);
    });
    return aliveCount;
}

function nextGeneration(board) {
    const width = board[0].length;
    const height = board.length;
    const newBoard = initializeBoard(width, height);
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let aliveNeighborsCount = getAliveNeighborsCount(x, y, board);
            let cellValue = getCellValue(x, y, board);
            if (aliveNeighborsCount === 2 && cellValue || aliveNeighborsCount === 3) {
                newBoard[y][x] = true;
            };
        };
    };
    return newBoard;
}
