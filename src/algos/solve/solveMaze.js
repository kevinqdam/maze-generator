import { isEqual } from 'lodash';
import { MAZE_SOLVING_ALGORITHMS } from '../../constants';
import aStar from './aStar';
import bfs from './bfs';

const solve = function solveMaze(grid, source, target, algorithm) {
  if (isEqual(MAZE_SOLVING_ALGORITHMS.A_STAR, algorithm)) {
    return aStar(grid, source, target);
  }

  return bfs(grid, source, target);
};

export default solve;
