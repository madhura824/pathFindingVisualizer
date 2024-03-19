function Astar(start_node, end_node) {
  //console.log("Inside Astar");
  let openSet = [];
  let closeSet = [];
  let path = [];
  let visited = [];
  openSet.push(start_node);
  let start_time=Date.now()
  let end_time=Date.now()

  ////console.log("openSet:", openSet);

  while (openSet.length > 0) {
    let leastIndex = 0; // stores the index for the node with the minimum f value
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[leastIndex].f) {
        leastIndex = i;
      }
    }

    let current_node = openSet[leastIndex];

    //console.log("current_node:", current_node);

    openSet = openSet.filter((element) => element !== current_node);
    closeSet.push(current_node);
    visited.push(current_node);

    if (current_node === end_node) {
      end_time=Date.now()
      let temp = current_node;
      path.push(temp);
      while (temp.previous) {
        path.push(temp.previous);
        temp = temp.previous;
      }

      // //console.log("Yayy!! Path found");
      // //console.log(path)
      //

      //console.log("visited in the astar: " + visited);
      path=path.reverse()
      let time=end_time-start_time;
      return { path, visited ,time}; //this is an object
    }

    let neighbours = current_node.neighbours;

    for (let i = 0; i < neighbours.length; i++) {
      let neighbour = neighbours[i];
      if (!closeSet.includes(neighbour) && neighbour.isWall === false) {
        // which means it is not visited, we need to check its heuristic
        let tempG = current_node.g + 1;
        let newPath = false;
        if (openSet.includes(neighbour)) {
          if (tempG < neighbour.f) {
            neighbour.f = tempG;
            newPath = true;
          }
        } else {
          neighbour.g = tempG;
          openSet.push(neighbour);
          newPath = true;
        }

        if (newPath) {
          neighbour.h = heuristic(neighbour, end_node);
          neighbour.f = neighbour.g + neighbour.h;
          neighbour.previous = current_node;
        }
      }
    }
  }
  return { path, visited, Error: " No Path Found" }; //this is an object
}

function heuristic(a, b) {
  // based on the Manhattan distance
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

export default Astar;
