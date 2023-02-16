import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import habitsService from "./habitsService";

const initialState = {
  habits: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const createHabit = createAsyncThunk(
  "habits/create",
  async (habit, thunkAPI) => {
    try {
      const userToken = thunkAPI.getState().authentication.user.token;
      return await habitsService.createHabit(habit, userToken);
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

export const editHabit = createAsyncThunk(
  "habits/edit",
  async (habit, thunkAPI) => {
    try {
      const userToken = thunkAPI.getState().authentication.user.token;
      return await habitsService.editHabit(habit, userToken);
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

export const deleteHabit = createAsyncThunk(
  "habits/delete",
  async (habit, thunkAPI) => {
    try {
      const userToken = thunkAPI.getState().authentication.user.token;
      return await habitsService.deleteHabit(habit, userToken);
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

export const getHabits = createAsyncThunk("habits/get", async (_, thunkAPI) => {
  try {
    const userToken = thunkAPI.getState().authentication.user.token;
    return await habitsService.getHabits(userToken);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const habitsSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    // Create habit
    builder.addCase(createHabit.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createHabit.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.habits.push(action.payload);
    });
    builder.addCase(createHabit.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // Delete habit
    builder.addCase(deleteHabit.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteHabit.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.habits.splice(
        state.habits.findIndex((habit) => habit._id === action.payload._id),
        1
      );
    });
    builder.addCase(deleteHabit.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // Get habits
    builder.addCase(getHabits.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getHabits.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.habits = action.payload;
    });
    builder.addCase(getHabits.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { reset } = habitsSlice.actions;
export default habitsSlice.reducer;
