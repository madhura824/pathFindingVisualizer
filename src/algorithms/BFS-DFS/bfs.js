import { reconstruction } from "../../constants";

const bfs = (startNode, endNode) => {
  const queue = [startNode];
  const visited = [];
  const visitedSet = new Set();

  let start_time = Date.now();

  visitedSet.add(startNode);

  while (queue.length > 0) {
    const current = queue.shift();
    visited.push(current);

    if (current === endNode) break;

    current.neighbours.forEach(neighbor => {
      if (
        neighbor &&
        !visitedSet.has(neighbor) &&
        !neighbor.isWall
      ) {
        neighbor.previous = current;
        visitedSet.add(neighbor);
        queue.push(neighbor);
      }
    });
  }

  let end_time = Date.now();
  let time = end_time - start_time;

  const path = reconstruction(endNode);

  return { path, visited, time };
};

export default bfs;