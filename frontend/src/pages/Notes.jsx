import { Container, Title, Text, Center } from "@mantine/core";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import NoteForm from "../components/NoteForm";
import { getNotes, reset } from "../features/notes/notesSlice";
import Loading from "../components/Loading";

const Notes = () => {
  // Initialize hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Auth State
  const user = useSelector((state) => state.authentication.user);
  const { notes, isLoading, isError, message } = useSelector(
    (state) => state.notes
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/");
    }

    dispatch(getNotes());

    // Clear notes when we leave the page
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Loading></Loading>;
  }

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
        <section></section>
      </Container>
    </Center>
  );
};

export default Notes;
