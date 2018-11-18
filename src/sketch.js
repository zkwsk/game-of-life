// How many pixel width of a rendered square
const squareSize = 100;
// Indicates the frequency of "dead" squares. Enter a number between 1 and 2.
const sensitivity = 1.4

let data;
let columns;
let rows;

const initializeData = (columns, rows) => {

  const grid = new Array(columns);

  for (let i = 0; i < columns; i++) {
    grid[i] = new Array(rows);
    for (let j = 0; j < rows; j++) {
      grid[i][j] = Math.floor(Math.random() * sensitivity);
    }
  }

  return grid;
}

const sketch = (p5) => {

  columns = Math.floor(p5.windowWidth / squareSize);
  rows = Math.floor(p5.windowHeight / squareSize);

  p5.setup = () => {
    let canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);
    canvas.parent('canvas');
    p5.frameRate(2);
    p5.background(44, 44, 44);
    
    data = initializeData(columns, rows);
  };

  /*
   * Setup a new random populated grid.
   */


  p5.draw = () => {

    p5.background(44, 44, 44);

  // Draw grid
  for (let column = 0; column < columns; column++) {
    for (let row = 0; row < rows; row++) {
        debugger;
        if (data[column][row] === 1) {
          p5.fill(255, 255, 255);
          p5.stroke(0)
          p5.rect(column * squareSize, row * squareSize, squareSize, squareSize);
        }    
      }
    }
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  }
}

export default sketch;