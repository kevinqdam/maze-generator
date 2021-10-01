/* eslint-disable no-param-reassign */
import { isEqual } from 'lodash';

import { DIRECTIONS } from '../constants';
import {
  isOutOfBounds,
  removeWall,
  shuffle,
} from './algosUtil';

const getNextStart = function getNextWalkOrigin(grid, index) {
  const row = Math.floor(index / grid.length);
  const col = (index % grid.length);

  return [row, col];
};

const randomWalk = function loopErasedRandomWalk(grid, [startRow, startCol]) {
  // Initialize variables for the random walk
  const walked = new Set();
  const path = [];
  const startCell = grid[startRow][startCol];
  let current = startCell;
  walked.add(current);
  path.push(current);

  // Walk until the path encounters a cell already in the maze
  while (!current.visited) {
    // Update the current cell by selecting randomly from the adjacent cells.
    const steps = shuffle([...DIRECTIONS]);
    let [nextRow, nextCol] = [];
    while (isOutOfBounds(grid, nextRow, nextCol)) {
      const prev = path[path.length - 1];
      let [dx, dy] = steps.pop();
      if (isEqual(current.row + dx, prev.row) && isEqual(current.col, prev.col)) {
        [dx, dy] = steps.pop();
      }
      [nextRow, nextCol] = [current.row + dx, current.col + dy];
    }
    current = grid[nextRow][nextCol];

    /**
     * Two cases:
     *   If the walk loops on itself, delete the loop before continuing.
     *   Otherwise, add the current cell to the walk and continue.
     */
    if (walked.has(current)) {
      while (path[path.length - 1] !== current) walked.delete(path.pop());
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
  thisCell.visited = true;
  while (path.length > 0) {
    const thatCell = path.pop();
    removeWall(thisCell, thatCell);
    thisCell = thatCell;
    thisCell.visited = true;
  }
};

const wilson = function wilsonsLoopErasedRandomWalkAlgorithm(grid) {
  // Initialize variables
  const targetMazeSize = (grid.length * grid[0].length);
  grid[0][0].visited = true;
  let current = 1;

  /**
   * Get the next cell to start the walk from. Then, perform the loop-erased random walk.
   * Walk from each unvisited cell until everything has been visited.
   */
  while (current < targetMazeSize) {
    const [row, col] = getNextStart(grid, current);
    if (!grid[row][col].visited) randomWalk(grid, [row, col]);
    current += 1;
  }
};

export default wilson;
