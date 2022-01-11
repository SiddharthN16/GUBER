import { useState, setShow } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Image, Button, Modal } from "react-bootstrap";

const Attend = ({ items, name, description, volunteers, image }) => {
  const [show, setShow] = useState(false);
  const [fullscreen, setFullscreen] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const cleanupEvent = () => {
    return (
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Full Screen</Modal.Title>
        </Modal.Header>
        <Modal.Body>Modal body content</Modal.Body>
      </Modal>
    );
  };

  return (
    <>
      <Container>
        <Card key="index">
          <Image src={image} className="card-img-top" fluid />
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>{volunteers} Volunteer Spots</Card.Text>
            <Card.Text>{description}</Card.Text>
            <Button onClick={handleShow}>Attend</Button>
          </Card.Body>
        </Card>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cleanup Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to attend this cleanup?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={cleanupEvent}>
            Let's Clean!
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Attend;
