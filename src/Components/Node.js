import React from "react";
import "../css/Node.css";

const Node = ({ isStart, isEnd, row, col, isWall, isVisited, isPath }) => {
  return (
    <div
      id={`node-${row}-${col}`} 
      className={`node ${
        isStart ? "node-start" : ""
      } ${isEnd ? "node-end" : ""} ${isWall ? "node-wall" : ""} ${
        isVisited ? "node-visited" : ""
      } ${isPath ? "node-shortest-path" : ""}`}
    />
  );
};

export default Node;