import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import notesService from "./notesService";

const initialState = {
  notes: [],
  // Notes for each column in the masonry layout
  columnsItems: [[], []],
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

export const editNote = createAsyncThunk(
  "notes/edit",
  async (note, thunkAPI) => {
    try {
      const userToken = thunkAPI.getState().authentication.user.token;
      return await notesService.editNote(note, userToken);
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

// Approximate masonry layout using notes sizes and counts
// Gets called on every fulfilled change in state.notes
const recalculateColumns = (state) => {
  // How much text is there in each column
  // Used for calculating masonry layout
  let columnsText = [0, 0];

  for (const note of state.notes) {
    // Try and add the note to the column with less stuff
    if (
      columnsText[0] * state.columnsItems[0].length <
      columnsText[1] * state.columnsItems[1].length
    ) {
      state.columnsItems[0].push(note);
      columnsText[0] += note.title.length + note.content.length;
    } else {
      state.columnsItems[1].push(note);
      columnsText[1] += note.title.length + note.content.length;
    }
  }
};

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
      recalculateColumns(state);
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
      recalculateColumns(state);
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
      recalculateColumns(state);
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
