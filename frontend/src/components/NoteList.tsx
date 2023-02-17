import Col from "react-bootstrap/Col";
import NoteItem from "./NoteItem";

import Note from "../types/note";

interface Props {
  notes: Note[];
  columnsItems: Note[][];
  isError: boolean;
}

const NoteList = ({ notes, columnsItems, isError }: Props) => {
  if (notes.length > 0) {
    return (
      <>
        <Col>
          {columnsItems[0].map((note: Note) => (
            <NoteItem key={note._id} note={note} />
          ))}
        </Col>
        <Col>
          {columnsItems[1].map((note: Note) => (
            <NoteItem key={note._id} note={note} />
          ))}
        </Col>
      </>
    );
  }

  if (!isError) {
    return <p>No notes yet</p>;
  }

  return <p>Could not retrieve notes</p>;
};

export default NoteList;
