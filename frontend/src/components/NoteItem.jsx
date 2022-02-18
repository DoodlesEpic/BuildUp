import {
  Container,
  Card,
  Text,
  Group,
  useMantineTheme,
  Button,
} from "@mantine/core";
import { HiOutlineTrash } from "react-icons/hi";
import { useDispatch } from "react-redux";
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
        <Text size="md" style={{ color: secondaryColor, lineHeight: 1.5 }}>
          {note.content}
        </Text>
        <Group
          position="apart"
          style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
        >
          <Text size="xs" style={{ color: secondaryColor, lineHeight: 1.5 }}>
            {new Date(note.createdAt).toLocaleString("en-US")}
          </Text>
          <Button
            onClick={() => dispatch(deleteNote(note))}
            variant="subtle"
            color="red"
            size="xs"
          >
            <HiOutlineTrash />
          </Button>
        </Group>
      </Card>
    </Container>
  );
};

export default NoteItem;
