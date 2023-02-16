import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Anchor from "react-bootstrap/Anchor";

import { HiPencil, HiTrash } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { deleteNote } from "../features/notes/notesSlice";
import { Stack } from "react-bootstrap";

const NoteItem = ({ note }) => {
  // Initialize hooks
  const dispatch = useDispatch();

  return (
    <Card className="mt-3">
      <Card.Body>
        <Card.Title>{note.title}</Card.Title>
        <Card.Text>{note.content}</Card.Text>
        <Form.Group>
          <Card.Text>
            {new Date(note.updatedAt).toLocaleString("en-US")}
          </Card.Text>
          <Form.Group as={Stack} direction="horizontal" gap={1}>
            <Button as={Anchor} href={`/notes/${note._id}`}>
              <HiPencil />
            </Button>
            <Button onClick={() => dispatch(deleteNote(note))}>
              <HiTrash />
            </Button>
          </Form.Group>
        </Form.Group>
      </Card.Body>
    </Card>
  );
};

export default NoteItem;
