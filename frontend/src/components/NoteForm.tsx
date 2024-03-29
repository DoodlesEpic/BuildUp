import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Dispatch } from "@reduxjs/toolkit";

import Note from "../types/note";

interface Props {
  submitDispatch: Dispatch;
  note: Note;
}

const NoteForm = ({ submitDispatch, note }: Props) => {
  // Initialize hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State
  const emptyForm = { title: "", content: "" };
  const initialFormState = note || emptyForm;
  const [formData, setFormData] = useState(initialFormState);
  const { title, content } = formData;

  const onChange = (e: { target: { name: any; value: any } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitForm = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // submitDispatch may be createNote or editNote
    dispatch(submitDispatch(formData));

    navigate("/notes");
  };

  return (
    <Form className="mb-3" onSubmit={onSubmitForm}>
      <Form.Group className="mb-2">
        <Form.Control
          required
          id="title"
          name="title"
          label="Title"
          placeholder="Title"
          value={title}
          onChange={onChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          required
          as="textarea"
          id="content"
          name="content"
          label="Content"
          placeholder="Content"
          value={content}
          onChange={onChange}
        />
      </Form.Group>

      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default NoteForm;
