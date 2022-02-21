import { Grid, Text } from "@mantine/core";
import NoteItem from "./NoteItem";

const NoteList = ({ notes, columnsItems, isError }) => {
  if (notes.length > 0) {
    return (
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
    );
  }

  if (!isError) {
    return <Text>No notes yet</Text>;
  }

  return <Text>Could not retrieve notes</Text>;
};

export default NoteList;
