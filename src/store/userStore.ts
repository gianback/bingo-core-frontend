import { create } from "zustand";
import { persist } from "zustand/middleware";
export interface UserData {
  id: number;
  name: string;
  token: string;
}
type userStore = Pick<UserData, "id" | "name">;

type UseUserStore = {
  user: userStore;
  isAuth: boolean;
  setUser: (user: userStore) => void;
  setIsAuth: (isAuth: boolean) => void;
};

export const useUserStore = create<UseUserStore>()(
  persist(
    (set) => ({
      user: {
        id: 0,
        name: "",
      },
      isAuth: false,
      setUser: (user) => set((_state) => ({ user })),
      setIsAuth: (isAuth) => set((_state) => ({ isAuth })),
    }),
    {
      name: "user-store",
    }
  )
);
