import { reconstruction } from "../../constants";

function heuristic(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

const Astar = (startNode, endNode) => {
  const openSet = [startNode];
  const visited = [];
  const closedSet = new Set();

  startNode.g = 0;
  startNode.h = heuristic(startNode, endNode);
  startNode.f = startNode.g + startNode.h;

  let start_time = Date.now();

  while (openSet.length > 0) {
    let leastIndex = 0;

    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[leastIndex].f) {
        leastIndex = i;
      }
    }

    const current = openSet.splice(leastIndex, 1)[0];

    if (closedSet.has(current)) continue;

    closedSet.add(current);
    visited.push(current);

    if (current === endNode) break;

    current.neighbours.forEach(neighbor => {
      if (!neighbor.isWall && !closedSet.has(neighbor)) {
        let tempG = current.g + 1;

        if (tempG < neighbor.g) {
          neighbor.g = tempG;
          neighbor.h = heuristic(neighbor, endNode);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.previous = current;

          if (!openSet.includes(neighbor)) {
            openSet.push(neighbor);
          }
        }
      }
    });
  }

  let end_time = Date.now();
  let time = end_time - start_time;

  const path = reconstruction(endNode);

  return { path, visited, time };
};

export default Astar;