import { ConfigState, ReducerType, ReducerTypes } from "./_Actions";
import { UiModes } from "./_Interfaces";

export const ConfigReducer = (
  state: ConfigState = {
    sidebar_visible: true,
    ui_mode: UiModes.DEFAULT,
  },
  action: {
    type: ReducerType;
    payload: ConfigState;
  }
) => {
  switch (action.type) {
    case ReducerTypes.CONFIG_REDUCER: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};
