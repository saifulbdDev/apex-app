

import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "@/features/apiSlice";
import companyReducer from "@/features/company/companySlice";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";

const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, companyReducer);

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    company: persistedReducer // Use the persisted reducer for the 'company' slice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(apiSlice.middleware)
});

export const persistor = persistStore(store);