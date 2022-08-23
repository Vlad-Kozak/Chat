import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
// local
import authReducer from "./authSlice";
import chatReducer from "./chatSlice";

const chatPersistConfig = {
  key: "chat",
  storage,
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: persistReducer(chatPersistConfig, chatReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
