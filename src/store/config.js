import { configureStore } from "@reduxjs/toolkit";
import { hubApi } from "./services/hubApi";

export const store = configureStore({
  reducer: {
    [hubApi.reducerPath]: hubApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(hubApi.middleware),
});
