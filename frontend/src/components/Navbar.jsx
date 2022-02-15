import { HiOutlineLogin, HiOutlineUser } from "react-icons/hi";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <nav>
        <h1>
          <Link to="/">BuildUp</Link>
        </h1>
        <ul>
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
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
