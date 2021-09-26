import React, { useState } from 'react';
import { Input } from 'antd';
import Cell from './Cell';
import createGrid from '../factory/createGrid';
import { MIN_GRID_SIDE_LENGTH, MAX_GRID_SIDE_LENGTH, GRID_SIZE_IN_PX } from '../constants';

import './Maze.css';

const Maze = function Maze() {
  const [sideLength, setSideLength] = useState(MIN_GRID_SIDE_LENGTH);
  const grid = createGrid(sideLength);
  const gridStyle = {
    width: `${GRID_SIZE_IN_PX}px`,
    height: `${GRID_SIZE_IN_PX}px`,
    gridTemplateColumns: `repeat(${sideLength}, 1fr)`,
  };
  const gridViewportClassNames = [
    'center',
    'maze',
  ];

  const inputSideLengthClassNames = [
    'center',
    'input-side-length',
  ];

  return (
    <div>
      <div style={gridStyle} className={gridViewportClassNames.join(' ')}>
        {grid.map((row, rowIndex) => row.map((cell, cellIndex) => (
          <Cell
          // eslint-disable-next-line react/no-array-index-key
            key={`${rowIndex}-${cellIndex}`}
            hasTopWall={cell.hasTopWall}
            hasRightWall={cell.hasRightWall}
            hasBottomWall={cell.hasBottomWall}
            hasLeftWall={cell.hasLeftWall}
            cellSideLengthInPx={Math.floor(GRID_SIZE_IN_PX / sideLength)}
          />
        )))}
      </div>
      <div className={inputSideLengthClassNames.join(' ')}>
        <Input
          type="number"
          min={MIN_GRID_SIDE_LENGTH}
          max={MAX_GRID_SIDE_LENGTH}
          defaultValue={MIN_GRID_SIDE_LENGTH}
          onChange={(event) => setSideLength(event.target.value)}
        />
      </div>
    </div>
  );
};

export default Maze;
