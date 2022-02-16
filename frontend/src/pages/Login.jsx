import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../features/authenticationSlice";
import Loading from "../components/Loading";

const Login = () => {
  // Initialize hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Auth State
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.authentication
  );

  // State
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  // Handle Input Change
  useEffect(() => {
    if (isError) {
      console.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitForm = (e) => {
    e.preventDefault();

    dispatch(
      login({
        email,
        password,
      })
    );

    navigate("/");
  };

  // Render
  if (isLoading) {
    return <Loading />;
  }

  // Render
  return (
    <>
      <section>
        <h1>Login</h1>
      </section>
      <section>
        <form onSubmit={onSubmitForm}>
          <div>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="email@example.com"
              onChange={onChange}
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={onChange}
            />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
