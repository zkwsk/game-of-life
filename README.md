# Game of Life
[Conways Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) is a cellular automaton devised by the British mathematician John Horton Conway.

It's not a line-by-line copy, but [this tutorial](https://www.youtube.com/watch?v=FWSR_7kZuYg) was used for inspiration. Besides tuning some of the logic, the canvas is now set up to resize and reload when the screen size changes, I've set up the project to have dependencies managed by NPM, rewritten it to ES6 and added a test suite.

## Demo

Live demo [here](https://yv9pk13lk9.codesandbox.io/)

## Rules
* Any live cell with fewer than two live neighbors dies, as if by underpopulation.
* Any live cell with two or three live neighbors lives on to the next generation.
* Any live cell with more than three live neighbors dies, as if by overpopulation.
* Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.

## Installation

Install npm dependencies

```sh
 npm install 
```

## Running the project
The project is written in ES6 and is transpiled with Babel using Webpack. To start the development server

```sh
npm start
```

To build for production

```sh
npm run build
```

To preview the production build
```sh
npm run preview
```

## Tests
The most critical functions have unit tests, located in the `/src/sketch.test.js` folder. To run the test suite with JEST run the command `npm run test`.

Current status: [![Build Status](https://travis-ci.com/zkwsk/game-of-life.svg?branch=master)](https://travis-ci.com/zkwsk/game-of-life)

## Easter Eggs
As a little added bonus, if you load the game on a modern smartphone (iOS 4.2.1+, Android 4.0.3+) you can shake the phone to reset the application. After a while the cellular automation tends to reach a stable state so this is a way to disrupt it. Alternatively you can resize the screen or reload the page. To detect motion [shake.js](https://github.com/alexgibson/shake.js/) was used.
