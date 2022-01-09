import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const Home = () => {
  const navigate = useNavigate();

  // const handleRedirect = (path) => {
  //   navigate(path);
  // };

  return (
    <>
      <Button variant="primary" onClick={() => navigate("/login")}>
        Volunteer Dashboard
      </Button>

      <Button variant="primary" onClick={() => navigate("/signup")}>
        Sign Up
      </Button>
    </>
  );
};

export default Home;
