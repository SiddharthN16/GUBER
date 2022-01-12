import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import logo from "../../assets/logo.svg"
import passLogo from "../../assets/Password.svg";
import userLogo from "../../assets/User-icon.svg";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = useUserAuth();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signUp(email, password);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div id="signup">
      <div className="p-4 mt-3 box">
        <img src = {logo} style = {{width: "270px", height: "auto"}}/>
        <h2 className="mb-3">Volunteer Signup</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3 usernameFeild" controlId="formBasicEmail">
            <img src = {userLogo} style = {{width: "25px"}}/>
            <Form.Control type="email" placeholder="Email address" onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3 pass" controlId="formBasicPassword">
            <img src = {passLogo} style = {{width: "25px"}}/>
            <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Sign up
            </Button>
          </div>
        </Form>
      </div>
      <div className="p-4 box mt-3 text-center">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </div>
  );
};

export default Signup;