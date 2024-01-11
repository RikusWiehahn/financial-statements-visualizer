"use client";

import { Drawer } from "@mui/material";
import React, { useEffect } from "react";
import { RiCloseFill, RiMenuFill } from "react-icons/ri";
import { MainMenu } from "./MainMenu";
import { usePathname } from "next/navigation";
import { DarkModeWrapper } from "@/components/DarkModeWrapper";

export const SwipeMenu = () => {
  const pathname = usePathname();

  const [state, setState] = React.useState({
    isOpen: false,
  });

  useEffect(() => {
    setState({ isOpen: false });
  }, [pathname]);

  const toggleDrawer =
    () => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setState({ isOpen: !state.isOpen });
    };

  return (
    <div>
      <div>
        <button
          aria-label="Menu button"
          onClick={toggleDrawer()}
          className="btn-muted p-2 justify-center"
        >
          <RiMenuFill size={24} className="" />
        </button>
        <React.Fragment key={"left"}>
          <Drawer
            elevation={2}
            ModalProps={{
              BackdropProps: {
                invisible: true,
              },
            }}
            PaperProps={{
              className: "",
            }}
            anchor="left"
            open={state.isOpen}
            onClose={toggleDrawer()}
          >
            <DarkModeWrapper>
              <div className="h-full w-72 max-w-screen bg-white dark:bg-gray-800 dark:text-white overflow-y-auto">
                <div className="flex justify-between h-16 items-center p-2">
                  <button
                    aria-label="Close button"
                    onClick={toggleDrawer()}
                    className="btn-muted dark:text-white p-4 rounded-full justify-center"
                  >
                    <RiCloseFill size={24} className="" />
                  </button>
                </div>
                <MainMenu />
              </div>
            </DarkModeWrapper>
          </Drawer>
        </React.Fragment>
      </div>
    </div>
  );
};
