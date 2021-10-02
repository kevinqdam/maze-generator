import { MinPriorityQueue } from '@datastructures-js/priority-queue';
import { isEqual, isNil } from 'lodash';
import { DIRECTIONS } from '../../constants';
import { isOutOfBounds } from '../algosUtil';

const aStar = function aStarPathFinding(grid, source, target) {
  const visited = new Set();
  const cameFrom = new Map();
  /**
   * A* requires a cost function and a heuristic function to calculate priority.
   * For this app, the cost of going from cell to cell is simply one hop, so a
   * trivial cost function is defined here to highlight the generality of A*.
   */
  const cost = () => 1;
  const heuristic = function calculateManhattanDistance(u, v) {
    if (isNil(v)) return 0;

    return (Math.abs(u.row - v.row) + Math.abs(u.col - v.col));
  };
  const toVisit = new MinPriorityQueue(
    { priority: (cell) => (cost() + heuristic(cell, target)) },
  );

  // Explore neighbors, cost and heuristic determine the priority
  cameFrom.set(source, null);
  toVisit.enqueue(source);
  while (!toVisit.isEmpty()) {
    const current = toVisit.dequeue().element;
    visited.add(current);
    if (isEqual(current.row, target.row) && isEqual(current.col, target.col)) break;
    DIRECTIONS.forEach(([dr, dc]) => {
      const [nextRow, nextCol] = [current.row + dr, current.col + dc];
      if (isOutOfBounds(grid, nextRow, nextCol)
          || visited.has(grid[nextRow][nextCol])
          || (isEqual(dr, 1) && isEqual(dc, 0) && current.hasBottomWall)
          || (isEqual(dr, -1) && isEqual(dc, 0) && current.hasTopWall)
          || (isEqual(dr, 0) && isEqual(dc, 1) && current.hasRightWall)
          || (isEqual(dr, 0) && isEqual(dc, -1) && current.hasLeftWall)) {
        return;
      }
      const next = grid[nextRow][nextCol];
      toVisit.enqueue(next);
      cameFrom.set(next, current);
    });
  }
  const path = [];
  let cell = cameFrom.get(target);
  while (!isNil(cell)) {
    path.push(cell);
    cell = cameFrom.get(cell);
  }
  path.pop();
  path.reverse();

  return [path, visited];
};

export default aStar;
