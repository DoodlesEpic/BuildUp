import { HiOutlineLogin, HiOutlineLogout, HiOutlineUser } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { reset, logout } from "../features/authenticationSlice";

const Navbar = () => {
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
    <header>
      <nav>
        <h1>
          <Link to="/">BuildUp</Link>
        </h1>
        <ul>
          {user ? (
            <li>
              <button onClick={onLogout}>
                Logout
                <HiOutlineLogout />
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login">
                  Login
                  <HiOutlineLogin />
                </Link>
              </li>
              <li>
                <Link to="/register">
                  Register
                  <HiOutlineUser />
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
