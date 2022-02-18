import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import notesService from "./notesService";

const initialState = {
  notes: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const createNote = createAsyncThunk(
  "notes/create",
  async (note, thunkAPI) => {
    try {
      const userToken = thunkAPI.getState().authentication.user.token;
      return await notesService.createNote(note, userToken);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteNote = createAsyncThunk(
  "notes/delete",
  async (note, thunkAPI) => {
    try {
      const userToken = thunkAPI.getState().authentication.user.token;
      return await notesService.deleteNote(note, userToken);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getNotes = createAsyncThunk("notes/get", async (_, thunkAPI) => {
  try {
    const userToken = thunkAPI.getState().authentication.user.token;
    return await notesService.getNotes(userToken);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    // Create Note
    builder.addCase(createNote.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createNote.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.notes.push(action.payload);
    });
    builder.addCase(createNote.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // Delete Note
    builder.addCase(deleteNote.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteNote.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.notes.splice(
        state.notes.findIndex((note) => note._id === action.payload._id),
        1
      );
    });
    builder.addCase(deleteNote.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // Get Notes
    builder.addCase(getNotes.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getNotes.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.notes = action.payload;
    });
    builder.addCase(getNotes.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { reset } = notesSlice.actions;
export default notesSlice.reducer;
