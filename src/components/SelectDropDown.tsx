import { twMerge } from "tailwind-merge";

export const SelectDropDown = (props: {
  value?: string;
  placeholder?: string;
  options: {
    value: string;
    label: string;
  }[];
  onChange: (value: string) => void;
  inputRef?: any;
  className?: string;
}) => {
  return (
    <select
    className={twMerge(
      `mb-4 mt-2 w-full rounded-md border border-gray-300 bg-transparent p-2 text-gray-900 placeholder-gray-400 focus:border-gray-600 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-gray-400`,
      props.className || ""
    )}
      value={props.value || ""}
      onChange={({ target }) => {
        if (!target.value) return;
        props.onChange(target.value);
      }}
      ref={props.inputRef || null}
    >
      <option key="placeholder" value="" disabled>
        {props.placeholder || "Select an option"}
      </option>
      {props.options.map(({ value, label }) => {
        return (
          <option key={value} value={value} className="dark:bg-gray-700 dark:text-white text-gray-900 bg-white">
            {label}
          </option>
        );
      })}
    </select>
  );
};
