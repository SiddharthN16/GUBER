import { useState, setShow } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";

const Attend = ({ items, name, description, volunteers, image }) => {
  const [show, setShow] = useState(false);

  let navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  // elements for the dashboard event including modal and clenaup event cards
  return (
    <div className="dashAttend">
      <div className="event-holder">
        <div className="text-container">
          <img src={image} alt="spotted garbage"></img>
          <h3>{name}</h3>
          <p style={{ fontWeight: 600, color: "#ABFAA3" }}>{volunteers} Volunteer Spots</p>
          <p>{description}</p>
        </div>
        <Button onClick={handleShow}>Attend</Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cleanup Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to attend this cleanup?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => navigate("/attend")}>
            Let's Clean!
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Attend;
