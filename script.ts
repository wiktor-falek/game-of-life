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

function printBoard(board: boolean[][], alive: string = "🟩", dead: string = "⬛"): void {
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

function drawSquare(x: number, y: number, board: boolean[][], squareSize:number = 20): void {
    const cellIsAlive = board[y][x];
    ctx.fillStyle = cellIsAlive? "green": "black";
    ctx.fillRect(x*squareSize, y*squareSize, squareSize-1, squareSize-1);
}

function renderBoard(board: boolean[][]): void {
    board.forEach((row, y) => {
        row.forEach((cell, x) => {
            drawSquare(x, y, board);
        })
    })
    board = nextGeneration(board);
}

// HTML Elements
const nextButton: any = document.querySelector("#next");
nextButton.addEventListener('click', (e: any) => {
    board = nextGeneration(board)
    renderBoard(board);
})

const pauseButton: any = document.querySelector("#pause");
pauseButton.addEventListener('click', (e: any) => {
    e.target.textContent = paused? "Pause": "Resume";
    paused = !paused;
})

const resetButton: any = document.querySelector("#reset");
resetButton.addEventListener('click', (e: any) => {
    board = initalizeBoard(width, height, population);
    renderBoard(board);
})

const speedSlider: any = document.querySelector("#speed");
speedSlider.addEventListener('change', (e: any) => {
    timeout = +e.target.value;
})


// Board Settings
const width: number = 40;
const height: number = 30;
const population: number = 20;

// Global Variables
let timeout: number = +speedSlider.value;
let paused: boolean = false;
let board: boolean[][] = initalizeBoard(width, height, population);


// Rendering
const canvas: any = document.querySelector('#canvas');
const ctx: any = canvas.getContext('2d');


function loop() {
    if (!paused) {
        renderBoard(board);  
        board = nextGeneration(board);
    }
    window.setTimeout(loop, timeout);
}

loop()