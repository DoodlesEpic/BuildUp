import { Container, Title, Text, Center } from "@mantine/core";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NoteForm from "../components/NoteForm";

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
        <section>
          <Title>Notes</Title>
          <Text>
            Jot down nots to help memorizing stuff and organize yourself
          </Text>
        </section>
        <section>
          <NoteForm />
        </section>
      </Container>
    </Center>
  );
};

export default Notes;
