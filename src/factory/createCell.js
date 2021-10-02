import { isNil } from 'lodash';

const createCell = function createGridCell(spec) {
  if (isNil(spec)) {
    return {
      isActive: false,
      visited: false,
      path: false,
      hasTopWall: true,
      hasRightWall: true,
      hasBottomWall: true,
      hasLeftWall: true,
    };
  }

  const {
    isActive = false,
    visited = false,
    path = false,
    hasTopWall = true,
    hasRightWall = true,
    hasBottomWall = true,
    hasLeftWall = true,
  } = spec;

  return {
    isActive,
    visited,
    path,
    hasTopWall,
    hasRightWall,
    hasBottomWall,
    hasLeftWall,
  };
};

export default createCell;
