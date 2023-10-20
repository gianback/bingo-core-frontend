import { BingoCard } from "@/services/card.service";
import { useEffect, useState } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type GameStoreState = {
  pastNumbers: number[];
  setPastNumbers: (pastNumbers: number[]) => void;
  cardList: BingoCard[];
  addCardToList: (card: BingoCard) => void;
};

type GetFunctionKeys<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => void ? K : never;
}[keyof T];
type OmittedFunctionKeys<T> = Omit<T, GetFunctionKeys<T>>;

const initialStates = {
  pastNumbers: [],
  cardList: [],
};

export const useGameStore = create<GameStoreState>()(
  persist(
    (set) => ({
      pastNumbers: initialStates.pastNumbers,
      setPastNumbers: (pastNumbers: number[]) => set({ pastNumbers }),
      cardList: initialStates.cardList,
      addCardToList: (card: any) =>
        set((state) => ({ cardList: [...state.cardList, card] })),
    }),
    {
      name: "game-store",
      getStorage: () => localStorage,
    }
  )
);
export const useHydratedGameStore = <
  T extends keyof OmittedFunctionKeys<GameStoreState>
>(
  key: T
): OmittedFunctionKeys<GameStoreState>[T] => {
  const [state, setState] = useState<GameStoreState[T]>(initialStates[key]);
  const zustandState = useGameStore((persistedState) => persistedState[key]);
  useEffect(() => {
    setState(zustandState);
  }, [zustandState]);

  return state;
};
