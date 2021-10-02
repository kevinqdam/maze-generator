import { isEqual } from 'lodash';

import { MAZE_GENERATION_ALGORITHMS } from '../../constants';
import randomizedDfs from './randomizedDfs';
import wilson from './wilson';

const generateMaze = function generateMazeByRemovingWalls(grid, algorithm) {
  if (isEqual(MAZE_GENERATION_ALGORITHMS.RANDOMIZED_DFS, algorithm)) {
    randomizedDfs(grid);
  } else if (isEqual(MAZE_GENERATION_ALGORITHMS.WILSON, algorithm)) {
    wilson(grid);
  }

  return grid;
};

export default generateMaze;
