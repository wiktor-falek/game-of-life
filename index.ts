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
            let roll: number = Math.random() * 100;
            return (population > roll);
        });
    });
    return board;
}

/**
 * returns value of cell at (x, y)
 * supports negative indexing to allow for toroidal matrix
 * @param x horizontal
 * @param y vertical
 * @param board two dimensional array
 */
function getCellValue(x: number, y: number, board: boolean[][]): boolean {
    const width: number  = board[0].length;
    const height: number  = board.length;
    
    const xIndex: number  = ((x % width) + width) % width;
    const yIndex: number  = ((y % height) + height) % height;

    return board[yIndex][xIndex];
}

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
    ];

    let aliveCount: number = 0;

    neighborCoordinates.forEach((pos) => {
        let [x, y] = pos;
        aliveCount += +getCellValue(x, y, board);
    });
    return aliveCount;
}

/**
 * initializes new board, recalculates state of each cell and returns updated board
 * @param board two dimensional array
 */
function nextGeneration(board: boolean[][]): boolean[][] {
    const width: number = board[0].length;
    const height: number = board.length;

    const newBoard: boolean[][] = initalizeBoard(width, height, 0);
    
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let aliveNeighborsCount: number = getAliveNeighborsCount(x, y, board);
            let cellValue: boolean = getCellValue(x, y, board);
            if (aliveNeighborsCount === 2 && cellValue || aliveNeighborsCount === 3) {
                newBoard[y][x] = true;
            };
        };
    };
    return newBoard;
}

/**
 * clears console and logs buffered string
 * @param alive character representing alive cells
 * @param dead character representing dead cells
 * @param board two dimensional array
 */
function printBoard(alive: string, dead: string, board: boolean[][]): void {
    let buffer: string = "";
    board.forEach(row => {
        row.forEach(cell => {
            buffer += cell? alive: dead;
        });
        buffer += '\n';
    });
    console.clear();
    console.log(buffer);
}

function drawSquare(x: number, y: number, board: boolean[][], squareSize:number = 10): void {
    const cellIsAlive = board[y][x];
    ctx.fillStyle = cellIsAlive? "green": "black";
    ctx.fillRect(x*squareSize, y*squareSize, squareSize-1, squareSize-1);
}

function renderBoard(): void {
    board.forEach((row, y) => {
        row.forEach((cell, x) => {
            drawSquare(x, y, board);
        })
    })
    board = nextGeneration(board);
}

// Board Settings
const width: number = 80;
const height: number = 60;
const population: number = 10;

// Global Variables
let paused: boolean = false;
let board: boolean[][] = initalizeBoard(width, height, population);

// HTML Elements
const pauseButton: any = document.querySelector("#pause");
pauseButton.addEventListener('click', () => {
    paused = !paused;
    pauseButton.value = paused? "Resume": "Pause";
})

const resetButton: any = document.querySelector("#reset");
resetButton.addEventListener('click', () => {
    board = initalizeBoard(width, height, population);
    renderBoard();
})

// Rendering
const canvas: any = document.querySelector('#canvas');
const ctx: any = canvas.getContext('2d');

setInterval(() => {
    if (paused) return;
    renderBoard();
    board = nextGeneration(board);
}, 200);
