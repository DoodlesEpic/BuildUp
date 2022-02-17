import {
  Title,
  Container,
  TextInput,
  PasswordInput,
  Button,
  Group,
} from "@mantine/core";
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
    <Container size="sm" mt="xl">
      <section>
        <Title order={2}>Register</Title>
      </section>
      <section>
        <form onSubmit={onSubmitForm}>
          <Group mt="md" direction="column" grow>
            <TextInput
              required
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={username}
              onChange={onChange}
            />
            <TextInput
              required
              type="email"
              id="email"
              name="email"
              placeholder="email@example.com"
              value={email}
              onChange={onChange}
            />
            <PasswordInput
              required
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={onChange}
            />
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </section>
    </Container>
  );
};

export default Register;
