import { MAZE_GENERATION_ALGORITHMS } from '../constants';
import wilson from './wilson';

const generateMaze = function generateMazeByRemovingWalls(grid, algorithm) {
  if (algorithm === MAZE_GENERATION_ALGORITHMS.WILSON) {
    wilson(grid);
  }

  return grid;
};

export default generateMaze;
