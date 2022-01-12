import Volunteer from "./Volunteer.jsx";
import logo from "../assets/guber.svg";
import { Link } from "react-router-dom";

function Landing() {
  // the landing page of the website
  return (
    <div>
      <div className="call-to-action">
        <img src={logo} alt="guber logo" />
        <div className="text">
          <h1>SEE GARBAGE IN YOUR AREA?</h1>
          <h4>Help us clean it up by reporting!</h4>
        </div>
        <Link to="/report">REPORT</Link>
      </div>
      <Volunteer />
    </div>
  );
}

export default Landing;
