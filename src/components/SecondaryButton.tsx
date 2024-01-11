import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { twMerge } from "tailwind-merge";

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  onPress?: () => void;
}

export const SecondaryButton = (props: Props) => {
  const { children, onPress, ...rest } = props;

  if (props.onClick) {
    throw new Error(
      "SecondaryButton cannot have onClick, please use onPress instead"
    );
  }

  return (
    <button
      onClick={(e) => {
        onPress && onPress();
      }}
      {...rest}
      className={twMerge(
        ` flex items-center overflow-hidden whitespace-nowrap rounded-md bg-opacity-100 px-4 py-2 font-semibold text-gray-900 duration-200 hover:bg-gray-900 hover:bg-opacity-10 focus:outline-none dark:text-white dark:hover:bg-gray-100 dark:hover:bg-opacity-10`,
        props.className || ""
      )}
    >
      {children}
    </button>
  );
};
