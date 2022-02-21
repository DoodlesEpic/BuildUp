import { Container, Title, Text, Grid } from "@mantine/core";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNote, getNotes, reset } from "../features/notes/notesSlice";
import NoteForm from "../components/NoteForm";
import NoteItem from "../components/NoteItem";
import Loading from "../components/Loading";

const Notes = () => {
  // Initialize hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Auth State
  const user = useSelector((state) => state.authentication.user);

  // Notes State
  const { notes, columnsItems, isLoading, isError, message } = useSelector(
    (state) => state.notes
  );

  useEffect(() => {
    dispatch(getNotes());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/");
    }
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
        <NoteForm submitDispatch={createNote} />
      </section>
      <section>
        {notes.length > 0 ? (
          <Grid>
            <Grid.Col md={6}>
              {columnsItems[0].map((note) => (
                <NoteItem key={note._id} note={note} />
              ))}
            </Grid.Col>
            <Grid.Col md={6}>
              {columnsItems[1].map((note) => (
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
