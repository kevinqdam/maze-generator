import { isFullyWalled } from './testUtils';
import createGrid from '../src/factory/createGrid';
import { MIN_GRID_SIDE_LENGTH } from '../src/constants';
import removeWall from '../src/removeWall';

test('should be able to remove left and right walls', () => {
  const grid = createGrid(MIN_GRID_SIDE_LENGTH);
  const leftCell = grid[0][0];
  const rightCell = grid[0][1];
  removeWall(leftCell, rightCell);
  expect(isFullyWalled(leftCell)).toEqual(false);
  expect(leftCell.hasTopWall).toEqual(true);
  expect(leftCell.hasRightWall).toEqual(false);
  expect(leftCell.hasBottomWall).toEqual(true);
  expect(leftCell.hasLeftWall).toEqual(true);
  expect(isFullyWalled(rightCell)).toEqual(false);
  expect(rightCell.hasTopWall).toEqual(true);
  expect(rightCell.hasRightWall).toEqual(true);
  expect(rightCell.hasBottomWall).toEqual(true);
  expect(rightCell.hasLeftWall).toEqual(false);
});

test('should be able to remove left and right walls commutatively', () => {
  const grid = createGrid(MIN_GRID_SIDE_LENGTH);
  const leftCell = grid[0][0];
  const rightCell = grid[0][1];
  removeWall(rightCell, leftCell);
  expect(isFullyWalled(leftCell)).toEqual(false);
  expect(leftCell.hasTopWall).toEqual(true);
  expect(leftCell.hasRightWall).toEqual(false);
  expect(leftCell.hasBottomWall).toEqual(true);
  expect(leftCell.hasLeftWall).toEqual(true);
  expect(isFullyWalled(rightCell)).toEqual(false);
  expect(rightCell.hasTopWall).toEqual(true);
  expect(rightCell.hasRightWall).toEqual(true);
  expect(rightCell.hasBottomWall).toEqual(true);
  expect(rightCell.hasLeftWall).toEqual(false);
});

test('should be able to remove top and bottom walls', () => {
  const grid = createGrid(MIN_GRID_SIDE_LENGTH);
  const topCell = grid[0][0];
  const bottomCell = grid[1][0];
  removeWall(topCell, bottomCell);
  expect(isFullyWalled(topCell)).toEqual(false);
  expect(topCell.hasTopWall).toEqual(true);
  expect(topCell.hasRightWall).toEqual(true);
  expect(topCell.hasBottomWall).toEqual(false);
  expect(topCell.hasLeftWall).toEqual(true);
  expect(isFullyWalled(bottomCell)).toEqual(false);
  expect(bottomCell.hasTopWall).toEqual(false);
  expect(bottomCell.hasRightWall).toEqual(true);
  expect(bottomCell.hasBottomWall).toEqual(true);
  expect(bottomCell.hasLeftWall).toEqual(true);
});

test('should be able to remove top and bottom walls commutatively', () => {
  const grid = createGrid(MIN_GRID_SIDE_LENGTH);
  const topCell = grid[0][0];
  const bottomCell = grid[1][0];
  removeWall(bottomCell, topCell);
  expect(isFullyWalled(topCell)).toEqual(false);
  expect(topCell.hasTopWall).toEqual(true);
  expect(topCell.hasRightWall).toEqual(true);
  expect(topCell.hasBottomWall).toEqual(false);
  expect(topCell.hasLeftWall).toEqual(true);
  expect(isFullyWalled(bottomCell)).toEqual(false);
  expect(bottomCell.hasTopWall).toEqual(false);
  expect(bottomCell.hasRightWall).toEqual(true);
  expect(bottomCell.hasBottomWall).toEqual(true);
  expect(bottomCell.hasLeftWall).toEqual(true);
});

test('should be able to remove multiple walls', () => {
  const grid = createGrid(MIN_GRID_SIDE_LENGTH);
  const topLeftCell = grid[0][0];
  const bottomCell = grid[1][0];
  const rightCell = grid[0][1];
  removeWall(topLeftCell, bottomCell);
  removeWall(topLeftCell, rightCell);
  expect(isFullyWalled(topLeftCell)).toEqual(false);
  expect(topLeftCell.hasTopWall).toEqual(true);
  expect(topLeftCell.hasRightWall).toEqual(false);
  expect(topLeftCell.hasBottomWall).toEqual(false);
  expect(topLeftCell.hasLeftWall).toEqual(true);
  expect(isFullyWalled(bottomCell)).toEqual(false);
  expect(bottomCell.hasTopWall).toEqual(false);
  expect(bottomCell.hasRightWall).toEqual(true);
  expect(bottomCell.hasBottomWall).toEqual(true);
  expect(bottomCell.hasLeftWall).toEqual(true);
  expect(isFullyWalled(rightCell)).toEqual(false);
  expect(rightCell.hasTopWall).toEqual(true);
  expect(rightCell.hasRightWall).toEqual(true);
  expect(rightCell.hasBottomWall).toEqual(true);
  expect(rightCell.hasLeftWall).toEqual(false);
});
