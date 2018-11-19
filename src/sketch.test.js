import { initializeData, countPeers, computeNextState } from './sketch';

const data = JSON.parse("[[0,1,1,1,1,1,0],[0,0,0,1,1,1,0],[0,0,0,0,1,0,0],[1,1,0,1,0,0,1],[1,1,0,0,0,0,0],[0,1,0,0,0,0,1],[0,1,0,0,0,0,0],[0,0,1,1,1,0,1],[0,0,0,0,0,0,0],[0,0,0,0,1,0,0],[1,0,0,0,1,0,1],[0,1,0,0,0,1,0],[0,0,0,1,0,0,1],[1,0,0,0,1,0,0],[0,0,0,0,1,0,0],[0,0,0,1,1,1,0],[0,0,0,0,0,1,0],[1,0,0,1,0,1,0],[0,0,0,0,0,1,0],[0,0,0,1,0,1,0],[1,1,0,0,0,1,0]]");

test('Tests work', () => {
  expect(1).toBe(1);
});

test('Initialize Data should work.', () => {
  
  const data = initializeData(10, 10);
  
  expect(data.length).toBe(10);
  expect(data[0].length).toBe(10);
});

test('Count peers equal 2 at (1, 1)', () => {
  expect(countPeers(1, 1, data)).toBe(2);
});

test('Count peers equal 6 at (1, 4)', () => {
  expect(countPeers(1, 4, data)).toBe(6);
});

test('Count peers equal 3 at (0, 0) (wrapping borders)', () => {
  expect(countPeers(0, 0, data)).toBe(3);
});

test('Compute next state, death by underpopulation.', () => {
  expect(computeNextState(1, true)).toBe(0);
});

test('Compute next state, lives on.', () => {
  expect(computeNextState(2, true)).toBe(1);
  expect(computeNextState(3, true)).toBe(1);
});

test('Compute next state, death by overpopulation.', () => {
  expect(computeNextState(1, true)).toBe(0);
});

test('Compute next state, birth by reproduction.', () => {
  expect(computeNextState(3, false)).toBe(1);
});

test('Compute next state, no birth by reproduction.', () => {
  expect(computeNextState(2, false)).toBe(0);
});

test('Compute next state, no birth by reproduction.', () => {
  expect(computeNextState(4, false)).toBe(0);
});

test('Compute next state, negative livecount.', () => {
  expect(computeNextState(-1, true)).toBe(0);
});