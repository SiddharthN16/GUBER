import { Container, Row, Col, Button, Card, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";

const Dashboard = () => {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();

  const databaseMimic = [
    {
      image: "https://i.insider.com/50f967f56bb3f7830a000019",
      location: "Test 1 House",
      volunteers: 1,
    },
    {
      image: "https://i.insider.com/50f967f56bb3f7830a000019",
      location: "Test 2 House",
      volunteers: 2,
    },
    {
      image: "https://i.insider.com/50f967f56bb3f7830a000019",
      location: "Test 3 House",
      volunteers: 3,
    },
    {
      image: "https://i.insider.com/50f967f56bb3f7830a000019",
      location: "Test 4 House",
      volunteers: 4,
    },
  ];

  const renderCard = (card, index) => {
    return (
      <Card key="index">
        <Image src={card.image} className="card-img-top" fluid />
        <Card.Body>
          <Card.Title>{card.location}</Card.Title>
          <Card.Text>{card.volunteers}</Card.Text>
        </Card.Body>
      </Card>
    );
  };

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <>
        <Container fluid="sm">
          <Row>
            {databaseMimic.map(renderCard)}
            <Col>Hello</Col>
          </Row>
        </Container>

        <div className="p-4 box mt-3 text-center">
          Volunteer Dashboard <br />
          {user && (user.displayName ? user.displayName.split(" ")[0] : user.email.split("@")[0])}
        </div>
        <div className="d-grid gap-2">
          <Button variant="primary" onClick={handleLogout}>
            Log out
          </Button>
        </div>
      </>
    </div>
  );
};

export default Dashboard;
