import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  notes: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {},
});

export const reset = notesSlice.actions;
export default notesSlice.reducer;
