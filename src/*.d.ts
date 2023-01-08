interface Cell {
  state: 0 | 1;
  aliveNeighbors: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
}

interface Board {
  length: number;
  width: number;
  height: number;
  map: Cell[][];
}