import { twMerge } from "tailwind-merge";

export const InputLabel = (props: {
  required?: boolean;
  className?: string;
  children: string;
}) => {
  return (
    <label className={twMerge(`text-gray-400`, props.className)}>
      {props.children}
      {props.required && <span className="ml-1 text-red-500">*</span>}
    </label>
  );
};
