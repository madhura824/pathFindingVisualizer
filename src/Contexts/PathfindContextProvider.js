import React from 'react'
import { useState } from 'react'
import { PathfindContext } from "./PathfindContext.js"
import { algorithms } from '../constants.js';

const PathfindContextProvider = (props) => {
  const [algorithmSelected, setAlgorithmSelected] = useState(algorithms.DIJKSTRAS);
  const [execution_speed, setExecutionSpeed] = useState(100);
  const [gridBlocking, setGridBlocking] = useState([0.2, false]);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  const values = {
    algorithmSelected: algorithmSelected,
    setAlgorithmSelected: setAlgorithmSelected,
    execution_speed: execution_speed,
    setExecutionSpeed: setExecutionSpeed,
    gridBlocking: gridBlocking,
    setGridBlocking: setGridBlocking,
    time: time,
    setTime: setTime,
    isRunning: isRunning,

    setIsRunning: setIsRunning,

    setShouldAnimate: setShouldAnimate,
    shouldAnimate: shouldAnimate

  }
  return (
    <PathfindContext.Provider value={values} >
      {props.children}
    </PathfindContext.Provider>
  )
}

export default PathfindContextProvider
