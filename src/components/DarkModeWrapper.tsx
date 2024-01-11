"use client";
import { StoreState } from "@/config/ReduxStore";
import { updateConfigState } from "@/config/_Actions";
import { UiModes } from "@/config/_Interfaces";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const DarkModeWrapper = (props: { children: React.ReactNode }) => {
  const config = useSelector((s: StoreState) => s.config);
  const dispatch = useDispatch();

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      // if mode is still default, set it to dark
      if (config.ui_mode === UiModes.DEFAULT) {
        // dispatch(updateConfigState({ ...config, ui_mode: UiModes.DARK })); // Not in this app (keep light mode)
      }
    }
  }, []);

  return (
    <div className={`${config.ui_mode === UiModes.DARK ? "dark" : ""}`}>
      <div className="text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-900">
        {props.children}
      </div>
    </div>
  );
};
