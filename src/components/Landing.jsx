import Header from "./Header.jsx";
import Volunteer from "./Volunteer.jsx";
import logo from "../assets/guber.svg";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div>
      <Header />
      <div className="call-to-action">
        <img src={logo} />
        <div className="text">
          <h1>SEE GARBAGE IN YOUR AREA?</h1>
          <h4>Help us clean it up by reporting!</h4>
        </div>
        <Link to="/report">REPORT</Link>
      </div>
      <Volunteer />
      <div className="contact">
        <p>Guber Inc.</p>
      </div>
    </div>
  );
}

export default Landing;
