import { Group, TextInput, Button, Textarea } from "@mantine/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const NoteForm = ({ submitDispatch, note }) => {
  // Initialize hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State
  const emptyForm = { title: "", content: "" };
  const initialFormState = note || emptyForm;
  const [formData, setFormData] = useState(initialFormState);
  const { title, content } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitForm = (e) => {
    e.preventDefault();

    // submitDispatch may be createNote or editNote
    dispatch(submitDispatch(formData));

    navigate("/notes");
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
        <Textarea
          required
          id="content"
          name="content"
          label="Content"
          placeholder="Content"
          autosize
          minRows={1}
          value={content}
          onChange={onChange}
        />

        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
};

export default NoteForm;
