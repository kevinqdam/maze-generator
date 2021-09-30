import { isNil, isEqual } from 'lodash';

const isOutOfBounds = function isOutOfBounds(grid, row, col) {
  return (
    isNil(row) || isNil(col)
    || row < 0 || col < 0
    || row >= grid.length || col >= grid.length
  );
};

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
/* eslint-enable no-alert, no-console */

const shuffle = (function shuffleClosure() {
  const getRandomFromRange = (low, high) => (Math.floor(Math.random() * (high - low + 1)) + low);

  return function fisherYates1DShuffleInPlace(arr) {
    for (let i = 0; i < arr.length; i += 1) {
      const rnd = Math.floor(getRandomFromRange(i, arr.length - 1));
      [arr[i], arr[rnd]] = [arr[rnd], arr[i]];
    }

    return arr;
  };
}());

export {
  isOutOfBounds,
  removeWall,
  shuffle,
};
