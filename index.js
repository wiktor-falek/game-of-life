window.onresize = () => {
    if (document.body.clientWidth <= 428 && document.body.clientHeight <= 926) {
        pseudoTileSize = 25;
    }
    createGrid()
    board = initializeBoard(columns, rows, 20); 
};


window.onload = () => {
    setInterval(() => {
        board = nextGeneration(board);

        for (let x = 0; x < columns; x++) {
            for (let y = 0; y < rows; y++) {
                let cellValue = getCellValue(x, y, board);
                let tile = document.querySelector(`.tile[x="${x}"][y="${y}"]`);

                if (cellValue) {
                    tile.classList.remove("tile__dead");
                    tile.classList.add("tile__alive");
                }
                else {
                    tile.classList.remove("tile__alive");
                    tile.classList.add("tile__dead");
                }
            }
        }
    }, 300);
}
