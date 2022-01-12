import { useState } from "react";
import { useUserAuth } from "../../context/UserAuthContext";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Form, Alert } from "react-bootstrap";
import GoogleButton from "react-google-button";
import logo from "../../assets/logo.svg";
import passLogo from "../../assets/Password.svg";
import userLogo from "../../assets/User-icon.svg";

const Login = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn, googleSignIn, user } = useUserAuth();
  const navigate = useNavigate();

  // handle what hapepns when form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // if login is successful navigate to dashboard
    try {
      await logIn(email, password);
      navigate("/dashboard");
    } catch (err) {
      // otherwise throw error
      setError(err.message);
    }
  };

  // when google sign in button is pressed
  const handleGoogleSignIn = async (e) => {
    e.preventDefault();

    // attempt to authenticate via google
    try {
      await googleSignIn();
      navigate("/dashboard");
    } catch (error) {
      console.log(error.message);
    }
  };

  // if user is already signed in  navigate to dashboard
  if (user) {
    return <Navigate replace to="/dashboard" />;
  }

  // create the form + buttons for the login page
  return (
    <div id="login" style={{ color: "white" }}>
      <div className="p-4 mt-3 box">
        <img src={logo} alt="Guber Logo" style={{ width: "270px", height: "auto" }} />
        <h2 className="mb-3">Volunteer Login</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3 usernameFeild" controlId="formBasicEmail">
            <img src={userLogo} alt="username logo" style={{ width: "25px" }} />
            <Form.Control type="email" placeholder="Email address" onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3 pass" controlId="formBasicPassword">
            <img src={passLogo} alt="password logo" style={{ width: "25px" }} />
            <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Log In
            </Button>
          </div>
        </Form>
        <div className="googleAuthBtn">
          <GoogleButton className="g-btn" type="dark" onClick={handleGoogleSignIn} />
        </div>
      </div>
      <div className="p-4 box mt-3 text-center">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
};

export default Login;
