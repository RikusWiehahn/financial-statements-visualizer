"use client";
import { SecondaryButton } from "@/components/SecondaryButton";
import { H3 } from "@/components/Typography";
import { StoreState } from "@/config/ReduxStore";
import { updateConfigState } from "@/config/_Actions";
import { routes } from "@/config/_routes";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { MainMenu } from "./MainMenu";
import { SwipeMenu } from "./SwipeMenu";

interface Props {
  children: JSX.Element | null;
  title?: string;
  header?: string;
  headerRight?: React.ReactNode;
}

export default function Layout(props: Props) {
  const config = useSelector((s: StoreState) => s.config);
  const dispatch = useDispatch();
  const showSideBar = config.sidebar_visible;

  const _toggleSidebar = () => {
    dispatch(
      updateConfigState({
        ...config,
        sidebar_visible: !showSideBar,
      })
    );
  };

  const renderMobileHeader = () => {
    return (
      <div className="flex md:hidden fixed top-0 left-0 right-0 z-50 h-16 bg-white dark:bg-gray-800 duration-200 shadow-sm border-b border-gray-300 dark:border-gray-600">
        <div className="w-24 h-16 flex items-center justify-start pl-4">
          <SwipeMenu />
        </div>
        <div className="flex-1 items-center h-16 flex justify-center">
          <h4 className="text-center text-xl font-bold">
            {props.header ? props.header : ""}
          </h4>
        </div>
        <div className="w-32 h-16 flex items-center justify-end pr-4">
          {props.headerRight && props.headerRight}
        </div>
      </div>
    );
  };

  const renderDesktopHeader = () => {
    return (
      <div
        className="hidden md:flex fixed top-0 right-0 z-50 h-16 duration-200 bg-white dark:bg-gray-800 border-b border-gray-300 dark:border-gray-600 shadow-sm"
        style={{
          left: showSideBar ? "16rem" : 0,
        }}
      >
        <div className="flex-1 items-center h-16 flex">
          {!showSideBar && (
            <SecondaryButton
              className="ml-4 py-2 px-2"
              onPress={_toggleSidebar}
            >
              <RiArrowRightSLine className="" size={24} />
            </SecondaryButton>
          )}
          {/* breadcrumbs */}
        </div>
        <div className="h-16 flex items-center justify-end mr-4 flex-1">
          {props.headerRight && props.headerRight}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="hidden print:flex flex-col flex-1">{props.children}</div>
      <div className="print:hidden print:invisible min-h-screen flex flex-col overflow-x-hidden bg-gray-100 dark:bg-gray-900">
        <Head>
          <title>{props.title}</title>
        </Head>
        <div
          className={`z-50 hidden md:inline md:fixed w-64 top-0 bottom-0 left-0 dark:bg-gray-800 bg-white duration-200 border-r border-gray-300 dark:border-gray-600`}
          style={{
            transform: showSideBar ? "translateX(0)" : "translateX(-100%)",
          }}
        >
          <div className="relative overflow-y-auto h-full w-full">
            <div className="h-16 flex items-center ml-8 mr-4 flex-1 justify-between">
              <Link href={routes.ROOT}>
                <div className="flex items-center">
                  <H3 className="">Stonk Visualizer</H3>
                </div>
              </Link>

              <SecondaryButton
                style={{ padding: "0.5rem 0.5rem" }}
                onPress={_toggleSidebar}
              >
                <RiArrowLeftSLine size={24} />
              </SecondaryButton>
            </div>
            <div className="pb-24">
              <MainMenu />
            </div>
            <div className="absolute bottom-0 w-full px-4 text-sm font-semibold pb-4">
              <div>
                All data by{" "}
                <a
                  href="https://finance.yahoo.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500"
                >
                  Yahoo Finance
                </a>
              </div>
              <div>

              Made with ❤️ by{" "}
              <a
                href="https://zeltta.co.nz"
                target="_blank"
                rel="noreferrer"
                className="text-blue-500"
              >
                Zeltta
              </a>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${
            showSideBar ? "md:pl-64" : ""
          } pt-16 flex-1 flex flex-col`}
        >
          {renderMobileHeader()}
          {renderDesktopHeader()}
          <div className="flex-1 flex flex-col">{props.children}</div>
        </div>
      </div>
    </div>
  );
}
