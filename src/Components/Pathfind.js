import { useEffect, useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { DEFAULTS } from "../constants";
import Node from "./Node";
import Astar from "../algorithms/astarAlgorithm/astar";
import Dijkstras from "../algorithms/dijkstrasAlgorithm/dijkstras";
import bfs from "../algorithms/BFS-DFS/bfs";
import dfs from "../algorithms/BFS-DFS/dfs";
import Header from "./Header";
import { PathfindContext } from "../Contexts/PathfindContext";

import "../css/Pathfind.css";

const Pathfind = () => {
  const { algorithmSelected, setAlgorithmSelected, execution_speed, setExecutionSpeed, gridBlocking, setGridBlocking, time, setTime, isRunning,setIsRunning , shouldAnimate, setShouldAnimate} = useContext(PathfindContext);

  const row = 15;
  const col = 30;

  const [NODE_START_ROW, NODE_START_COL] = [0, 0];
  const [NODE_END_ROW, NODE_END_COL] = [row - 1, col - 1];

  const [Grid, setGrid] = useState([]);
  const [Path, setPath] = useState([]);
  const [Visited_Nodes, setVisitedNodes] = useState([]);
  const [no_nodes_visited, set_no_nodes_visited] = useState(0);
  const [len_path, set_len_path] = useState(0);
  const [animationVisitedIndex, setAnimationVisitedIndex] = useState(0);
  const [animationPathIndex, setAnimationPathIndex] = useState(0);
  const cellSize =
  window.innerWidth < 500 ? 10 :
  window.innerWidth < 900 ? 15 :
  30;

 useEffect(() => {
  initializeGrid();
}, [gridBlocking]);

useEffect(() => {
  if (!shouldAnimate) return;
  if (!Visited_Nodes.length) return;

  setAnimationVisitedIndex(0);

  const interval = setInterval(() => {
    setAnimationVisitedIndex(prev => {
      if (prev >= Visited_Nodes.length) {
        clearInterval(interval);
        return prev;
      }
      return prev + 1;
    });
  }, execution_speed);

  return () => clearInterval(interval);
}, [Visited_Nodes, execution_speed, shouldAnimate]);


 useEffect(() => {
  if (!shouldAnimate) return;
  if (!Path.length || animationVisitedIndex < Visited_Nodes.length) return;

  setAnimationPathIndex(0);

  const interval = setInterval(() => {
    setAnimationPathIndex(prev => {
      if (prev >= Path.length) {
        clearInterval(interval);
        setShouldAnimate(false); 
        return prev;
      }
      return prev + 1;
    });
  }, execution_speed);

  return () => clearInterval(interval);
}, [Path, animationVisitedIndex, execution_speed, shouldAnimate]);



  const cloneGrid = (grid) => {
  const newGrid = grid.map(row =>
    row.map(node => ({
      ...node,
      neighbours: [],
      previous: null,
      distance: Infinity,
      g: Infinity,
      f: Infinity,
      h: 0
    }))
  );

  // Reconnect neighbours
  for (let i = 0; i < newGrid.length; i++) {
    for (let j = 0; j < newGrid[0].length; j++) {
      const node = newGrid[i][j];
      if (i > 0) node.neighbours.push(newGrid[i - 1][j]);
      if (i < newGrid.length - 1) node.neighbours.push(newGrid[i + 1][j]);
      if (j > 0) node.neighbours.push(newGrid[i][j - 1]);
      if (j < newGrid[0].length - 1) node.neighbours.push(newGrid[i][j + 1]);
    }
  }

  return newGrid;
};

  function Spot(i, j) {
    this.x = i;
    this.y = j;
    this.isStart = i === NODE_START_ROW && j === NODE_START_COL;
    this.isEnd = i === NODE_END_ROW && j === NODE_END_COL;
    this.isWall = false;
    this.neighbours = [];
    this.previous = null;
    this.distance = Infinity;
    this.f = 0;
    this.h = 0;

    // Random wall
    if (gridBlocking[1] && Math.random() < gridBlocking[0]) {
      this.isWall = true;
    }

    this.addNeighbours = function (grid) {
      const neighbours = [];
      if (i > 0) neighbours.push(grid[i - 1][j]);
      if (i < row - 1) neighbours.push(grid[i + 1][j]);
      if (j > 0) neighbours.push(grid[i][j - 1]);
      if (j < col - 1) neighbours.push(grid[i][j + 1]);
      this.neighbours = neighbours;
    };
  }

  const initializeGrid = () => {
    const  grid = Array.from({ length: row }, (_, i) =>
      Array.from({ length: col }, (_, j) => new Spot(i, j))
    );

    // Add neighbours for each spot
    grid.forEach(row => row.forEach(spot => spot.addNeighbours(grid)));

    // Ensure start & end are not walls
    grid[NODE_START_ROW][NODE_START_COL].isWall = false;
    grid[NODE_END_ROW][NODE_END_COL].isWall = false;

    setGrid(grid);
    setPath([]);
    setVisitedNodes([]);
    set_no_nodes_visited(0);
    set_len_path(0);
  };

const visualizePath = (choice) => {
  if (!Grid.length) return;

  // reset the animation state
  setVisitedNodes([]);
  setPath([]);
  setAnimationVisitedIndex(0);
  setAnimationPathIndex(0);

  // clone grid to prevent the stale state
  const newGrid = cloneGrid(Grid);

  const startNode = newGrid[NODE_START_ROW][NODE_START_COL];
  const endNode = newGrid[NODE_END_ROW][NODE_END_COL];

  let result;

  switch (choice) {
    case 1:
      result = Astar(startNode, endNode);
      break;
    case 2:
      result = Dijkstras(startNode, endNode);
      break;
    case 3:
      result = bfs(startNode, endNode);
      break;
    case 4:
      result = dfs(startNode, endNode);
      break;
    default:
      return;
  }

  setVisitedNodes(result.visited || []);
  setPath(result.path || []);
  set_no_nodes_visited(result.visited?.length || 0);
  set_len_path(result.path?.length || 0);
  setTime(result.time || 0);

  
  setGrid(newGrid);
  setShouldAnimate(true);   //  start animation when button clicked
};
const regenerate = () => {
  // reset tHE default states
  setAlgorithmSelected(DEFAULTS.algorithm);
  setExecutionSpeed(DEFAULTS.speed);
  setGridBlocking(DEFAULTS.gridBlocking);
  setIsRunning(false);
 setShouldAnimate(false);   
  
  initializeGrid();

  // clear previous visualization
  setVisitedNodes([]);
  setPath([]);
  setAnimationVisitedIndex(0);
  setAnimationPathIndex(0);
  set_no_nodes_visited(0);
  set_len_path(0);
  setTime(0);
};

  return (
    <>
      <h1>Path Finding Visualizer</h1>
      <Header
        algorithmSelected={algorithmSelected}
        setAlgorithmSelected={setAlgorithmSelected}
        setExecutionSpeed={setExecutionSpeed}
        setGridBlocking={setGridBlocking}
        visualizePath={visualizePath}
        regenerate={regenerate}
        setIsRunning={setIsRunning}
      />

      <div className="Wrapper">
        <div>
          Number of nodes explored: <b style={{ color: "red" }}>{no_nodes_visited}</b>
          <br />
          Length of shortest path: <b style={{ color: "red" }}>{len_path}</b>
        </div>

        <div className="gridContainer"
  style={{ "--cell-size": `${cellSize}px` }}
  
  >
          {Grid.map((row, rowIndex) => (
            <div key={rowIndex} className="rowWrapper">
              {row.map((spot, colIndex) => {
                const isVisited = Visited_Nodes
                  .slice(0, animationVisitedIndex)
                  .some(n => n.x === rowIndex && n.y === colIndex);

                const isPath = Path
                  .slice(0, animationPathIndex)
                  .some(n => n.x === rowIndex && n.y === colIndex);

                return (
                  <Node
                    key={colIndex}
                    row={rowIndex}
                    col={colIndex}
                    isStart={spot.isStart}
                    isEnd={spot.isEnd}
                    isWall={spot.isWall}
                    isVisited={isVisited}
                    isPath={isPath}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Pathfind;