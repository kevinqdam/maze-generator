# Maze Generator

## Usage Instructions to run Locally
1. Clone this repository and navigate to the root.
2. Execute the following from a terminal window.

```
$ npm ci
$ npm run start
```

## What is this?
This is a maze generator (and solver) written with React to run in the browser.

## What does it do?
The maze generator allows you to select algorithms to generate and solve the maze, respectively.

Solving the maze also provides a visualization of the path to the target as well as show which cells were visited but are not part of the solution path. This visualization allows one to quickly see which algorithm is more efficient in finding the target destination.

For example, bread-first search and A* both provide the solution to the maze, but A* visits fewer cells to calculate the solution when compared to breadth-first search.
