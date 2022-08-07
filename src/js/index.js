window.onresize = () => {
    pseudoTileSize = document.body.clientWidth <= 768 && document.body.clientHeight <= 1024 ?
    30 : 45;

    columns = Math.floor(document.body.clientWidth / pseudoTileSize);
    rows = Math.floor((document.body.clientHeight - 60) / pseudoTileSize);

    createGrid()
    board = initializeBoard(columns, rows, 20); 
};

window.onload = () => {
    let paused = false;

    setInterval(() => {
        if (document.hidden || paused) return;

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
