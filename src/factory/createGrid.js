import { isNil } from 'lodash';

import { MIN_GRID_SIDE_LENGTH, MAX_GRID_SIDE_LENGTH } from '../constants';
import createCell from './createCell';

const createGrid = function createNByNMazeGrid(n) {
  let sideLength = n;
  if (isNil(n) || sideLength < MIN_GRID_SIDE_LENGTH) sideLength = MIN_GRID_SIDE_LENGTH;
  if (sideLength > MAX_GRID_SIDE_LENGTH) sideLength = MAX_GRID_SIDE_LENGTH;

  const grid = Array.from(
    { length: sideLength }, () => Array.from(
      { length: sideLength }, createCell,
    ),
  );
  grid.forEach((rowArr, row) => {
    rowArr.forEach((cell, col) => {
      // eslint-disable-next-line no-param-reassign
      cell.row = row;
      // eslint-disable-next-line no-param-reassign
      cell.col = col;
    });
  });

  return grid;
};

export default createGrid;
