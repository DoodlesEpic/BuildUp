import Container from "react-bootstrap/Container";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import NoteForm from "../components/NoteForm";
import { editNote, getNotes, reset } from "../features/notes/notesSlice";

const EditNote = () => {
  // Initialize hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Route params
  const { id } = useParams();

  // Auth State
  const user = useSelector((state) => state.authentication.user);

  // Notes State
  const { notes, isLoading, isError, message } = useSelector(
    (state) => state.notes
  );

  // Internal State
  const note = notes.find((note) => note._id === id);

  useEffect(() => {
    if (isError) {
      toast.error(message);
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
        <h1>Edit Note</h1>
        <p>Jot down notes to help memorize stuff and organize yourself</p>
      </section>
      <section>
        <NoteForm note={note} submitDispatch={editNote} />
      </section>
    </Container>
  );
};

export default EditNote;
