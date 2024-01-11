"use client";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { twMerge } from "tailwind-merge";

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  onPress?: () => void;
}

export const PrimaryButton = (props: Props) => {
  const { children, onPress, ...rest } = props;

  if (props.onClick) {
    throw new Error(
      "PrimaryButton cannot have onClick, please use onPress instead"
    );
  }

  return (
    <button
      onClick={(e) => {
        onPress && onPress();
      }}
      {...rest}
      className={twMerge(
        `flex items-center overflow-hidden whitespace-nowrap rounded-lg border border-gray-300 bg-gray-200 px-6 py-3 font-semibold text-gray-700 duration-200 hover:bg-gray-300 focus:outline-none dark:border-gray-500 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 ${
          rest.disabled ? "cursor-not-allowed" : ""
        }`,
        props.className || ""
      )}
    >
      {children}
    </button>
  );
};
