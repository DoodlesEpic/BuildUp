import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import ThemeProvider from "react-bootstrap/Nav";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Notes from "./pages/Notes";
import EditNote from "./pages/EditNote";
import Habits from "./pages/Habits";
import { Container, Row } from "react-bootstrap";

export const App = () => {
  return (
    <Router>
      <ThemeProvider>
        <Container fluid>
          <Navbar>
            <Navbar.Brand href="/">BuildUp</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse>
              <Nav>
                <Nav.Item>
                  <Nav.Link href="/habits">Habits</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/notes">Notes</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/login">Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/register">Register</Nav.Link>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/habits" element={<Habits />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/notes/:id" element={<EditNote />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>

          <ToastContainer />
        </Container>
      </ThemeProvider>
    </Router>
  );
};

export default App;
