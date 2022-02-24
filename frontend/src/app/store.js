import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "../features/authentication/authenticationSlice";
import notesReducer from "../features/notes/notesSlice";
import habitsReducer from "../features/habits/habitsSlice";

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    notes: notesReducer,
    habits: habitsReducer,
  },
});
