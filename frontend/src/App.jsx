import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ThemeProvider from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

import AppNavbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Notes from "./pages/Notes";
import EditNote from "./pages/EditNote";
import Habits from "./pages/Habits";

export const App = () => {
  return (
    <Router>
      <ThemeProvider>
        <AppNavbar />
        <Container className="mt-5">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/habits" element={<Habits />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/notes/:id" element={<EditNote />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Container>

        <ToastContainer />
      </ThemeProvider>
    </Router>
  );
};

export default App;
