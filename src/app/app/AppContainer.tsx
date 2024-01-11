"use client";
import { DarkModeWrapper } from "@/components/DarkModeWrapper";
import { ToastWrapper } from "@/components/ToastWrapper";
import { store } from "@/config/ReduxStore";
import { AppProgressBar } from "next-nprogress-bar";
import React from "react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const persistor = persistStore(store);

const AppContainer = (props: { children: React.ReactNode }) => {
  return (
    <div className="">
      <AppProgressBar
        height="4px"
        color="#000"
        options={{ showSpinner: false }}
        shallowRouting
      />
      <ToastWrapper>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <DarkModeWrapper>
              <div>{props.children}</div>
            </DarkModeWrapper>
          </PersistGate>
        </Provider>
      </ToastWrapper>
    </div>
  );
};

export default AppContainer;
