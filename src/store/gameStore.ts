import { BingoCard } from "@/services/card.service";
import { useEffect, useState } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type GameStoreState = {
  pastNumbers: number[];
  setPastNumbers: (newNumber: number) => void;
  cardList: BingoCard[];
  resetCardList: () => void;
  resetPastNumbers: () => void;
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

export const useGameStore = create<GameStoreState>()((set) => ({
  pastNumbers: initialStates.pastNumbers,
  setPastNumbers: (newNumber: number) =>
    set((state) => ({ pastNumbers: [...state.pastNumbers, newNumber] })),

  cardList: initialStates.cardList,
  resetPastNumbers: () => set({ pastNumbers: [] }),
  resetCardList: () => set({ cardList: [] }),
  addCardToList: (card: any) =>
    set((state) => ({ cardList: [...state.cardList, card] })),
}));
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
