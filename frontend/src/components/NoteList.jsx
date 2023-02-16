import Col from "react-bootstrap/Col";
import NoteItem from "./NoteItem";

const NoteList = ({ notes, columnsItems, isError }) => {
  if (notes.length > 0) {
    return (
      <>
        <Col>
          {columnsItems[0].map((note) => (
            <NoteItem key={note._id} note={note} />
          ))}
        </Col>
        <Col>
          {columnsItems[1].map((note) => (
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
