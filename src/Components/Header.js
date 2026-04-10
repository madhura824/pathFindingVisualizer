import React, { useContext } from 'react'
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import InformationTiles from "./InformationTiles";
import AlgorithmDropdown from "./AlgorithmDropdown ";
import {algorithms} from "../constants.js"
import { PathfindContext } from '../Contexts/PathfindContext.js';

const Header = (props) => {
   const { visualizePath, regenerate  } = props;
   const {  algorithmSelected,
            setAlgorithmSelected,
            execution_speed,
            setExecutionSpeed,
            gridBlocking,
            setGridBlocking,
            time,
            setIsRunning,
            setShouldAnimate
        } = useContext(PathfindContext);
    
  return (
    <>
    <div className="header">

                   
<div className='header-element'>
        <Dropdown  >
          <Dropdown.Toggle variant="success" id="dropdown-basic" >
            {`Algorithm: ${algorithmSelected}`}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setAlgorithmSelected(algorithms.ASTAR)}>
              A Star Algorithm
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setAlgorithmSelected(algorithms.DIJKSTRAS)}>
              Dijkstras
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setAlgorithmSelected(algorithms.BFS)}>
              BFS
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setAlgorithmSelected(algorithms.DFS)}>
              DFS
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        </div>
<div className='header-element'>
        <Dropdown >
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {` Speed: ${execution_speed} ms`}
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
        </div>
<div className='header-element'>
        <Dropdown >
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {gridBlocking[1] ? `Blocking: ${gridBlocking[0]}` : "No Blocking"}
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
            <Dropdown.Item onClick={() => setGridBlocking([0, false])}>
  Clear Blocking
</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        </div>
       

        <AlgorithmDropdown />

         <Button className="start-visualization header-element" onClick={() => {
  setIsRunning(true);   
  setShouldAnimate(true);

  if (algorithmSelected === algorithms.ASTAR) visualizePath(1);
  else if (algorithmSelected === algorithms.DIJKSTRAS) visualizePath(2);
  else if (algorithmSelected === algorithms.BFS) visualizePath(3);
  else if (algorithmSelected === algorithms.DFS) visualizePath(4);
}}>Start Visualization</Button>


        <Button variant="primary" className="regenerate header-element" onClick={regenerate}>
          Regenerate
        </Button>
        
        
        <Button className="curved-border-display header-element">
    
         <b> Time Taken:  </b> 
          {time} secs
        </Button>
      </div>
      <div className="info">
          <InformationTiles image={"https://cdn-icons-png.flaticon.com/256/10076/10076257.png"} text={"Start Node"} style={{
                  backgroundColor: "rgb(116, 249, 116)",
                  border: "1px solid black",
            }}></InformationTiles>
          
          <InformationTiles image={"https://cdn-icons-png.flaticon.com/256/10826/10826977.png"} text={"End Node"} style={{
              backgroundColor: "rgb(233, 47, 47)",
              border: "1px solid black",
            }}></InformationTiles>

            <InformationTiles text={"Shortest Path"} style={{
              backgroundColor: "aquamarine",
              border: "1px solid black",
            }}></InformationTiles>
       
          <InformationTiles text={" Visited Nodes"} style={{
              backgroundColor: "peachpuff",
              border: "1px solid black",
            }}></InformationTiles>

          <InformationTiles text={"Non Visited Nodes"} style={{
              backgroundColor: "white",
              border: "1px solid black",
            }}></InformationTiles>
          <InformationTiles text={"Obstacles"} style={{
              backgroundColor: "rgb(12, 53, 71)",
              border: "1px solid black",
            }}></InformationTiles>
            
        
          
       
       </div>
       </>
  )
}

export default Header
