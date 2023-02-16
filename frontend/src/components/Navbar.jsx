import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { logout, reset } from "../features/authentication/authenticationSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AppNavbar = () => {
  // Initialize hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle input
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  // Auth State
  const { user } = useSelector((state) => state.authentication);

  return (
    <Navbar className="shadow-sm w-100">
      <Container fluid>
        <Navbar.Brand href="/">BuildUp</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse>
          {user ? (
            <>
              <Nav>
                <Nav.Item>
                  <Nav.Link href="/habits">Habits</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/notes">Notes</Nav.Link>
                </Nav.Item>
              </Nav>
              <Nav.Item className="ms-auto">
                <Button onClick={onLogout}>Logout</Button>
              </Nav.Item>
            </>
          ) : (
            <>
              <Nav></Nav>
              <Nav.Item className="ms-auto">
                <Button href="/login">Login</Button>
              </Nav.Item>
              <Nav.Item className="ms-1">
                <Button href="/register">Register</Button>
              </Nav.Item>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
