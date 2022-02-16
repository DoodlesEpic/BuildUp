import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "../features/authenticationSlice";

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
  },
});
