/**
 * @param width length of each array
 * @param height amount of arrays
 * @param population percentage chance of each individual cell to become true
 */
function initalizeBoard(width: number, height: number, population: number = 0): boolean[][]  {
    const row: boolean[] = new Array(width).fill(false);
    const board: boolean[][] = new Array(height)
    .fill(row)
    .map((row) => {
        return row.map(() => {
            let roll = Math.random() * 100;
            return (population > roll);
        })
    });
    return board;
};

/**
 * returns value of cell at (x, y)
 * supports negative indexing to allow for toroidal board
 * @param x horizontal
 * @param y vertical
 * @param board two dimensional array
 */
function getCellValue(x: number, y: number, board: boolean[][]): boolean {
    const width = board[0].length;
    const height = board.length;
    
    const xIndex = ((x % width) + width) % width;
    const yIndex = ((y % height) + height) % height;

    return board[yIndex][xIndex];
};

/**
 * returns total amount of alive neighbors around position (x, y)
 * @param x horizontal
 * @param y vertical
 * @param board two dimensional array
 */
function getAliveNeighborsCount(x: number, y: number, board: boolean[][]): number {
    const neighborCoordinates = [
        [x-1, y-1], [x-1, y], [x-1, y+1],
        [x, y-1  ],           [x, y+1  ],
        [x+1, y-1], [x+1, y], [x+1, y+1]
    ]

    let aliveCount = 0;

    neighborCoordinates.forEach((pos) => {
        let [x, y] = pos;
        aliveCount += +getCellValue(x, y, board);
    })
    return aliveCount;
}

function getUpdatedBoard(board: boolean[][]): boolean[][] {
    const width = board[0].length;
    const height = board.length;

    const newBoard: boolean[][] = initalizeBoard(width, height, 0);
    
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let aliveNeighborsCount = getAliveNeighborsCount(x, y, board);
            let cellValue = getCellValue(x, y, board);
            if (aliveNeighborsCount === 2 && cellValue || aliveNeighborsCount === 3) {
                newBoard[y][x] = true;
            }
        }
    }

    return newBoard;
}

function printBoard(alive: string, dead: string, board: boolean[][]): void {
    let buf = "";
    board.forEach(row => {
        row.forEach(cell => {
            buf += cell? alive: dead;
        });
        buf += '\n';
    });
    console.log(buf);
}

let board = initalizeBoard(30, 20, 30);
setInterval(() => {
    console.clear();
    printBoard("🟩", "⬛", board);
    board = getUpdatedBoard(board);
}, 200);

