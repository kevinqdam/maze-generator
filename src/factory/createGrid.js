import { MIN_GRID_SIDE_LENGTH, MAX_GRID_SIDE_LENGTH } from '../constants';
import createCell from './createCell';

const createGrid = function createNByNMazeGrid(n) {
  let sideLength = n;
  if (n === undefined || sideLength < MIN_GRID_SIDE_LENGTH) sideLength = MIN_GRID_SIDE_LENGTH;
  if (sideLength > MAX_GRID_SIDE_LENGTH) sideLength = MAX_GRID_SIDE_LENGTH;

  return Array.from({ length: sideLength }, () => Array.from({ length: sideLength }, createCell));
};

export default createGrid;
