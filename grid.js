const tiles = document.querySelector("#tiles");

let pseudoTileSize = 40;

if (document.body.clientWidth <= 428 && document.body.clientHeight <= 926) {
    pseudoTileSize = 25;
}

let columns = Math.floor(document.body.clientWidth / pseudoTileSize);
let rows = Math.floor(document.body.clientHeight / pseudoTileSize);


const createTile = (index, rows, columns) => {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    tile.classList.add('tile__dead');
    //tile.id = index;
    tile.setAttribute('x', index % columns);
    tile.setAttribute('y', Math.floor(index / columns));
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