import Landing from './components/Landing';
import Report from './components/Report';
import Contact from './components/Contact';
import Terms from './components/Terms';
import Privacy from './components/Privacy';
import Header from './components/Header'

import './index.css';

import Dashboard from "./components/volunteer/Dashboard";
import Login from "./components/authentication/Login";
import Signup from "./components/authentication/Signup";
import Protected from "./components/authentication/Protected";
import { UserAuthContextProvider } from "./context/UserAuthContext";

import Capture from "./components/Capture";

import {Route, Routes } from 'react-router-dom';
import { Container, Row, Col } from "react-bootstrap";

function App() {
  return (
	  	<Row>
			<Col>
				<UserAuthContextProvider>
          <Header />
          <div id = "cont">
					<Routes>
						<Route path="/dashboard" element={
							<Protected>
							<Dashboard />
							</Protected>
						} />
						<Route path="/" element={<Landing />}/>
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<Signup />} />
						<Route exact path ="/report" element = {<Report />}/>
            <Route path = "/tos" element = {<Terms />}/>
            <Route path = "/privacy" element = {<Privacy />} />
            <Route
                path="/attend"
                element={
                  <Protected>
                    <Capture />
                  </Protected>
                }
              />
            
					</Routes>
          </div>
          <Contact />
				</UserAuthContextProvider>
			</Col>
		</Row>
  );
}

export default App
