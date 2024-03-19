const bfs = (startNode, endNode) => {
    startNode.distance = 0;
    let openSet = [];
    let visited = [];
    let start_time=Date.now()
    let end_time=Date.now()
let time=0;
    openSet.push(startNode);
    visited.push(startNode);
  
    // console.log("OPENSET" + openSet.length);
    // console.log(openSet);
  
    while (openSet.length > 0) {
      let current_node = openSet[0];
      if(current_node==endNode) {
        end_time=Date.now();
        time=end_time-start_time
       //console.log("start time  " + start_time+ " End time "+end_time);
        break
 
      }
      if (current_node && current_node.neighbours) {
        let cur_neighbours = current_node.neighbours;
  
       // console.log(current_node);
        openSet = openSet.filter((element) => element !== current_node);
  
        for (let i = 0; i < cur_neighbours.length; i++) {
          if (
            cur_neighbours[i] &&
            !visited.includes(cur_neighbours[i]) &&
            cur_neighbours[i].isWall === false
          ) {
            cur_neighbours[i].distance = current_node.distance + 1;
            cur_neighbours[i].previous = current_node;
            openSet.push(cur_neighbours[i]);
            visited.push(cur_neighbours[i]);
          }
        }
      } else {
        console.error("Error: current_node or current_node.neighbours is undefined");
      }
    }
  
    let path = reconstruction(endNode);
    //console.log(path);
    console.log("Time "+ time);
    return { path, visited,time };
  };
  
  const reconstruction = (endNode) => {
    let temp = endNode;
    let path = [];
    while (temp !== undefined) {
      path.push(temp);
      temp = temp.previous;
    }
    return path.reverse();
  };
  
  export default bfs;
  