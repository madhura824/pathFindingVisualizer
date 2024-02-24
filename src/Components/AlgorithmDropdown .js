import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import AlgorithmInfoModal from "./AlgorithmInfoModal"; // Import the modal component

const AlgorithmDropdown = () => {
  const [selectedAlgo, setSelectedAlgo] = useState(null);

  const getAlgoInfo = (choice) => {
    setSelectedAlgo(choice);
  };

  const handleCloseModal = () => {
    setSelectedAlgo(null);
  };

  return (
    <>
      <Dropdown className="speed-drop-down">
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Get More Information
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => getAlgoInfo(1)}>
            A Star Algorithm
          </Dropdown.Item>
          <Dropdown.Item onClick={() => getAlgoInfo(2)}>
            Dijkstra's Algorithm
          </Dropdown.Item>
          <Dropdown.Item onClick={() => getAlgoInfo(3)}>
            Bredth First Search
          </Dropdown.Item>
          <Dropdown.Item onClick={() => getAlgoInfo(4)}>
           Depth First Search
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {selectedAlgo && (
        <AlgorithmInfoModal
          algorithmChoice={selectedAlgo}
          onHide={handleCloseModal}
        />
      )}
    </>
  );
};

export default AlgorithmDropdown;
