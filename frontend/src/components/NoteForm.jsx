import { Group, TextInput, Button } from "@mantine/core";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const NoteForm = () => {
  // State
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const { title, content } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
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
