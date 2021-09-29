import { assert, property, integer } from 'fast-check';
import {
  MIN_GRID_SIDE_LENGTH,
  MAX_GRID_SIDE_LENGTH,
} from '../src/constants';
import { isFullyWalled } from './testUtils';
import createGrid from '../src/factory/createGrid';

test('should create a fully-walled square grid', () => {
  assert(
    property(
      integer({ min: MIN_GRID_SIDE_LENGTH, max: MAX_GRID_SIDE_LENGTH }),
      (n) => {
        const grid = createGrid(n);
        expect(Array.isArray(grid)).toEqual(true);
        expect(Array.isArray(grid[0])).toEqual(true);
        expect(grid.length).toEqual(n);
        expect(grid[0].length).toEqual(n);
        grid.forEach((row) => {
          row.forEach((cell) => {
            expect(
              isFullyWalled(cell),
            ).toEqual(true);
          });
        });
      },
    ),
  );
});

test('should use the minimum side length when the input side length is less than the minimum side length', () => {
  assert(
    property(integer({ max: MIN_GRID_SIDE_LENGTH - 1 }), (n) => {
      const grid = createGrid(n);
      expect(grid.length).toEqual(MIN_GRID_SIDE_LENGTH);
      expect(grid[0].length).toEqual(MIN_GRID_SIDE_LENGTH);
    }),
  );
});

test('should use the maximum side length when the input side length is greater than the maximum side length', () => {
  assert(
    property(integer({ min: MAX_GRID_SIDE_LENGTH + 1 }), (n) => {
      const grid = createGrid(n);
      expect(grid.length).toEqual(MAX_GRID_SIDE_LENGTH);
      expect(grid[0].length).toEqual(MAX_GRID_SIDE_LENGTH);
    }),
  );
});

test('should assign the row and column index to its cells', () => {
  const grid = createGrid(MAX_GRID_SIDE_LENGTH);
  grid.forEach((rowArr, row) => {
    rowArr.forEach((cell, col) => {
      expect(cell.row).toEqual(row);
      expect(cell.col).toEqual(col);
    });
  });
});
