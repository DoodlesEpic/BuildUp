import axios from "axios";

const API_URL = "/api/notes/";

const createNote = async (note, userToken) => {
  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };

  const response = await axios.post(API_URL, note, config);
  return response.data;
};

const getNotes = async (userToken) => {
  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

const notesService = {
  createNote,
  getNotes,
};

export default notesService;
