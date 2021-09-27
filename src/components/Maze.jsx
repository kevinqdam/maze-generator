import React, { useState } from 'react';
import { InputNumber } from 'antd';
import Cell from './Cell';
import createGrid from '../factory/createGrid';
import { MIN_GRID_SIDE_LENGTH, MAX_GRID_SIDE_LENGTH, GRID_SIZE_IN_PX } from '../constants';

import styles from './Maze.module.scss';

const Maze = function Maze() {
  const [sideLength, setSideLength] = useState(MIN_GRID_SIDE_LENGTH);
  const grid = createGrid(sideLength);
  const gridDynamicStyles = {
    width: `${GRID_SIZE_IN_PX}px`,
    height: `${GRID_SIZE_IN_PX}px`,
    gridTemplateColumns: `repeat(${sideLength}, 1fr)`,
  };
  const gridViewportClassNames = [
    styles.center,
    styles.maze,
  ];

  const inputSideLengthClassNames = [
    styles.center,
    styles['input-side-length'],
  ];

  return (
    <div>
      <div style={gridDynamicStyles} className={gridViewportClassNames.join(' ')}>
        {grid.map((row, rowIndex) => row.map((cell, cellIndex) => (
          <Cell
          // eslint-disable-next-line react/no-array-index-key
            key={`${rowIndex}-${cellIndex}`}
            cell={cell}
          />
        )))}
      </div>
      <div className={inputSideLengthClassNames.join(' ')}>
        <InputNumber size="large"
          min={MIN_GRID_SIDE_LENGTH}
          max={MAX_GRID_SIDE_LENGTH}
          defaultValue={MIN_GRID_SIDE_LENGTH}
          onChange={(n) => setSideLength(n)}
        />
      </div>
    </div>
  );
};

export default Maze;
