import { reconstruction } from "../../constants";

const Dijkstras = (startNode, endNode) => {
  const openSet = [startNode];
  const visited = [];
  const visitedSet = new Set();

  startNode.distance = 0;

  let start_time = Date.now();

  while (openSet.length > 0) {
    let leastIndex = 0;

    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].distance < openSet[leastIndex].distance) {
        leastIndex = i;
      }
    }

    const current = openSet.splice(leastIndex, 1)[0];

    if (visitedSet.has(current)) continue;

    visitedSet.add(current);
    visited.push(current);

    if (current === endNode) break;

    current.neighbours.forEach(neighbor => {
      if (!neighbor.isWall && !visitedSet.has(neighbor)) {
        let newDist = current.distance + 1;

        if (newDist < neighbor.distance) {
          neighbor.distance = newDist;
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

export default Dijkstras;