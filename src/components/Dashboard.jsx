import { Button, Card, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import GridSystem from "../components/GridSystem";

const Dashboard = () => {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();

  const databaseMimic = [
    {
      id: 1,
      image: "https://i.insider.com/50f967f56bb3f7830a000019",
      location: "Test 1 House",
      volunteers: 1,
    },
    {
      id: 2,
      image: "https://i.insider.com/50f967f56bb3f7830a000019",
      location: "Test 2 House",
      volunteers: 2,
    },
    {
      id: 3,
      image: "https://i.insider.com/50f967f56bb3f7830a000019",
      location: "Test 3 House",
      volunteers: 3,
    },
    {
      id: 4,
      image: "https://i.insider.com/50f967f56bb3f7830a000019",
      location: "Test 4 House",
      volunteers: 4,
    },
  ];

  const Cards = (props) => {
    const { image, location, volunteers } = props;

    return (
      <div className="mb-3">
        <Card key="index">
          <Image src={image} className="card-img-top" fluid />
          <Card.Body>
            <Card.Title>{location}</Card.Title>
            <Card.Text>{volunteers}</Card.Text>
          </Card.Body>
        </Card>
      </div>
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
        <GridSystem colCount={3} md={6}>
          {databaseMimic.length > 0
            ? databaseMimic.map((item) => (
                <Cards key={item.id} image={item.image} location={item.location} volunteers={item.volunteers} />
              ))
            : [<p>No Garbage Reported</p>]}
        </GridSystem>

        <div className="p-4 box mt-3 text-center">
          Volunteer Dashboard <br />
          {/* user.displayName ? user.displayName.split(" ")[0] : user.email.split("@")[0] */}
          {user && user.email}
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
