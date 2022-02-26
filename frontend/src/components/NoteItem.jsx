import {
  Container,
  Card,
  Text,
  Group,
  useMantineTheme,
  Button,
} from "@mantine/core";
import { HiPencil, HiTrash } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteNote } from "../features/notes/notesSlice";

const NoteItem = ({ note }) => {
  // Initialize hooks
  const theme = useMantineTheme();
  const dispatch = useDispatch();

  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  return (
    <Container mt="xl" padding={0}>
      <Card shadow="sm" padding="lg">
        <Text weight={500}>{note.title}</Text>
        <Text
          size="md"
          style={{
            color: secondaryColor,
            lineHeight: 1.5,
            whiteSpace: "pre-wrap",
          }}
          lineClamp={32}
        >
          {note.content}
        </Text>
        <Group
          position="apart"
          style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
        >
          <Text size="xs" style={{ color: secondaryColor, lineHeight: 1.5 }}>
            {new Date(note.createdAt).toLocaleString("en-US")}
          </Text>
          <Group position="apart" style={{ marginLeft: "auto" }}>
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
          </Group>
        </Group>
      </Card>
    </Container>
  );
};

export default NoteItem;
