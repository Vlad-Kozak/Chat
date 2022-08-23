import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  displayName: null,
  email: null,
  uid: null,
  photoURL: null,
};

const auth = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      state.isLoggedIn = true;
      state.displayName = action.payload.displayName;
      state.email = action.payload.email;
      state.uid = action.payload.uid;
      state.photoURL = action.payload.photoURL;
    },
    removeUser(state) {
      state.isLoggedIn = false;
      state.displayName = null;
      state.email = null;
      state.uid = null;
      state.photoURL = null;
    },
  },
});

export const { setUser, removeUser } = auth.actions;
export default auth.reducer;
