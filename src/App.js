import Landing from "./components/Landing.jsx";
import Report from "./components/Report.jsx";

import "./index.css";

import Dashboard from "./components/volunteer/Dashboard";
import Login from "./components/authentication/Login";
import Signup from "./components/authentication/Signup";
import Protected from "./components/authentication/Protected";
import { UserAuthContextProvider } from "./context/UserAuthContext";

import Capture from "./components/Capture";

import { Route, Routes } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

function App() {
  return (
    <Row>
      <Col>
        <UserAuthContextProvider>
          <Routes>
            <Route
              path="/dashboard"
              element={
                <Protected>
                  <Dashboard />
                </Protected>
              }
            />
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route exact path="/report" element={<Report />} />
            <Route
              path="/attend"
              element={
                <Protected>
                  <Capture />
                </Protected>
              }
            />
          </Routes>
        </UserAuthContextProvider>
      </Col>
    </Row>
  );
}

export default App;
