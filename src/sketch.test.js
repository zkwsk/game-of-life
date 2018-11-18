import { initializeData, countNeighbours } from './sketch';

const data = JSON.parse("[[0,1,1,1,1,1,0],[0,0,0,1,1,1,0],[0,0,0,0,1,0,0],[1,1,0,1,0,0,1],[1,1,0,0,0,0,0],[0,1,0,0,0,0,1],[0,1,0,0,0,0,0],[0,0,1,1,1,0,1],[0,0,0,0,0,0,0],[0,0,0,0,1,0,0],[1,0,0,0,1,0,1],[0,1,0,0,0,1,0],[0,0,0,1,0,0,1],[1,0,0,0,1,0,0],[0,0,0,0,1,0,0],[0,0,0,1,1,1,0],[0,0,0,0,0,1,0],[1,0,0,1,0,1,0],[0,0,0,0,0,1,0],[0,0,0,1,0,1,0],[1,1,0,0,0,1,0]]");

test('Tests work', () => {
  expect(1).toBe(1);
});

test('Initialize Data should work.', () => {
  
  const data = initializeData(10, 10);
  
  expect(data.length).toBe(10);
  expect(data[0].length).toBe(10);
});

test('Count neighbours equal 2 at (1, 1)', () => {
  expect(countNeighbours(1, 1, data)).toBe(2);
});

test('Count neighbours equal 6 at (1, 4)', () => {
  expect(countNeighbours(1, 4, data)).toBe(6);
});

test('Count neighbours equal 3 at (0, 0) (wrapping borders)', () => {
  expect(countNeighbours(0, 0, data)).toBe(3);
});

