import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Image, Button, Modal } from "react-bootstrap";

const Attend = ({ items, name, description, volunteers, image }) => {
  let navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
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
        <Modal.Body>
          When you arrive at the cleanup location, click on the "Lets Clean!" button to take a picture of your garbage
          for review.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => navigate("/attend")}>
            Let's Clean!
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Attend;
