import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Node from "./Node";
import Astar from "../astarAlgorithm/astar";
import Dijkstras from "../dijkstrasAlgorithm/dijkstras";
import "./Pathfind.css";
import location from "../location.png";
import target from "../target.png";
import AlgorithmDropdown from "./AlgorithmDropdown ";
import bfs from "../BFS-DFS/bfs"
import dfs from "../BFS-DFS/dfs"
const Pathfind = () => {
  const [Grid, setGrid] = useState([]);
  const row = 15; //15
  const col = 30; //30
  const [NODE_START_ROW, set_NODE_START_ROW] = useState(0);
  const [NODE_START_COL, set_NODE_START_COL] = useState(0);
  const [NODE_END_ROW, set_NODE_END_ROW] = useState(row - 2);
  const [NODE_END_COL, set_NODE_END_COL] = useState(col - 2);

  const [Path, setPath] = useState([]);
  const [Visited_Nodes, setVisitedNodes] = useState([]);
  const [execution_speed, setExecutionSpeed] = useState(100);

  const [no_nodes_visited, set_no_nodes_visited] = useState(0);
  const [len_path, set_len_path] = useState(0);
  const [gridBlocking, setGridBlocking] = useState([0.2,false]);
  const [time,setTime]=useState(0);
  useEffect(() => {
    initializeGrid();
  }, [gridBlocking]); //dependency required to

  const initializeGrid = () => {
    setGrid(undefined);
    const grid = new Array(row);

    for (let i = 0; i < row; i++) {
      grid[i] = new Array(col);
    }

    createSpot(grid);

    setGrid(grid);
    addNeighbours(grid);

    const startNode = grid[NODE_START_ROW][NODE_START_COL];
    const endNode = grid[NODE_END_ROW][NODE_END_COL];

    startNode.isWall = false;
    endNode.isWall = false;
  };

  const addNeighbours = (grid) => {
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        grid[i][j].addNeighbours(grid);
      }
    }
  };

  const createSpot = (grid) => {
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        grid[i][j] = new Spot(i, j);
        //console.log(`Node at (${i}, ${j}): isWall - ${grid[i][j].isWall}`);
      }
    }
  };

  function Spot(i, j) {
    this.x = i;
    this.y = j;
    this.isStart = this.x === NODE_START_ROW && this.y === NODE_START_COL;
    this.isEnd = this.x === NODE_END_ROW && this.y === NODE_END_COL;
    this.f = 0;
    this.h = 0;
    this.neighbours = []; //stores the node object
    this.previous = undefined;
    this.isWall = false;
    this.distance = Infinity;

    if(gridBlocking[1]==true){
      if (Math.random(1) < gridBlocking[0]) {
        this.isWall = true;
      }
    }
    

    this.addNeighbours = function (grid) {
      let i = this.x;
      let j = this.y;
      // //diagonal neighbours
      // if (i > 0 && j > 0) this.neighbours.push(grid[i - 1][j - 1]);
      // if (i > 0 && j < col - 1) this.neighbours.push(grid[i - 1][j + 1]);
      // if (i < row - 1 && j > 0) this.neighbours.push(grid[i + 1][j - 1]);
      // if (i < row - 1 && j < col - 1) this.neighbours.push(grid[i + 1][j + 1]);
      //vertical and horizontal neighbours
      if (i > 0) this.neighbours.push(grid[i - 1][j]);
      if (i < row - 1) this.neighbours.push(grid[i + 1][j]);
      if (j > 0) this.neighbours.push(grid[i][j - 1]);
      if (j < col - 1) this.neighbours.push(grid[i][j + 1]);

    };
  }

  const gridWithNode = (
    <div>
      {Grid.map((row, rowIndex) => {
        return (
          <div key={rowIndex} className="rowWrapper">
            {row.map((col, colIndex) => {
              const { isStart, isEnd, isWall } = col;
              //added
              const nodeClassName = `node ${isStart ? "node-start" : ""} ${
                isEnd ? "node-end" : ""
              } ${isWall ? "node-wall" : ""}`;

              //-----
              return (
                <Node
                  key={colIndex}
                  isStart={isStart}
                  isEnd={isEnd}
                  row={rowIndex}
                  col={colIndex}
                  isWall={isWall}
                  className={nodeClassName}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );

  const visualizeShortestPath = (shortestPathNodes) => {
    for (let i = 0; i < shortestPathNodes.length; i++) {
      setTimeout(() => {
        const node = shortestPathNodes[i];
        document.getElementById(`node-${node.x}-${node.y}`).className =
          "node node-shortest-path";
      }, execution_speed * i+10);
    }
    setTimeout(() => {
      set_len_path(shortestPathNodes.length);
    }, execution_speed * shortestPathNodes.length);
  };
  
  const visualizePath = (choice) => {
    let path;
    const startNode = Grid[NODE_START_ROW][NODE_START_COL];
    const endNode = Grid[NODE_END_ROW][NODE_END_COL];
  
    startNode.isWall = false;
    endNode.isWall = false;
    if (choice === 1) {
      path = Astar(startNode, endNode);
    } else if (choice === 2) {
      path = Dijkstras(startNode, endNode);
    } else if (choice === 3) {
      path = bfs(startNode, endNode);
    } else if (choice === 4) {
      path = dfs(startNode, endNode);
    }
    setPath(path.path);
    setVisitedNodes(path.visited || []);
    
    // console.log("Path: "+Path)
    // console.log("visited nodes "+Visited_Nodes)
    set_no_nodes_visited(Visited_Nodes.length);
    setTime(path.time)
    for (let i = 0; i < Visited_Nodes.length; i++) {
      setTimeout(() => {
        const node = Visited_Nodes[i];
        document.getElementById(`node-${node.x}-${node.y}`).className =
          "node node-visited";
      }, execution_speed * i+10);
    }
  
    setTimeout(() => {
      visualizeShortestPath(Path);
    }, execution_speed * Visited_Nodes.length+10);

   
  };


  const regenerate = () => {
    window.location.reload();
  };

  return (
    <div>
      <h1>Path Finding Visualizer</h1>
      <div className="header">
        <Dropdown className="speed-drop-down">
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Choose Algorithm
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => visualizePath(1)}>
              A Star Algorithm
            </Dropdown.Item>
            <Dropdown.Item onClick={() => visualizePath(2)}>
              Dijkstras
            </Dropdown.Item>
            <Dropdown.Item onClick={() => visualizePath(3)}>
              BFS
            </Dropdown.Item>
            <Dropdown.Item onClick={() => visualizePath(4)}>
              DFS
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown className="speed-drop-down">
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Visualization Speed
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setExecutionSpeed(5)}>
              Fast Execution
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setExecutionSpeed(20)}>
              Medium Execution
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setExecutionSpeed(35)}>
              Slow Execution
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown className="speed-drop-down">
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Grid Blocking
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setGridBlocking([0.2,true])}>
              Sparce Blocking
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setGridBlocking([0.3,true])}>
              Medium Blocking
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setGridBlocking([0.4,true])}>
              Dence Blocking
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Button variant="primary" className="regenerate" onClick={regenerate}>
          Regenerate
        </Button>
        
        <div className="curved-border-display">
    
         <b> Time Taken:  </b> 
          {time} secs
        </div>

        <AlgorithmDropdown />
      </div>
      <div className="info">
        <div>
          <div
            style={{
              color: "red",
              border: "1px solid black",
              backgroundColor: "rgb(116, 249, 116)",
              height: "30px",
              width: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/256/10076/10076257.png"
              alt="icon"
              style={{ height: "100%", width: "100%" }}
            />
          </div>
          Start Node
        </div>
        <div>
          <div
            style={{
              color: "red",
              border: "1px solid black",
              backgroundColor: "rgb(233, 47, 47)",
              height: "30px",
              width: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/256/10826/10826977.png"
              alt="icon"
              style={{ height: "100%", width: "100%" }}
            />
          </div>
          End Node
        </div>

        <div>
          <div
            style={{
              color: "red",
              border: "1px solid black",
              backgroundColor: "aquamarine",
              height: "30px",
              width: "30px",
            }}
          ></div>
          Shortest Path
        </div>

        <div>
          <div
            style={{
              color: "red",
              border: "1px solid black",
              backgroundColor: "peachpuff",
              height: "30px",
              width: "30px",
            }}
          ></div>
          Visited Nodes
        </div>
        <div>
          <div
            style={{
              color: "red",
              border: "1px solid black",
              backgroundColor: "white",
              height: "30px",
              width: "30px",
            }}
          ></div>
          Non Visited Nodes
        </div>
        <div>
          <div
            style={{
              color: "red",
              border: "1px solid black",
              backgroundColor: "rgb(12, 53, 71)",
              height: "30px",
              width: "30px",
            }}
          ></div>
          Obstacles
        </div>
      </div>
      <div className="Wrapper">
        {gridWithNode}

        <br />
        <br />
        <div>
          Number of nodes explored:{" "}
          <b style={{ color: "red" }}>{no_nodes_visited}</b>
          <br />
          Length of shortest path: <b style={{ color: "red" }}>{len_path}</b>
        </div>
      </div>
    </div>
  );
};

export default Pathfind;
