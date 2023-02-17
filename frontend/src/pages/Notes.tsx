import Row from "react-bootstrap/Row";
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
    <>
      <Row>
        <h1>Notes</h1>
        <p>Jot down notes to help memorize stuff and organize yourself</p>
      </Row>
      <Row>
        <NoteForm submitDispatch={createNote} />
      </Row>
      <Row>
        <NoteList notes={notes} columnsItems={columnsItems} isError={isError} />
      </Row>
    </>
  );
};

export default Notes;
