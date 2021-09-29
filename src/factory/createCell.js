import { isNil } from 'lodash';

const createCell = function createGridCell(spec) {
  if (isNil(spec)) {
    return {
      hasTopWall: true,
      hasRightWall: true,
      hasBottomWall: true,
      hasLeftWall: true,
    };
  }

  const {
    hasTopWall = true,
    hasRightWall = true,
    hasBottomWall = true,
    hasLeftWall = true,
  } = spec;

  return {
    hasTopWall,
    hasRightWall,
    hasBottomWall,
    hasLeftWall,
  };
};

export default createCell;
