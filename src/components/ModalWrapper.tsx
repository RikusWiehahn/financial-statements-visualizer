import Dialog from "@mui/material/Dialog";
import { RiArrowLeftLine, RiCloseLine } from "react-icons/ri";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { useMediaQuery, useTheme } from "@mui/material";
import { DarkModeWrapper } from "./DarkModeWrapper";

export const ModalWrapper = (props: {
  children?: JSX.Element | JSX.Element[];
  headerLabel?: string;
  isLoading?: boolean;
  showModal: boolean;
  onClose?: () => void;
  onBack?: () => void;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const renderForm = (): JSX.Element | null => {
    return (
      <div>
        <div className="mb-4 flex w-full items-center justify-between">
          {props.onBack ? (
            <div className="w-12">
              <button className="btn-circle p-2" onClick={props.onBack}>
                <RiArrowLeftLine className="" size={24} />
              </button>
            </div>
          ) : null}
          <div className="">
            {props.headerLabel ? (
              <div className="text-xl font-bold">{props.headerLabel}</div>
            ) : null}
          </div>
          <div className="flex w-12 justify-end">
            {props.onClose ? (
              <button className="btn-circle p-2" onClick={props.onClose}>
                <RiCloseLine className="" size={24} />
              </button>
            ) : null}
          </div>
        </div>
        <div>{props.children}</div>
      </div>
    );
  };

  const renderModal = () => {
    return (
      <Dialog
        open={props.showModal}
        onClose={(e, r) => {
          r !== "backdropClick" && props.onClose?.();
        }}
        PaperProps={{
          elevation: 0,
          style: {
            borderRadius: 12,
            paddingTop: fullScreen ? 36 : 0,
            paddingBottom: fullScreen ? 36 : 0,
            backgroundColor: "transparent",
          },
        }}
        fullWidth
        fullScreen={fullScreen}
        maxWidth={props.maxWidth || "sm"}
        scroll="body"
      >
        <DarkModeWrapper>
          <div className="w-full rounded-xl border border-gray-300 bg-white p-4 text-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100">
            {props.isLoading ? (
              <div>
                <LoadingIndicator />
              </div>
            ) : (
              renderForm()
            )}
          </div>
        </DarkModeWrapper>
      </Dialog>
    );
  };

  return <div>{props.showModal ? renderModal() : null}</div>;
};
