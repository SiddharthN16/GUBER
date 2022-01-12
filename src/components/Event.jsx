import { Link } from "react-router-dom";

function Event({ name, description, volunteers, image }) {
  return (
    <div className="event-holder">
      <div className="text-container">
        <img src={image} alt="Garbage Spotted"></img>
        <h3>{name}</h3>
        <p style={{ fontWeight: 600, color: "#ABFAA3" }}>{volunteers} Volunteer Spots</p>
        <p>{description}</p>
      </div>
      <Link to="/dashboard">Attend</Link>
    </div>
  );
}

export default Event;
