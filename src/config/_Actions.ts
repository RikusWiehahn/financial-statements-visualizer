import { UiMode } from "./_Interfaces";

export const ReducerTypes = {
  CONFIG_REDUCER: "CONFIG_REDUCER",
} as const;
export type ReducerType = (typeof ReducerTypes)[keyof typeof ReducerTypes];

export interface ConfigState {
  ui_mode: UiMode;
  sidebar_visible: boolean;
}

export const updateConfigState = (
  payload: ConfigState
): { type: ReducerType; payload: ConfigState } => ({
  type: ReducerTypes.CONFIG_REDUCER,
  payload,
});