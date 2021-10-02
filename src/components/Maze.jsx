import React, { useState } from 'react';
import { isEqual } from 'lodash';
import { InputNumber, Button, Select } from 'antd';
import 'regenerator-runtime/runtime';
import Cell from './Cell';
import createGrid from '../factory/createGrid';
import generateMaze from '../algos/generate/generateMaze';
import {
  MIN_GRID_SIDE_LENGTH,
  MAX_GRID_SIDE_LENGTH,
  GRID_SIZE_IN_PX,
  ONE_SECOND_IN_MS,
  MAZE_GENERATION_ALGORITHMS,
  MAZE_SOLVING_ALGORITHMS,
} from '../constants';

import styles from './styles/Maze.module.scss';
import solve from '../algos/solve/solveMaze';

const { Option } = Select;

const Maze = function Maze() {
  /* Hooks */
  const [sideLength, setSideLength] = useState(MIN_GRID_SIDE_LENGTH);
  const [grid, setGrid] = useState(createGrid(sideLength));
  const [genAlgo, setGenAlgo] = useState(MAZE_GENERATION_ALGORITHMS.RANDOMIZED_DFS);
  const [solveAlgo, setSolveAlgo] = useState(MAZE_SOLVING_ALGORITHMS.BFS);
  const [isGenBtnLoading, setIsGenBtnLoading] = useState(false);
  const [isSolveBtnLoading, setIsSolveBtnLoading] = useState(false);
  const [isSolveBtnDisabled, setIsSolveBtnDisabled] = useState(false);

  /* Event handlers */
  const handleInputNumberChange = (n) => {
    setSideLength(n);
    setGrid(createGrid(n));
  };
  const handleGenAlgoChange = (algo) => { setGenAlgo(algo); };
  const handleSolveAlgoChange = (algo) => { setSolveAlgo(algo); };
  const handleGenerateButtonClick = () => {
    setIsGenBtnLoading(true);
    setIsSolveBtnDisabled(true);
    // setTimeout to give time for the button loading animation to play
    setTimeout(() => {
      setGrid(generateMaze(createGrid(sideLength), genAlgo));
      setIsGenBtnLoading(false);
      setIsSolveBtnDisabled(false);
    }, ONE_SECOND_IN_MS);
  };
  const handleSolveButtonClick = () => {
    setIsSolveBtnLoading(true);
    setTimeout(() => {
      grid.forEach((row) => row.forEach((cell) => { cell.visited = false; }));
      const [path, visited] = solve(
        grid, grid[0][0], grid[grid.length - 1][grid[0].length - 1], solveAlgo,
      );
      path.forEach((cell) => {
        grid[cell.row][cell.col].path = true;
        visited.delete(cell);
      });
      visited.forEach((cell) => {
        if (!(isEqual(cell.row, 0) && isEqual(cell.col, 0))
            && !(isEqual(cell.row, grid.length - 1) && isEqual(cell.col, grid[0].length - 1))) {
          grid[cell.row][cell.col].visited = true;
        }
      });
      setGrid([...grid]);
      setIsSolveBtnLoading(false);
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
  const genSolveClassNames = [
    styles.center,
    styles['gen-solve'],
  ];

  return (
    <div>
      <div style={gridDynamicStyles} className={gridViewportClassNames.join(' ')}>
        {grid.map((row, rowIndex) => row.map((cell, colIndex) => (
          <Cell
          // eslint-disable-next-line react/no-array-index-key
            key={`${rowIndex}-${colIndex}`}
            cell={cell}
            isStart={isEqual(rowIndex, 0) && isEqual(colIndex, 0)}
            isEnd={isEqual(rowIndex, grid.length - 1) && isEqual(colIndex, grid[0].length - 1)}
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
      <div className={genSolveClassNames.join(' ')}>
        <Select
          defaultValue={MAZE_GENERATION_ALGORITHMS.RANDOMIZED_DFS}
          onChange={handleGenAlgoChange}
        >
          <Option
            value={MAZE_GENERATION_ALGORITHMS.RANDOMIZED_DFS}
          >
            Randomized depth-first search
          </Option>
          <Option value={MAZE_GENERATION_ALGORITHMS.WILSON}>Wilson&#39;s algorithm</Option>
        </Select>
        <Button
          type="primary"
          loading={isGenBtnLoading}
          onClick={handleGenerateButtonClick}
        >
          Generate
        </Button>
      </div>
      <div className={genSolveClassNames.join(' ')}>
        <Select
          dropdownMatchSelectWidth={false}
          defaultValue={MAZE_SOLVING_ALGORITHMS.BFS}
          onChange={handleSolveAlgoChange}
        >
          <Option value={MAZE_SOLVING_ALGORITHMS.BFS}>Breadth-first search</Option>
          <Option value={MAZE_SOLVING_ALGORITHMS.A_STAR}>A*</Option>
        </Select>
        <Button
          type="primary"
          loading={isSolveBtnLoading}
          disabled={isSolveBtnDisabled}
          onClick={handleSolveButtonClick}
        >
          Solve
        </Button>
      </div>
    </div>
  );
};

export default Maze;
