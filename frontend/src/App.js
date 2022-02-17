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
        padding="md"
        fixed
        navbar={
          <Navbar width={{ base: 300 }} height={500} padding="xs">
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
