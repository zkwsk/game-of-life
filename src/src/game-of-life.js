// require('normalize.css/normalize.css');
// require('./styles/index.scss');

// import p5 from 'p5';

// // const cols = 15;
// // const rows = 15;

// // const setupGrid = (cols, rows) => {
// //   const gridX = Array(rows);
// //   debugger;
// // }

// // const loadGrid = () => {
// //   return setupGrid(cols, rows);
// // }

// // setupGrid(cols, rows);

// /* Rules

// Any live cell with fewer than two live neighbors dies, as if by underpopulation.
// Any live cell with two or three live neighbors lives on to the next generation.
// Any live cell with more than three live neighbors dies, as if by overpopulation.
// Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
// */

// // const countLiveNeighbours = (x, y, data) => {
// //   let sum = 0;

// //   // Evaluation starts at 12 o'clock relative to the starting point and procedes clockwise.
// //   sum += data[x][y - 1] ? 1 : 0;
// //   debugger;
// //   sum += data[x + 1][y - 1] ? 1 : 0;
// //   sum += data[x + 1][y] ? 1 : 0;
// //   sum += data[x + 1][y + 1] ? 1 : 0;
// //   sum += data[x][y + 1] ? 1 : 0;
// //   sum += data[x - 1][y + 1] ? 1 : 0;
// //   sum += data[x - 1][y - 1] ? 1 : 0;
// //   sum += data[x - 1][y + 1] ? 1 : 0;

// //   return sum;
// // }

// // console.table(data.testset);

// // console.log(countLiveNeighbours(7, 2, data.testset));

// const columns = 15;
// const rows = 15;
// const startRate = 5;

// class GameOfLife {
//   constructor() {

//   }

  // /*
  //  * Setup a new random populated grid.
  //  */
  // buildGrid() {
  //   const grid = new Array(columns);

  //   for (let i = 0; i < columns; i++) {
  //     grid[i] = new Array(rows);
  //     for (let j = 0; j < rows; j++) {
  //       grid[i][j] = Math.floor(Math.random() * 2);
  //     }
  //   }
  //   return grid;
  // }

// }

// p5.setup = () => {
//   const canvas = p5.createCanvas(600, 400);
//   canvas.parent('canvas');
//   const gol = new GameOfLife();
//   grid = 
// }


import p5 from 'p5';

const buildGrid = (width, height) => {

  const columns = Math.floor(width / squareSize);
  const rows = Math.floor(height / squareSize);
  const grid = new Array(columns);

  for (let i = 0; i < columns; i++) {
    grid[i] = new Array(rows);
    for (let j = 0; j < rows; j++) {
      grid[i][j] = Math.floor(Math.random() * 2);
    }
  }
  debugger;
  return grid;
}

const GameOfLife = (p5) => {

  // How many pixel width of a rendered square
  const squareSize = 30;

  p5.setup = () => {
    let canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);
    canvas.parent('canvas');
    p5.frameRate(30);
    p5.background(44, 44, 44);
  };

  /*
   * Setup a new random populated grid.
   */


  p5.draw = () => {
    p5.background(44, 44, 44);
    debugger;
    this.buildGrid(p5.windowWidth, p5.windowHeight);

    p5.rect(x, y, w, w)
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  }
}

export default GameOfLife;