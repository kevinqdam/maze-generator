import { cloneDeep } from 'lodash';
import { DIRECTIONS } from '../constants';
import { isOutOfBounds, removeWall, shuffle } from './algosUtil';

const dfs = function recursiveDfs(grid, row, col) {
  const current = grid[row][col];
  if (current.visited) return;
  current.visited = true;

  const steps = shuffle(cloneDeep(DIRECTIONS));
  steps.forEach(([dx, dy]) => {
    const [nextRow, nextCol] = [row + dx, col + dy];
    if (isOutOfBounds(grid, nextRow, nextCol) || grid[nextRow][nextCol].visited) return;
    const next = grid[nextRow][nextCol];
    removeWall(current, next);
    dfs(grid, nextRow, nextCol);
  });
};

const randomizedDfs = function removeWallsByRandomizedDfs(grid) {
  dfs(grid, 0, 0);
};

export default randomizedDfs;
