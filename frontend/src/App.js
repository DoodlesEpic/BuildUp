import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppShell, Navbar, Header } from "@mantine/core";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HeaderContent from "./components/HeaderContent";

export const App = () => {
  return (
    <Router>
      <AppShell
        navbarOffsetBreakpoint="sm"
        fixed
        navbar={
          <Navbar
            padding="md"
            hiddenBreakpoint="sm"
            hidden={!opened}
            width={{ sm: 300, lg: 400 }}
          >
            {/* Navbar content */}
          </Navbar>
        }
        header={
          <Header height={60} padding="xs">
            {<HeaderContent />}
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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AppShell>
    </Router>
  );
};

export default App;
