"use client";
import { useUserStore } from "@/store/userStore";
import { removeCookie } from "@/utils/cookies";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export function Header() {
  const { push } = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const path = usePathname();

  const onLogout = () => {
    removeCookie("token");

    push("/login");
    setUser({
      id: "",
      name: "",
    });
  };
  return (
    <header className={`${path === "/" ? "bg-gray-900" : "bg-[#313131]"}`}>
      <ul className="flex gap-4 py-4 items-center justify-center [&>li bg-red-500]">
        <li>
          <Link className="text-white" href="/">
            Home
          </Link>
        </li>
        <button className="text-white" onClick={onLogout}>
          Logout
        </button>
      </ul>
    </header>
  );
}
