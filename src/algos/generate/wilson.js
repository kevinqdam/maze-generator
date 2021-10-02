/* eslint-disable no-param-reassign */
import { cloneDeep, isEqual } from 'lodash';

import { DIRECTIONS } from '../../constants';
import {
  isOutOfBounds,
  removeWall,
  shuffle,
} from '../algosUtil';

const getNextStart = function getNextWalkOrigin(grid, index) {
  const row = Math.floor(index / grid.length);
  const col = (index % grid.length);

  return [row, col];
};

const randomWalk = function loopErasedRandomWalk(grid, [startRow, startCol], visited) {
  // Initialize variables for the random walk
  const walked = new Set();
  const path = [];
  const startCell = grid[startRow][startCol];
  let current = startCell;
  walked.add(current);
  path.push(current);

  // Walk until the path encounters a cell already in the maze
  while (!visited.has(current)) {
    // Update the current cell by selecting randomly from the adjacent cells.
    const steps = shuffle(cloneDeep(DIRECTIONS));
    let [nextRow, nextCol] = [];
    while (isOutOfBounds(grid, nextRow, nextCol)) {
      const prev = path[path.length - 1];
      let [dr, dc] = steps.pop();
      if (isEqual(current.row + dr, prev.row) && isEqual(current.col, prev.col)) {
        [dr, dc] = steps.pop();
      }
      [nextRow, nextCol] = [current.row + dr, current.col + dc];
    }
    current = grid[nextRow][nextCol];

    /**
     * Two cases:
     *   If the walk loops on itself, delete the loop before continuing.
     *   Otherwise, add the current cell to the walk and continue.
     */
    if (walked.has(current)) {
      while (!isEqual(path[path.length - 1], current)) walked.delete(path.pop());
    } else {
      walked.add(current);
      path.push(current);
    }
  }
  /**
   * The current walk has met the maze and is over.
   * Add the walked path to the maze by removing the walls that go through the path.
   */
  let thisCell = path.pop();
  visited.add(thisCell);
  while (path.length > 0) {
    const thatCell = path.pop();
    removeWall(thisCell, thatCell);
    thisCell = thatCell;
    visited.add(thisCell);
  }
};

const wilson = function wilsonsLoopErasedRandomWalkAlgorithm(grid) {
  // Initialize variables
  const visited = new Set();
  const targetMazeSize = (grid.length * grid[0].length);
  visited.add(grid[0][0]);
  let current = 1;

  /**
   * Get the next cell to start the walk from. Then, perform the loop-erased random walk.
   * Walk from each unvisited cell until everything has been visited.
   */
  while (current < targetMazeSize) {
    const [row, col] = getNextStart(grid, current);
    if (!visited.has(grid[row][col])) randomWalk(grid, [row, col], visited);
    current += 1;
  }
};

export default wilson;
