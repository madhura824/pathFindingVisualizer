const Dijkstras = (startNode, end_node) => {
  startNode.distance = 0;
  let openSet = [];

  let path = [];
  let visited_set = new Set();
  let visited = [];
  openSet.push(startNode);
  let start_time=Date.now()
  let end_time=Date.now()
  while (openSet.length > 0) {
    let leastIndex = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].distance < openSet[leastIndex].distance) {
        leastIndex = i;
      }
    }
    let current_node = openSet[leastIndex];
    openSet = openSet.filter((element) => element !== current_node);

    visited_set.add(current_node);
    if (current_node === end_node) {
      end_time=Date.now()
      let temp = current_node;
      path.push(temp);
      while (temp.previous) {
        path.push(temp.previous);
        temp = temp.previous;
      }

      visited_set.forEach((node) => visited.push(node));
      path=path.reverse()
      let time=end_time-start_time
     // console.log("Time "+ time);
      return { path, visited ,time}; //this is an object
    }

    let neighbors = current_node.neighbours;
    for (let i = 0; i < neighbors.length; i++) {
      if (neighbors[i].isWall === false) {
        if (neighbors[i].distance > 1 + current_node.distance) {
          neighbors[i].distance = 1 + current_node.distance; // Corrected
          neighbors[i].previous = current_node;
          openSet.push(neighbors[i]);
        }
      }
    }
  }
  return { path, visited, Error: " No Path Found" };
};
export default Dijkstras;
