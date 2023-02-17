import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  register,
  reset,
} from "../features/authentication/authenticationSlice";
import Loading from "../components/Loading";

const Register = () => {
  // Initialize hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Auth State
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.authentication
  );

  // Internal State
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { username, email, password } = formData;

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
      register({
        username,
        email,
        password,
      })
    );
  };

  // Render
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Row>
        <h2>Register</h2>
      </Row>
      <Row>
        <Form className="mt-3" onSubmit={onSubmitForm}>
          <Form.Group className="mb-3">
            <Form.Control
              required
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={username}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              required
              type="email"
              id="email"
              name="email"
              placeholder="email@example.com"
              value={email}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              required
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={onChange}
            />
          </Form.Group>

          <Button type="submit">Submit</Button>
        </Form>
      </Row>
    </>
  );
};

export default Register;
