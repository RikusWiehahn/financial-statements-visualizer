import { SecondaryButton } from "@/components/SecondaryButton";
import { StoreState } from "@/config/ReduxStore";
import { updateConfigState } from "@/config/_Actions";
import { RiMoonLine, RiSunLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

export const DarkModeUtility = () => {
  const config = useSelector((s: StoreState) => s.config);
  const dispatch = useDispatch();

  const _toggleDarkMode = () => {
    if (config.ui_mode === "DARK") {
      dispatch(updateConfigState({ ...config, ui_mode: "LIGHT" }));
    } else {
      dispatch(updateConfigState({ ...config, ui_mode: "DARK" }));
    }
  };

  return (
    <div>
      <SecondaryButton className="w-full" onPress={_toggleDarkMode}>
        {config.ui_mode === "DARK" ? (
          <RiSunLine className="mr-4" />
        ) : (
          <RiMoonLine className="mr-4" />
        )}
        {config.ui_mode === "DARK" ? "Light Mode" : "Dark Mode"}
      </SecondaryButton>
    </div>
  );
};
