import { Group, TextInput, Button } from "@mantine/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createNote } from "../features/notes/notesSlice";

const NoteForm = () => {
  // Initialize hooks
  const dispatch = useDispatch();

  // State
  const initialFormState = { title: "", content: "" };
  const [formData, setFormData] = useState(initialFormState);
  const { title, content } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitForm = (e) => {
    e.preventDefault();

    dispatch(createNote(formData));
    setFormData(initialFormState);
  };

  return (
    <form onSubmit={onSubmitForm}>
      <Group mt="md" direction="column" grow>
        <TextInput
          required
          id="title"
          name="title"
          label="Title"
          placeholder="Title"
          value={title}
          onChange={onChange}
        />
        <TextInput
          required
          id="content"
          name="content"
          label="Content"
          placeholder="Content"
          value={content}
          onChange={onChange}
        />
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
};

export default NoteForm;
