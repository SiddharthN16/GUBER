import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";

const Dashboard = () => {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/signin");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <>
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