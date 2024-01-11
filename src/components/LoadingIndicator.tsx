import { RiCheckboxBlankCircleLine, RiLoader5Line } from "react-icons/ri";

export const LoadingIndicator = ({ fullscreen }: { fullscreen?: boolean }) => (
  <div
    className={
      fullscreen
        ? "bg-black bg-opacity-25 text-black fixed top-0 left-0 bottom-0 right-0"
        : "transparent text-gray-800 dark:text-white"
    }
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      ...(fullscreen ? { zIndex: 99 } : {}),
    }}
  >
    <div>
      <div
        className="flex justify-center items-center p-4"
        style={{
          position: "relative",
        }}
      >
        <RiCheckboxBlankCircleLine
          className="absolute text-gray-300"
          size={27}
        />
        <RiLoader5Line className="spin absolute text-black" size={30} />
      </div>
    </div>
  </div>
);
