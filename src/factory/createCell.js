const createCell = function createGridCell(spec) {
  if (spec === undefined) {
    return Object.freeze({
      hasTopWall: true,
      hasRightWall: true,
      hasBottomWall: true,
      hasLeftWall: true,
    });
  }

  const {
    hasTopWall = true,
    hasRightWall = true,
    hasBottomWall = true,
    hasLeftWall = true,
  } = spec;

  return Object.freeze({
    hasTopWall,
    hasRightWall,
    hasBottomWall,
    hasLeftWall,
  });
};

export default createCell;
