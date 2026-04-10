
import { Modal, Button } from "react-bootstrap";
import { algoInfo } from "../constants";

const AlgorithmInfoModal = ({ algorithmChoice, onHide }) => {


  const { title, description, image } = algoInfo[algorithmChoice];

  return (
    <Modal show={true} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{description}</p>
        <img
          src={image}
          alt={`Image for ${title}`}
          style={{ maxWidth: "100%" }}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AlgorithmInfoModal;
