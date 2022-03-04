### How to run? 🤔
##### Transpile to javascript using `tsc` command
##### Then either run index.js with node `node index.js` or directly in browser

### Example usage 🔧
```js
// initialize board with width of 30, height of 20 and population of 30%
let board = initalizeBoard(30, 20, 30); 

setInterval(() => {
    printBoard("🟩", "⬛", board); // characters of choice for representation of alive and dead cells
    board = nextGeneration(board); 
}, 200); // update every 200ms
```
