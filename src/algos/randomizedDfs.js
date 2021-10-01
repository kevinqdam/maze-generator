import { DIRECTIONS } from '../constants';
import { isOutOfBounds, removeWall, shuffle } from './algosUtil';

const dfs = function recursiveDfs(grid, row, col, visited) {
  if (visited.has(grid[row][col])) return;

  const current = grid[row][col];
  visited.add(current);

  const steps = shuffle([...DIRECTIONS]);
  steps.forEach(([dx, dy]) => {
    const [nextRow, nextCol] = [row + dx, col + dy];
    if (isOutOfBounds(grid, nextRow, nextCol) || visited.has(grid[nextRow][nextCol])) return;
    const next = grid[nextRow][nextCol];
    removeWall(current, next);
    dfs(grid, nextRow, nextCol, visited);
  });
};

const randomizedDfs = function removeWallsByRandomizedDfs(grid) {
  const visited = new Set();
  dfs(grid, 0, 0, visited);
};

export default randomizedDfs;
