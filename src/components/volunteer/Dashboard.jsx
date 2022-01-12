import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { ref, onValue } from "firebase/database";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import Attend from "./Attend";

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
            if (keys[i] !== "safe") {
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


  if (events) {
    return (
      <div>
        <div id = "dashboard">
          <>
            <div className="p-4 box mt-3 text-center dashCenter">
              <span className = "dashTitle">Volunteer Dashboard</span> <br />
              {user && user.email}
              <div className="d-grid gap-2 logOutBox">
                <Button variant="primary" onClick={handleLogout}>
                  Log out
                </Button>
              </div>
            </div>
          </>
        </div>

        <div className="events-container2">
          {events.map((event) => (
            <Attend
              items={events.length}
              name={event.name}
              description={event.desc}
              volunteers={event.volunteers}
              image={event.image}
            />
          ))}
        </div>

      </div>
    );
  }

  return (
    <div>
      <div id = "dashboard">
        <div className="p-4 box mt-3 text-center dashCenter">
          <span class = "dashTitle">Volunteer Dashboard</span> <br />
          {user && user.email}
		      <div className="d-grid gap-2 logOutBox">
            <Button variant="primary" onClick={handleLogout}>
              Log out
            </Button>
          </div>
        </div>
      </div>
      <div className="events-container2">
        <h1>Loading...</h1>
      </div>
    </div>
  );
};

export default Dashboard;
