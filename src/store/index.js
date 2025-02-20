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
  initialState: {
    isAuth: false,
    googleId: undefined,
    _id: undefined,
    display_name: undefined,
    picture: undefined,
    loading: false,
  },
  reducers: {
    login(state, action) {
      state.isAuth = true;
      state.googleId = action.payload.googleId;
      state._id = action.payload._id
      state.display_name = action.payload.display_name;
      state.picture = action.payload.picture;
      state.loading = false;
    },
    logout(state) {
      state.isAuth = false;
      state.display_name = undefined;
      state._id = undefined
      state.googleId = undefined;
      state.picture = undefined;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

const store = configureStore({
  reducer: { counter: counterSlice.reducer, auth: authSlice.reducer },
});

export const counterActions = counterSlice.actions;
export const authActions = authSlice.actions;

export default store;
