import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";
import { ConfigState } from "./_Actions";
import {
  ConfigReducer,
} from "./_Reducers";;

export interface StoreState {
  config: ConfigState;
}

const reducers: any = combineReducers<StoreState>({
  config: ConfigReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["config"],
  // There is an issue in the source code of redux-persist (default setTimeout does not cleaning)
  timeout: 0, // <-- code checks for falsey so this should disable it
  stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, reducers);

// Middleware
const middlewares: any[] = [];
if (process.env.NODE_ENV === `development`) {
  const { createLogger } = require(`redux-logger`);
  const logger = createLogger({ collapsed: true });
  middlewares.push(logger);
}

export const store = configureStore({
  reducer: persistedReducer,
  middleware: middlewares,
});
