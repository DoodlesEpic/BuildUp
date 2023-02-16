import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Anchor from "react-bootstrap/Anchor";

import { HiPencil, HiTrash } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { deleteNote } from "../features/notes/notesSlice";

const NoteItem = ({ note }) => {
  // Initialize hooks
  const dispatch = useDispatch();

  return (
    <Container>
      <p>{note.title}</p>
      <p>{note.content}</p>
      <Form.Group>
        <p>{new Date(note.updatedAt).toLocaleString("en-US")}</p>
        <Form.Group>
          <Button as={Anchor} href={`/notes/${note._id}`}>
            <HiPencil />
          </Button>
          <Button onClick={() => dispatch(deleteNote(note))}>
            <HiTrash />
          </Button>
        </Form.Group>
      </Form.Group>
    </Container>
  );
};

export default NoteItem;
