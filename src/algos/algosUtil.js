import { isNil } from 'lodash';

const isOutOfBounds = function isOutOfBounds(grid, row, col) {
  return (
    isNil(row) || isNil(col)
    || row < 0 || col < 0
    || row >= grid.length || col >= grid.length
  );
};

/* eslint-disable no-param-reassign */
const removeWall = function removeWallBetweenCells(thisCell, thatCell) {
  if (thisCell.row === thatCell.row && thisCell.col + 1 === thatCell.col) {
    thisCell.hasRightWall = false;
    thatCell.hasLeftWall = false;
  } else if (thisCell.row === thatCell.row && thisCell.col === thatCell.col + 1) {
    thisCell.hasLeftWall = false;
    thatCell.hasRightWall = false;
  } else if (thisCell.col === thatCell.col && thisCell.row + 1 === thatCell.row) {
    thisCell.hasBottomWall = false;
    thatCell.hasTopWall = false;
  } else if (thisCell.col === thatCell.col && thisCell.row === thatCell.row + 1) {
    thisCell.hasTopWall = false;
    thatCell.hasBottomWall = false;
  }
};
/* eslint-enable no-alert, no-console */

export {
  isOutOfBounds,
  removeWall,
};
