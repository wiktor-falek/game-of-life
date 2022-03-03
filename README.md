### How to run?
##### Transpile to javascript using `tsc` command
##### Then either run index.js with node `node index.js` or directly in browser

### Example usage
```js
let board = initalizeBoard(30, 20, 30); // initialize board with width of 30, height of 20 and population of 30%
setInterval(() => {
    console.clear();
    printBoard("🟩", "⬛", board); // set character for alive and dead cells
    board = getUpdatedBoard(board); 
}, 200); // update every 200ms
```
