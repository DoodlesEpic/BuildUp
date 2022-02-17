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
import { login, reset } from "../features/authentication/authenticationSlice";
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
    <Container size="sm" mt="xl">
      <section>
        <Title order={2}>Login</Title>
      </section>
      <section>
        <form onSubmit={onSubmitForm}>
          <Group mt="md" direction="column" grow>
            <TextInput
              required
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="email@example.com"
              onChange={onChange}
            />
            <PasswordInput
              required
              id="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={onChange}
              toggleTabIndex={0}
            />
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </section>
    </Container>
  );
};

export default Login;
