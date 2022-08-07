const tiles = document.querySelector(".tiles");

let pseudoTileSize = document.body.clientWidth <= 768 && document.body.clientHeight <= 1024 ?
30 : 45;

let columns = Math.floor(document.body.clientWidth / pseudoTileSize);
let rows = Math.floor((document.body.clientHeight - 60) / pseudoTileSize);


const createTile = (index, rows, columns) => {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    tile.classList.add('tile__dead');
    tile.setAttribute('x', index % columns);
    tile.setAttribute('y', Math.floor(index / columns));

    tile.addEventListener("click", (e) => {
        let x = e.target.getAttribute("x");
        let y = e.target.getAttribute("y");
        console.log(`(${x}, ${y})`)
        let cellState = getCellValue(x, y, board);
        board[y][x] = !cellState; // flip cell state inside board

        if (cellState === true) {
            // if cell is alive change class to dead
            tile.classList.remove("tile__alive");
            tile.classList.add("tile__dead");
        }
        else {
            tile.classList.remove("tile__dead");
            tile.classList.add("tile__alive");
        }
    });

    return tile;
}

const createTiles = (rows, columns) => {
    Array.from(Array(rows*columns)).map((tile, index) => {
        tiles.appendChild(createTile(index, rows, columns));
    });
}

const createGrid = () => {
    tiles.innerHTML = "";

    columns = Math.floor(document.body.clientWidth / pseudoTileSize);
    rows = Math.floor(document.body.clientHeight / pseudoTileSize);

    tiles.style.setProperty("--columns", columns);
    tiles.style.setProperty("--rows", rows);

    createTiles(rows, columns);
}

createGrid();