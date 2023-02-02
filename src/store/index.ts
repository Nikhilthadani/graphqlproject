import { configureStore, createSlice } from "@reduxjs/toolkit";
const initialState: { isLoggedIn: boolean } = { isLoggedIn: false };
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
  },
});
export const AUTH_ACTIONS = authSlice.actions;

export const store = configureStore({ reducer: authSlice.reducer });
