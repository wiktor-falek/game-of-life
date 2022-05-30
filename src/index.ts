/**
 * @param width length of each array
 * @param height amount of arrays
 * @param population percentage chance of each individual cell to become true
 */
function initializeBoard(width: number, height: number, population: number = 0): boolean[][]  {
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
        [x,   y-1],           [x,   y+1],
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

    const newBoard: boolean[][] = initializeBoard(boardWidth, boardHeight, 0);
    
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

function drawSquare(x: number, y: number, board: boolean[][], squareSize: number): void {
    const cellIsAlive = board[y][x];
    ctx.fillStyle = cellIsAlive? "green": "black";
    ctx.fillRect(x*squareSize, y*squareSize, squareSize-1, squareSize-1);
}

function renderBoard(board: boolean[][]): void {
    board.forEach((row, y) => {
        row.forEach((cell, x) => {
            drawSquare(x, y, board, squareSize);
        })
    })
}


// HTML Elements
const canvas: any = document.querySelector('#canvas');
canvas.addEventListener("mousedown", function(e: any) {
    const rect = canvas.getBoundingClientRect();
    const xIndex = (e.clientX - rect.left) / squareSize >> 0; // rounds down
    const yIndex = (e.clientY - rect.top) / squareSize >> 0;
    const cell = getCellValue(xIndex, yIndex, board);
    board[yIndex][xIndex] = !cell;
    drawSquare(xIndex, yIndex, board, squareSize);
})

const ctx: any = canvas.getContext('2d');


const nextButton: any = document.querySelector("#next");
nextButton.addEventListener('click', () => {
    board = nextGeneration(board);
    renderBoard(board);
})


const pauseButton: any = document.querySelector("#pause");
pauseButton.addEventListener('click', (e: any) => {
    e.target.textContent = paused? "Pause": "Resume";
    paused = !paused;
})


const resetButton: any = document.querySelector("#reset");
resetButton.addEventListener('click', () => {
    board = initializeBoard(boardWidth, boardHeight, population);
    renderBoard(board);
})


const speedSlider: any = document.querySelector("#speed");
speedSlider.addEventListener('change', (e: any) => {
    timeout = 1000 - +e.target.value;
})

const populationSlider: any = document.querySelector("#population");
populationSlider.addEventListener('change', (e: any) => {
    population = +e.target.value;
})


// Global Variables
let population: number = 20;
let timeout: number = 1000 - +speedSlider.value;
let paused: boolean = false;

const boardWidth: number = 40;
const boardHeight: number = 30;
const squareSize:number  = 20;

let board: boolean[][] = initializeBoard(boardWidth, boardHeight, population);

(function loop() {
    if (!paused) {
        renderBoard(board);  
        board = nextGeneration(board);
    }
    window.setTimeout(loop, timeout);
})();
