import { cloneDeep } from 'lodash';
import { DIRECTIONS } from '../../constants';
import { isOutOfBounds, removeWall, shuffle } from '../algosUtil';

const dfs = function recursiveDfs(grid, row, col, visited) {
  const current = grid[row][col];
  if (visited.has(current)) return;
  visited.add(current);

  const steps = shuffle(cloneDeep(DIRECTIONS));
  steps.forEach(([dr, dc]) => {
    const [nextRow, nextCol] = [row + dr, col + dc];
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
