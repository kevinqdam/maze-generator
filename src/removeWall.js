import { isEqual } from 'lodash';

/* eslint-disable no-param-reassign */
const removeWall = function removeWallBetweenCells(thisCell, thatCell) {
  if (isEqual(thisCell.row, thatCell.row) && isEqual(thisCell.col + 1, thatCell.col)) {
    thisCell.hasRightWall = false;
    thatCell.hasLeftWall = false;
  } else if (isEqual(thisCell.row, thatCell.row) && isEqual(thisCell.col, thatCell.col + 1)) {
    thisCell.hasLeftWall = false;
    thatCell.hasRightWall = false;
  } else if (isEqual(thisCell.col, thatCell.col) && isEqual(thisCell.row + 1, thatCell.row)) {
    thisCell.hasBottomWall = false;
    thatCell.hasTopWall = false;
  } else if (isEqual(thisCell.col, thatCell.col) && isEqual(thisCell.row, thatCell.row + 1)) {
    thisCell.hasTopWall = false;
    thatCell.hasBottomWall = false;
  }
};

export default removeWall;
