import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { Link } from "react-router-dom";
import { HiPencil, HiTrash } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { deleteNote } from "../features/notes/notesSlice";
import { Stack } from "react-bootstrap";

import Note from "../types/note";

interface Props {
  note: Note;
}

const NoteItem = ({ note }: Props) => {
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
            <Button as={Link} to={`/notes/${note._id}`}>
              <HiPencil />
            </Button>
            <Button onClick={() => dispatch(deleteNote())}>
              <HiTrash />
            </Button>
          </Form.Group>
        </Form.Group>
      </Card.Body>
    </Card>
  );
};

export default NoteItem;
