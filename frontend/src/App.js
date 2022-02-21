import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppShell, Navbar, Header, Anchor } from "@mantine/core";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HeaderContent from "./components/HeaderContent";
import Notes from "./pages/Notes";
import EditNote from "./pages/EditNote";

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
              width={{ sm: 300, lg: 400 }}
            >
              {
                <Anchor component={Link} to="/notes">
                  Notes
                </Anchor>
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
          <Route path="/notes" element={<Notes />} />
          <Route path="/notes/:id" element={<EditNote />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AppShell>
    </Router>
  );
};

export default App;
