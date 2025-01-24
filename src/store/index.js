import { createSlice, configureStore } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { counter: 0 },
  reducers: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
  },
});

const authSlice = createSlice({
  name: "auth",
  initialState: { isAuth: false, username: undefined },
  reducers: {
    login(state, action) {
      state.isAuth = true;
      state.username = action.payload;
    },
    logout(state) {
      state.isAuth = false;
      state.username = undefined;
    },
  },
});

const store = configureStore({
  reducer: { counter: counterSlice.reducer, auth: authSlice.reducer },
});

export const counterActions = counterSlice.actions;
export const authActions = authSlice.actions;

export default store;
