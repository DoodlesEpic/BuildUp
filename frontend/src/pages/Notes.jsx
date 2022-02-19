import { Container, Title, Text, Grid } from "@mantine/core";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getNotes, reset } from "../features/notes/notesSlice";
import NoteForm from "../components/NoteForm";
import NoteItem from "../components/NoteItem";
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
      <section>
        {notes.length > 0 ? (
          <Grid>
            <Grid.Col md={6}>
              {notes
                .filter((e, i, a) => !(i % 2))
                .map((note) => (
                  <NoteItem key={note._id} note={note} />
                ))}
            </Grid.Col>
            <Grid.Col md={6}>
              {notes
                .filter((e, i, a) => i % 2)
                .map((note) => (
                  <NoteItem key={note._id} note={note} />
                ))}
            </Grid.Col>
          </Grid>
        ) : (
          <Text>No notes yet</Text>
        )}
      </section>
    </Container>
  );
};

export default Notes;
