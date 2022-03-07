### How to run? 🤔
##### Transpile to javascript using `tsc` command
##### Then either run index.js with node `node index.js` or directly in browser

### Example usage 🔧

#### in node.js console
```ts
// gol.ts

// initialize board with width of 30, height of 20 and population of 30%
let board: boolean[][] = initalizeBoard(30, 20, 30); 

setInterval(() => {
    printBoard(board, "🟩", "⬛"); // optional character parameters representing alive and dead cells
    board = nextGeneration(board);  // takes previous board as an argument then updates 
}, 200); // update every 200ms
```
