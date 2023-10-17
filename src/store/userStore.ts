import { useEffect, useState } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
export interface UserData {
  email: string;
  id: string;
  name: string;
  token: string;
}
type GetFunctionKeys<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => void ? K : never;
}[keyof T];

type OmittedFunctionKeys<T> = Omit<T, GetFunctionKeys<T>>;
type userStore = Pick<UserData, "id" | "name">;

type UseUserStore = {
  user: userStore;
  isAuth: boolean;
  setUser: (user: userStore) => void;
  setIsAuth: (isAuth: boolean) => void;
};

const initialStates = {
  user: {
    id: "",
    name: "",
  },
  isAuth: false,
};
export const useUserStore = create<UseUserStore>()(
  persist(
    (set) => ({
      user: initialStates.user,
      isAuth: initialStates.isAuth,
      setUser: (user) => set((_state) => ({ user })),
      setIsAuth: (isAuth) => set((_state) => ({ isAuth })),
    }),
    {
      name: "user-store",
      getStorage: () => localStorage,
    }
  )
);

export const useHydratedStore = <
  T extends keyof OmittedFunctionKeys<UseUserStore>
>(
  key: T
): OmittedFunctionKeys<UseUserStore>[T] => {
  const [state, setState] = useState(initialStates[key]);
  const zustandState = useUserStore((persistedState) => persistedState[key]);
  useEffect(() => {
    setState(zustandState);
  }, [zustandState]);

  return state;
};
