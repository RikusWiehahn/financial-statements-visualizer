import { twMerge } from "tailwind-merge";

export const TextBox = (props: {
  className?: string;
  placeholder?: string;
  value?: string;
  name?: string;
  id?: string;
  onChangeText?: (e: string) => void;
  rows?: number;
  autoComplete?: string;
  onPressEnter?: () => void;
}) => {
  return (
    <textarea
      className={twMerge(
        `mb-4 mt-2 w-full rounded-md border border-gray-300 bg-transparent p-2 text-gray-900 placeholder-gray-400 focus:border-gray-600 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-gray-400`,
        props.className || ""
      )}
      value={props.value || ""}
      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
        props.onChangeText && props.onChangeText(e.target.value)
      }
      autoComplete={props.autoComplete || "off"}
      rows={props.rows || 5}
      name={props.name || "text-input"}
      id={props.id || "text-input"}
      placeholder={props.placeholder || "Enter text"}
      onKeyDown={(e) => {
        if (props.onPressEnter) {
          // allow shit + enter, but enter has default prevented at onPressEnter triggered:
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (props.onPressEnter) {
              props.onPressEnter();
            }
          }
        }
      }}
    />
  );
};
