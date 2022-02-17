import {
  Title,
  Grid,
  Button,
  MediaQuery,
  Burger,
  useMantineTheme,
} from "@mantine/core";
import { HiOutlineLogin, HiOutlineLogout, HiOutlineUser } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { reset, logout } from "../features/authenticationSlice";

const HeaderContent = ({ opened, setOpened }) => {
  // Initialize hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useMantineTheme();

  // Auth State
  const { user } = useSelector((state) => state.authentication);

  // Handle input
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100%",
      }}
    >
      <div style={{ display: "flex" }}>
        {user ? (
          <MediaQuery largerThan="sm" styles={{ display: "none" }}>
            <Burger
              opened={opened}
              onClick={() => setOpened((o) => !o)}
              size="sm"
              color={theme.colors.gray[6]}
              mr="xl"
            />
          </MediaQuery>
        ) : (
          <></>
        )}
        <Title
          component={Link}
          order={3}
          to="/"
          style={{ textDecoration: "none" }}
        >
          BuildUp
        </Title>
      </div>
      <div style={{ display: "flex" }}>
        {user ? (
          <Button onClick={onLogout}>
            Logout
            <HiOutlineLogout />
          </Button>
        ) : (
          <>
            <Grid.Col span={4}>
              <Link to="/login">
                <Button>
                  Login
                  <HiOutlineLogin />
                </Button>
              </Link>
            </Grid.Col>

            <Grid.Col span={4}>
              <Link to="/register">
                <Button>
                  Register
                  <HiOutlineUser />
                </Button>
              </Link>
            </Grid.Col>
          </>
        )}
      </div>
    </div>
  );
};

export default HeaderContent;
