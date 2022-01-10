import { Row, Col, Container, Card, Image } from "react-bootstrap";

const GridSystem = ({ items, name, description, volunteers, image }) => {
  return (
    <Container>
      <Card key="index">
        <Image src={image} className="card-img-top" fluid />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>{volunteers} Volunteer Spots</Card.Text>
          <Card.Text>{description}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default GridSystem;
