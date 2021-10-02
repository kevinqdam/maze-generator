import { Queue } from '@datastructures-js/queue';
import { isEqual, isNil } from 'lodash';
import { DIRECTIONS } from '../../constants';
import { isOutOfBounds } from '../algosUtil';

const bfs = function breadthFirstSearch(grid, source, target) {
  const visited = new Set();
  const cameFrom = new Map();
  const toVisit = new Queue();
  toVisit.enqueue(source);
  cameFrom.set(source, null);
  while (!toVisit.isEmpty()) {
    const current = toVisit.dequeue();
    visited.add(current);
    if (isEqual(current, target)) break;
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

export default bfs;
