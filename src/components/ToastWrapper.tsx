import toast, { Toaster } from "react-hot-toast";

export const SuccessToast = (message: string) => toast.success(message, {
  duration: 5000,
});
export const ErrorToast = (message: string) => toast.error(message, {
  duration: 10000,
});

export const ToastWrapper = (props: { children: React.ReactNode }) => {
  return (
    <>
      <Toaster
        toastOptions={{
          position: "bottom-right",
        }}
      />
      {props.children}
    </>
  );
};
