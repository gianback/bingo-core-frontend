"use client";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { useUserStore } from "@/store/userStore";
import { useGameStore } from "@/store/gameStore";
import { removeCookie } from "@/utils/cookies";
import { Dialog } from "./Dialog";

export function Header() {
  const { push } = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const setUser = useUserStore((state) => state.setUser);
  const [resetCardList, resetPastNumbers] = useGameStore((state) => [
    state.resetCardList,
    state.resetPastNumbers,
  ]);
  const path = usePathname();

  const onLogout = () => {
    resetCardList();
    resetPastNumbers();
    removeCookie("token");

    push("/login");
    setUser({
      id: "",
      name: "",
    });
  };

  const handlerLeavePageOnGame = (route: string) => {
    if (path.startsWith("/play-game/")) {
      const resp = window.confirm(
        "Are you sure you want to leave?, your progress will be spent"
      );
      if (resp) {
        resetCardList();
        resetPastNumbers();
        push(route);
      }
    }
  };

  return (
    <header className={`${path === "/" ? "bg-gray-900" : "bg-[#313131]"}`}>
      <ul className="flex gap-4 py-4 items-center justify-center [&>li bg-red-500]">
        <li>
          <button
            onClick={() => handlerLeavePageOnGame("/")}
            className="text-white"
          >
            Home
          </button>
        </li>
        <li>
          <button className="text-white" onClick={() => setIsOpen(true)}>
            Logout
          </button>
        </li>
      </ul>
      <Dialog isOpen={isOpen}>
        <h2>Are you sure want to logout ?</h2>
        <div className="flex gap-4 justify-center items-center pt-4">
          <button
            type="button"
            onClick={onLogout}
            className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
          >
            Accept
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
          >
            Cancel
          </button>
        </div>
      </Dialog>
    </header>
  );
}
