import { Container, Title, Text, Center } from "@mantine/core";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  // Initialize hooks
  const navigate = useNavigate();

  // Auth State
  const user = useSelector((state) => state.authentication.user);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <Center style={{ height: "80%" }}>
      <Container>
        <Title>Notes</Title>
        <Text>
          Jot down nots to help memorizing stuff and organize yourself
        </Text>
      </Container>
    </Center>
  );
};

export default Notes;
