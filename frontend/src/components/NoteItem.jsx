import { Container, Card, Text, Group, useMantineTheme } from "@mantine/core";

const NoteItem = ({ note }) => {
  const theme = useMantineTheme();

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
        </Group>
      </Card>
    </Container>
  );
};

export default NoteItem;
