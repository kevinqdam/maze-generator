import {
  assert, property, array, boolean,
} from 'fast-check';
import { all, isFullyWalled } from './testUtils';
import createCell from '../src/factory/createCell';

test('should create a cell with all four walls', () => {
  const cell = createCell();
  expect(isFullyWalled(cell)).toEqual(true);
});

test('should create a cell with all four walls when passed an empty spec', () => {
  const cell = createCell({});
  expect(isFullyWalled(cell)).toEqual(true);
});

test('should be able to remove walls dependent on the input spec', () => {
  assert(
    property(
      array(boolean(), { minLength: 4, maxLength: 4 }),
      (booleans) => {
        const [hasTopWall, hasRightWall, hasBottomWall, hasLeftWall] = booleans;
        const cell = createCell({
          hasTopWall, hasRightWall, hasBottomWall, hasLeftWall,
        });
        expect(
          all([
            cell.hasTopWall === hasTopWall,
            cell.hasRightWall === hasRightWall,
            cell.hasBottomWall === hasBottomWall,
            cell.hasLeftWall === hasLeftWall,
          ]),
        ).toEqual(true);
      },
    ),
  );
});
