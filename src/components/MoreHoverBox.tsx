"use client";
import { Popover } from "@mui/material";
import React, { useEffect } from "react";
import { RiMoreFill } from "react-icons/ri";
import { DarkModeWrapper } from "./DarkModeWrapper";
import { twMerge } from "tailwind-merge";

interface Props {
  children?: React.ReactNode;
  buttonClasses?: string;
  boxClasses?: string;
  customIcon?: JSX.Element;
}
export const MoreHoverBox = (props: Props) => {
  let generatedId = "";

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    generatedId = `more-popover-box-${Math.random}`;
  }, []);

  const open = Boolean(anchorEl);
  const id = open ? generatedId : undefined;

  return (
    <span>
      <button
        aria-describedby={id}
        onClick={handleClick}
        aria-label="More button"
        className={twMerge(
          `p-1 text-base bg-gray-200 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 text-gray-800 dark:text-white flex justify-center items-center font-semibold rounded-md focus:outline-none hover:bg-gray-900 hover:bg-opacity-10 dark:hover:bg-gray-100 dark:hover:bg-opacity-10 duration-100`,
          props.buttonClasses || ""
        )}
      >
        {props.customIcon ? props.customIcon : <RiMoreFill />}
      </button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        elevation={0}
        PaperProps={{
          style: {
            backgroundColor: "transparent",
            overflow: "visible",
          },
        }}
        classes={{ paper: "w-64" }}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <DarkModeWrapper>
          <div
            className={`bg-white dark:bg-gray-700 shadow-md rounded-md border border-gray-300 dark:border-gray-500 ${
              props.boxClasses || ""
            }`}
          >
            {props.children}
          </div>
        </DarkModeWrapper>
      </Popover>
    </span>
  );
};
