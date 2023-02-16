import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, useNavigate } from "react-router-dom";

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
    <Form onSubmit={onSubmitForm}>
      <Form.Group mt="md" direction="column" grow>
        <Form.Control
          required
          id="title"
          name="title"
          label="Title"
          placeholder="Title"
          value={title}
          onChange={onChange}
        />
        <Form.Control
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
      </Form.Group>
    </Form>
  );
};

export default NoteForm;
