import Shake from 'shake.js';

const debugmode = false;

// How many pixel width of a rendered square
const squareSize = 16;
// Indicates the frequency of "dead" squares. Enter a number between 1 and 2.
const sensitivity = 1.5;
// Set the framerate.
const speed = 20;
// Make the screen pan to the right by entering a positive value and to the left by entering a negative value.
const translateX = 0;
// Make the screen pan down by entering a positive value and up by entering a negative value.
const translateY = 0;

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

export const countPeers = (x, y, data) => {

  let sum = 0;

  // Iterate from -1 square "to the left" to +1 square "to the right"
  for (let column = -1; column <= 1; column++) {
    // Iterate from -1 square "up" to +1 square "down"
    for (let row = -1; row <= 1; row++) {
      // Avoid counting the center square
      if (column !== 0 || row !== 0) {

        let peerX = x + column;
        let peerY = y + row;

        if (peerX === -1) {
          // "wrap" the x-values so if they go into the negative,
          // they will start over at the opposite end of convas.
          peerX = data.length - 1;
        }
        if (peerX > data.length - 1) {
          // "wrap" the x-values so if they go past the maximum, they will reset.
          peerX = 0;
        }
        if (peerY === -1) {
          // "wrap" the y-values.
          peerY = data[0].length - 1;
        }
        if (peerY > data[0].length - 1) {
          // "wrap" the y-values when they go beyond max.
          peerY = 0;
        }
        debugmode && console.log(`x: ${peerX} y: ${peerY} value: ${data[peerX][peerY]}`);

        if (data[peerX][peerY] === 'undefined' || isNaN(data[peerX][peerY])) {
          debugger;
        }
        sum += data[peerX][peerY];
      }
    }
  }

  return sum;
}

export const computeNextState = (liveCount, alive) =>  {
  if (alive) {
    if (liveCount < 2) {
      return 0;
    }
    if (2 <= liveCount && liveCount <= 3) {
      return 1;
    }
    if (liveCount > 3) {
      return 0;
    }
  } else {
    if (liveCount === 3) {
      return 1;
    }
  }

  if (alive) {
    console.log('Probably something wrong if a live cell executes this code?');
  }

  // If none of the rules above apply, return the previous state.
  // Should only apply to dead cells that don't have exactly 3 live peers.
  return alive ? 1 : 0;
}

const roundByInterval = (input, interval) => {
  if (interval !== 0) {
    return Math.floor(input/interval) * interval;
  } else {
    return input;
  }
}

const debounce = (func, wait, immediate) => {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};


export const sketch = (p5) => {

  columns = Math.floor(p5.windowWidth / squareSize);
  rows = Math.floor(p5.windowHeight / squareSize);

  p5.setup = () => {
    let canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);
    canvas.parent('canvas');
    p5.frameRate(speed);
    p5.background(44, 44, 44);

    // Load initial data
    data = initializeData(columns, rows);
  };

  p5.draw = () => {

    p5.background(44, 44, 44);

    // Set an empty object for the "next state" to be loaded in.
    let nextState = new Array(columns);

    
    for (let column = 0; column < columns; column++) {
      
      // Initialize an empty row for the "next state" for each column.
      nextState[column] = new Array(rows);
      
      for (let row = 0; row < rows; row++) {

        const alive = data[column][row];

        // Draw live squares
        if (alive) {
          p5.fill(255, 255, 255);
          p5.rect(column * squareSize, row * squareSize, squareSize, squareSize);
        }
        // Compute and save the next state for a given field.
        nextState[column + translateX][row + translateY] = computeNextState(countPeers(column, row, data), alive);
      }
    }

    // Overwrite the previous state with the next one for next render.
    data = nextState;
  };

  /*
   * Window resize is debounced to improve performance.
   */
  p5.windowResized = debounce(() => {

    let windowWidth = roundByInterval(p5.windowWidth, squareSize);
    let windowHeight = roundByInterval(p5.windowHeight, squareSize);

    let nextColumns = windowWidth / squareSize;
    let nextRows = windowHeight / squareSize;

    // Only resize if screen is not too small
    if (nextColumns > 4 && nextRows > 4) {
      p5.resizeCanvas(windowWidth, windowHeight);

      columns = nextColumns;
      rows = nextRows;
      // Reload data for next redraw
      data = initializeData(columns, rows);
    }
  }, 250);
}

const shakeEvent = new Shake({
  threshold: 50,
  timeout: 1000
});

shakeEvent.start();

window.addEventListener(
  "shake",
  () => {
    // Reload data
    data = initializeData(columns, rows);
  },
  false
);
