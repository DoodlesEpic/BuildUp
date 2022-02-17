import { Title, Grid, Button } from "@mantine/core";
import { HiOutlineLogin, HiOutlineLogout, HiOutlineUser } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { reset, logout } from "../features/authenticationSlice";

const HeaderContent = () => {
  // Initialize hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Auth State
  const { user } = useSelector((state) => state.authentication);

  // Handle input
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <Grid>
      <Grid.Col span={3}>
        <Title
          component={Link}
          order={3}
          to="/"
          style={{ textDecoration: "none" }}
        >
          BuildUp
        </Title>
      </Grid.Col>
      <Grid.Col span={3} offset={6}>
        <Grid>
          {user ? (
            <Grid.Col span={4}>
              <Button onClick={onLogout}>
                Logout
                <HiOutlineLogout />
              </Button>
            </Grid.Col>
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
        </Grid>
      </Grid.Col>
    </Grid>
  );
};

export default HeaderContent;
