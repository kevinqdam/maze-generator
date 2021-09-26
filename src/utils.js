const all = (booleans) => booleans.reduce((acc, x) => acc && x, true);
const isFullyWalled = (cell) => all([
  cell.hasTopWall,
  cell.hasRightWall,
  cell.hasBottomWall,
  cell.hasLeftWall,
]);

export {
  all,
  isFullyWalled,
};
