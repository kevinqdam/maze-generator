import { isEqual } from 'lodash';

import { MAZE_GENERATION_ALGORITHMS } from '../../constants';
import randomizedDfs from './randomizedDfs';
import wilson from './wilson';

const generateMaze = function generateMazeByRemovingWalls(grid, algorithm) {
  if (isEqual(algorithm, MAZE_GENERATION_ALGORITHMS.RANDOMIZED_DFS)) {
    randomizedDfs(grid);
  } else if (isEqual(algorithm, MAZE_GENERATION_ALGORITHMS.WILSON)) {
    wilson(grid);
  }

  return grid;
};

export default generateMaze;
