import { reconstruction } from "../../constants";

const dfs = (startNode, endNode) => {
  const stack = [startNode];
  const visited = [];
  const visitedSet = new Set();

  let start_time = Date.now();

  while (stack.length > 0) {
    const current = stack.pop();

    if (visitedSet.has(current)) continue;

    visitedSet.add(current);
    visited.push(current);

    if (current === endNode) break;

    current.neighbours.forEach(neighbor => {
      if (
        neighbor &&
        !visitedSet.has(neighbor) &&
        !neighbor.isWall
      ) {
        neighbor.previous = current;
        stack.push(neighbor);
      }
    });
  }

  let end_time = Date.now();
  let time = end_time - start_time;

  const path = reconstruction(endNode);

  return { path, visited, time };
};

export default dfs;