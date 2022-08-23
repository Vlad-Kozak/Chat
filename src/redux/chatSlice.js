import { createSlice } from "@reduxjs/toolkit";
// local
import { initialState } from "../init.js";

const chat = createSlice({
  name: "chat",
  initialState: initialState,
  reducers: {
    sendMessage(state, action) {
      state.contacts[action.payload.uid].messages.push({
        sender: "user",
        value: action.payload.message,
        createdAt: Date.now(),
      });
    },
    getAnswer(state, action) {
      state.contacts[action.payload.uid].messages.push({
        sender: "contact",
        value: action.payload.message,
        createdAt: Date.now(),
      });
    },
  },
});

export const { sendMessage, getAnswer } = chat.actions;
export default chat.reducer;
