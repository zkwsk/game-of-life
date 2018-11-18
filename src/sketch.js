const debugmode = false;

// How many pixel width of a rendered square
const squareSize = 100;
// Indicates the frequency of "dead" squares. Enter a number between 1 and 2.
const sensitivity = 1.4

let data;
let columns;
let rows;

/*
 * Setup a new random populated data grid.
*/
export const initializeData = (columns, rows) => {
  const data = new Array(columns);

  for (let i = 0; i < columns; i++) {
    data[i] = new Array(rows);
    for (let j = 0; j < rows; j++) {
      data[i][j] = Math.floor(Math.random() * sensitivity);
    }
  }

  return data;
}

export const countNeighbours = (x, y, data) => {

  let sum = 0;

  // Iterate from -1 square "to the left" to +1 square "to the right"
  for (let column = -1; column <= 1; column++) {
    // Iterate from -1 square "up" to +1 square "down"
    for (let row = -1; row <= 1; row++) {
      // Avoid counting the center square
      if (column !== 0 || row !== 0) {

        let neighbourX = x + column;
        let neighbourY = y + row;

        if (neighbourX === -1) {
          // "wrap" the x-values so if they go into the negative,
          // they will start over at the opposite end of convas.
          neighbourX = data.length - 1;
        }
        if (neighbourY === -1) {
          // "wrap" the y-values.
          neighbourY = data[0].length - 1;
        }
        debugmode && console.log(`x: ${neighbourX} y: ${neighbourY} value: ${data[neighbourX][neighbourY]}`);
        sum += data[neighbourX][neighbourY];
      }
    }
  }

  return sum;
}

export const sketch = (p5) => {

  columns = Math.floor(p5.windowWidth / squareSize);
  rows = Math.floor(p5.windowHeight / squareSize);

  p5.setup = () => {
    let canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);
    canvas.parent('canvas');
    p5.frameRate(2);
    p5.background(44, 44, 44);

    data = initializeData(columns, rows);
  };

  p5.draw = () => {

    p5.background(44, 44, 44);

    // Draw grid
    for (let column = 0; column < columns; column++) {
      for (let row = 0; row < rows; row++) {

        if (data[column][row] === 1) {
          p5.fill(255, 255, 255);
          p5.stroke(0)
          p5.rect(column * squareSize, row * squareSize, squareSize, squareSize);
        }
      }
    }

    countNeighbours(1, 1, data);
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  }
}
