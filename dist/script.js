"use strict";
function initalizeBoard(width, height, population = 0) {
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
function nextGeneration(board) {
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
    const width = board[0].length;
    const height = board.length;
    const newBoard = initalizeBoard(width, height, 0);
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let aliveNeighborsCount = getAliveNeighborsCount(x, y, board);
            let cellValue = getCellValue(x, y, board);
            if (aliveNeighborsCount === 2 && cellValue || aliveNeighborsCount === 3) {
                newBoard[y][x] = true;
            }
            ;
        }
        ;
    }
    ;
    return newBoard;
}
function printBoard(alive, dead, board) {
    let buffer = "";
    board.forEach(row => {
        row.forEach(cell => {
            buffer += cell ? alive : dead;
        });
        buffer += '\n';
    });
    console.clear();
    console.log(buffer);
}
function drawSquare(x, y, board, squareSize = 10) {
    const cellIsAlive = board[y][x];
    ctx.fillStyle = cellIsAlive ? "green" : "black";
    ctx.fillRect(x * squareSize, y * squareSize, squareSize - 1, squareSize - 1);
}
function renderBoard() {
    board.forEach((row, y) => {
        row.forEach((cell, x) => {
            drawSquare(x, y, board);
        });
    });
    board = nextGeneration(board);
}
const width = 80;
const height = 60;
const population = 10;
let paused = false;
let board = initalizeBoard(width, height, population);
const pauseButton = document.querySelector("#pause");
pauseButton.addEventListener('click', () => {
    paused = !paused;
    pauseButton.value = paused ? "Resume" : "Pause";
});
const resetButton = document.querySelector("#reset");
resetButton.addEventListener('click', () => {
    board = initalizeBoard(width, height, population);
    renderBoard();
});
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
setInterval(() => {
    if (paused)
        return;
    renderBoard();
    board = nextGeneration(board);
}, 2000);
