"use client";
import { CSSProperties, HTMLAttributes, HTMLInputTypeAttribute } from "react";
import { twMerge } from "tailwind-merge";

export const TextInput = (props: {
  className?: string;
  placeholder?: string;
  style?: CSSProperties;
  value?: string;
  name?: string;
  id?: string;
  type?: HTMLInputTypeAttribute;
  onChangeText?: (e: string) => void;
  onPressEnter?: () => void;
  inputRef?: React.RefObject<HTMLInputElement>;
  autoComplete?: "on" | "off";
  onKeyDown?: (e: React.KeyboardEvent) => void;
}) => {
  return (
    <input
      autoComplete={props.autoComplete || "on"}
      ref={props.inputRef || null}
      className={twMerge(
        `mb-4 mt-2 w-full rounded-md border border-gray-300 bg-transparent p-2 text-gray-900 placeholder-gray-400 focus:border-gray-600 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-gray-400`,
        props.className || ""
      )}
      value={props.value || ""}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        props.onChangeText && props.onChangeText(e.target.value);
      }}
      type={props.type || "text"}
      name={props.name || "text-input"}
      id={props.id || "text-input"}
      placeholder={props.placeholder || "Enter text"}
      onKeyDown={(e) => {
        props.onKeyDown && props.onKeyDown(e);
      }}
      onKeyPress={(ev) => {
        if (ev.key === "Enter") {
          props.onPressEnter && props.onPressEnter();
        }
      }}
      {...(props.style ? { style: props.style } : {})}
    />
  );
};
