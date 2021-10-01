import React, { useState } from 'react';
import { InputNumber, Button, Select } from 'antd';
import 'regenerator-runtime/runtime';
import Cell from './Cell';
import createGrid from '../factory/createGrid';
import generateMaze from '../algos/generateMaze';
import {
  MIN_GRID_SIDE_LENGTH,
  MAX_GRID_SIDE_LENGTH,
  GRID_SIZE_IN_PX,
  ONE_SECOND_IN_MS,
  MAZE_GENERATION_ALGORITHMS,
} from '../constants';

import styles from './Maze.module.scss';

const { Option } = Select;

const Maze = function Maze() {
  /* Hooks */
  const [sideLength, setSideLength] = useState(MIN_GRID_SIDE_LENGTH);
  const [grid, setGrid] = useState(createGrid(sideLength));
  const [algorithm, setAlgorithm] = useState(MAZE_GENERATION_ALGORITHMS.WILSON);
  const [isGenerateBtnLoading, setIsGenerateBtnLoading] = useState(false);

  /* Event handlers */
  const handleInputNumberChange = (n) => {
    setSideLength(n);
    setGrid(createGrid(n));
  };
  const handleAlgorithmChange = (algo) => {
    setAlgorithm(algo);
  };
  const handleGenerateButtonClick = () => {
    setIsGenerateBtnLoading(true);
    /* setTimeout to give time for the button loading animation to play */
    setTimeout(() => {
      setGrid([...(generateMaze(createGrid(sideLength), algorithm))]);
      setIsGenerateBtnLoading(false);
    }, ONE_SECOND_IN_MS);
  };

  /* Class names and styles */
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
  const algosClassNames = [
    styles.center,
    styles.algos,
  ];
  const btnClassNames = [
    styles.center,
    styles.btns,
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
        <InputNumber
          size="large"
          min={MIN_GRID_SIDE_LENGTH}
          max={MAX_GRID_SIDE_LENGTH}
          defaultValue={MIN_GRID_SIDE_LENGTH}
          onChange={handleInputNumberChange}
        />
      </div>
      <div className={algosClassNames.join(' ')}>
        <Select defaultValue="randomized-dfs" onChange={handleAlgorithmChange}>
          <Option value="randomized-dfs">Randomized depth-first search</Option>
          <Option value="wilson">Wilson&#39;s algorithm</Option>
        </Select>
      </div>
      <div className={btnClassNames.join(' ')}>
        <Button
          type="primary"
          loading={isGenerateBtnLoading}
          onClick={handleGenerateButtonClick}
        >
          Generate
        </Button>
      </div>
    </div>
  );
};

export default Maze;
