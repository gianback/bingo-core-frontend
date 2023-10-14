"use client";
import { useUserStore } from "@/store/userStore";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export function Header() {
  const { push } = useRouter();
  const path = usePathname();
  const setIsAuth = useUserStore((state) => state.setIsAuth);
  const setUser = useUserStore((state) => state.setUser);

  const onLogout = () => {
    setUser({
      id: 0,
      name: "",
    });
    setIsAuth(false);
    push("/login");
  };
  return (
    <header className={`${path === "/" ? "bg-gray-900" : "bg-[#313131]"}`}>
      <ul className="flex gap-4 items-center justify-center [&>li bg-red-500]">
        <li>
          <Link href="/">Home</Link>
        </li>
        <button onClick={onLogout}>Logout</button>
      </ul>
    </header>
  );
}
