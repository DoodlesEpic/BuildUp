import Container from "react-bootstrap/Container";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createNote, getNotes } from "../features/notes/notesSlice";
import NoteForm from "../components/NoteForm";
import Loading from "../components/Loading";
import NoteList from "../components/NoteList";

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
      toast.error(message);
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
        <h1>Notes</h1>
        <p>Jot down notes to help memorize stuff and organize yourself</p>
      </section>
      <section>
        <NoteForm submitDispatch={createNote} />
      </section>
      <section>
        <NoteList notes={notes} columnsItems={columnsItems} isError={isError} />
      </section>
    </Container>
  );
};

export default Notes;
