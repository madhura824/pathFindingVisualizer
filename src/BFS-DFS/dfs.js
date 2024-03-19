class Stack {
    constructor() {
      this.items = [];
    }
  
    push(item) {
      this.items.push(item);
    }
  
    pop() {
      if (this.isEmpty()) {
        return null;
      }
      return this.items.pop();
    }
  
    isEmpty() {
      return this.items.length === 0;
    }
  }
  
  const dfs = (startNode, endNode) => {
    startNode.distance = 0;
    let stack = new Stack();
    let visited = [];
    let start_time=Date.now()
    let end_time =Date.now()
    stack.push(startNode);
    
  
   // console.log("STACK: " + stack.items.length);
   // console.log(stack.items);
  
    while (!stack.isEmpty()) {
       let current_node = stack.pop();

      if(current_node===endNode) {
        end_time=Date.now()
        break;
      }
      if(!visited.includes(current_node)){
        visited.push(current_node);
      }
  
      
        let cur_neighbours = current_node.neighbours;
  
       // console.log(current_node);
  
        for (let i = 0; i < cur_neighbours.length; i++) {
          if (
            !visited.includes(cur_neighbours[i]) &&
            cur_neighbours[i].isWall === false
          ) {
            cur_neighbours[i].distance = current_node.distance + 1;
            cur_neighbours[i].previous = current_node;
            stack.push(cur_neighbours[i]);
          }
        }
      
    }
  
    let path = reconstruction(endNode);
   // console.log(path);

   // console.log("start : " +start_time+" end time" +end_time)
    let time=end_time-start_time
    return { path, visited ,time};
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
  
  export default dfs;
  