import { twMerge } from "tailwind-merge";

export const H1 = (props: {
  children?: JSX.Element | JSX.Element[] | string;
  className?: string;
}) => {
  return (
    <h1
      {...props}
      className={twMerge(
        "text-3xl text-gray-900 font-semibold dark:text-white",
        props.className
      )}
    >
      {props.children}
    </h1>
  );
};

export const H2 = (props: {
  children?: JSX.Element | JSX.Element[] | string;
  className?: string;
}) => {
  return (
    <h2
      {...props}
      className={twMerge(
        "text-2xl text-gray-900 font-semibold dark:text-white",
        props.className
      )}
    >
      {props.children}
    </h2>
  );
};

export const H3 = (props: {
  children?: JSX.Element | JSX.Element[] | string;
  className?: string;
}) => {
  return (
    <h3
      {...props}
      className={twMerge(
        "text-xl text-gray-900 font-semibold dark:text-white",
        props.className
      )}
    >
      {props.children}
    </h3>
  );
};

export const Body = (props: {
  children?: JSX.Element | JSX.Element[] | string;
  className?: string;
}) => {
  return (
    <p className={twMerge("text-gray-800 dark:text-gray-100", props.className)} {...props}>
      {props.children}
    </p>
  );
};
