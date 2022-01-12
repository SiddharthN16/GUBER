import guberLogo from "../assets/logo.svg";
import { Link } from "react-router-dom";

function Header() {
  // the header to be displayed on every page
  return (
    <div id="nav-bar">
      <Link to="/">
        <img src={guberLogo} alt="test"></img>
      </Link>
      <Link to="/login">
        <svg
          width="52.5"
          height="60"
          viewBox="0 0 35 45"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          alt="Volunteer Sign in"
        >
          <path
            className="user"
            d="M17.4921 20.2294C9.45855 20.2294 4.74945 26.7972 2.25512 33.4646C0.394246 38.4388 4.59583 43.0841 9.90668 43.0841H25.0294C30.3271 43.0841 34.5262 38.4607 32.69 33.4914C30.2229 26.8148 25.5363 20.2294 17.4921 20.2294Z"
            stroke="#ABFAA3"
            strokeWidth="3"
          />
          <circle className="user" cx="17.4498" cy="8.33885" r="6.83885" stroke="#ABFAA3" strokeWidth="3" />
        </svg>
      </Link>
    </div>
  );
}

export default Header;
