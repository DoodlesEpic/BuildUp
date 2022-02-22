import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppShell, Navbar, Header, Anchor, Group, Text } from "@mantine/core";
import { HiOutlineChartSquareBar, HiOutlinePencilAlt } from "react-icons/hi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HeaderContent from "./components/HeaderContent";
import Notes from "./pages/Notes";
import EditNote from "./pages/EditNote";
import NavbarAnchor from "./components/NavbarAnchor";
import Habits from "./pages/Habits";

export const App = () => {
  // Auth State
  const { user } = useSelector((state) => state.authentication);

  // Internal state
  const [opened, setOpened] = useState(false);

  return (
    <Router>
      <AppShell
        navbarOffsetBreakpoint="sm"
        fixed
        navbar={
          user ? (
            <Navbar
              padding="md"
              hiddenBreakpoint="sm"
              hidden={!opened}
              width={{ base: 100 }}
            >
              {
                <>
                  <NavbarAnchor
                    to="/habits"
                    name="Habits"
                    icon={<HiOutlineChartSquareBar className="nav-icon" />}
                  />
                  <NavbarAnchor
                    to="/notes"
                    name="Notes"
                    icon={<HiOutlinePencilAlt className="nav-icon" />}
                  />
                </>
              }
            </Navbar>
          ) : (
            <></>
          )
        }
        header={
          <Header height={60} padding="xs">
            {<HeaderContent opened={opened} setOpened={setOpened} />}
          </Header>
        }
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
      >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/habits" element={<Habits />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/notes/:id" element={<EditNote />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AppShell>
      <ToastContainer />
    </Router>
  );
};

export default App;
