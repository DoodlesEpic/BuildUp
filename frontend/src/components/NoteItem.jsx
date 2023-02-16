import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import { useState } from "react";
import { HiPencil, HiTrash } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteNote } from "../features/notes/notesSlice";

const NoteItem = ({ note }) => {
  // Initialize hooks
  const dispatch = useDispatch();

  // Internal state
  const [clampText, setClampText] = useState(true);

  // Handle input
  const toggleClamp = (e) => {
    setClampText(!clampText);
  };

  return (
    <Container onClick={toggleClamp}>
      <div>
        <p weight={500}>{note.title}</p>
        <p lineClamp={clampText ? 32 : 0}>{note.content}</p>
        <Form.Group
          position="apart"
          style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
        >
          <p>{new Date(note.updatedAt).toLocaleString("en-US")}</p>
          <Form.Group position="apart" style={{ marginLeft: "auto" }}>
            <Button
              component={Link}
              to={`/notes/${note._id}`}
              variant="subtle"
              color="blue"
              size="xs"
            >
              <HiPencil />
            </Button>
            <Button
              onClick={() => dispatch(deleteNote(note))}
              variant="subtle"
              color="red"
              size="xs"
            >
              <HiTrash />
            </Button>
          </Form.Group>
        </Form.Group>
      </div>
    </Container>
  );
};

export default NoteItem;
