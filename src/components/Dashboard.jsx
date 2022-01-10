import { useState, useEffect } from "react";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import GridSystem from "./GridSystem";

const Dashboard = () => {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();

  const [events, setEvents] = useState();

  const eventInfo = ref(db, "/Events");

  useEffect(() => {
    const getEvents = async () => {
      const eventData = await onValue(eventInfo, (snapshot) => {
        var data = snapshot.val();
        var output = [];
        if (data) {
          var keys = Object.keys(data);
          for (let i = 0; i < keys.length; i++) {
            if (keys[i] != "safe") {
              output.push(data[keys[i]]);
            }
          }
        }
        setEvents(output);
      });
    };
    getEvents();
  }, []);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  // console.log(events.length);

  if (events) {
    return (
      <div>
        <>
          <div className="events-container">
            {events.map((event) => (
              <GridSystem
                items={events.length}
                name={event.name}
                description={event.desc}
                volunteers={event.volunteers}
                image={event.image}
              />
            ))}
          </div>

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
  }

  return (
    <div>
      <>
        <div class="events-container">
          <h1>Loading...</h1>
        </div>
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
