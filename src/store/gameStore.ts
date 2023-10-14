import { BingoCard } from "@/services/card.service";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type GameStoreState = {
  pastNumbers: number[];
  setPastNumbers: (pastNumbers: number[]) => void;
  cardList: BingoCard[];
  addCardToList: (card: BingoCard) => void;
};

export const useGameStore = create<GameStoreState>()(
  persist(
    (set) => ({
      pastNumbers: [],
      setPastNumbers: (pastNumbers: number[]) => set({ pastNumbers }),
      cardList: [],
      addCardToList: (card: any) =>
        set((state) => ({ cardList: [...state.cardList, card] })),
    }),
    {
      name: "game-store",
    }
  )
);
