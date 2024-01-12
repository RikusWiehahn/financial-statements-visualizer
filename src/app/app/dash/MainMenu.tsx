"use client";

import { StoreState } from "@/config/ReduxStore";
import { routes } from "@/config/_routes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiSearch2Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import { DarkModeUtility } from "./DarkModeUtility";

export const MainMenu = () => {
  const pathname = usePathname();
  const config = useSelector((s: StoreState) => s.config);

  return (
    <div className="dark:text-white">
      <Link href={routes.HOME}>
        <div
          className={`flex items-center py-2 px-3 mx-4 font-semibold text-sm rounded-md ${
            routes.HOME === pathname ? "dark:bg-gray-700 bg-gray-200" : ""
          }`}
        >
          <RiSearch2Line size={18} className="mr-4 p-0.5" />
          Search
        </div>
      </Link>
      <div className="px-3 text-sm">
        <DarkModeUtility />
      </div>
    </div>
  );
};
