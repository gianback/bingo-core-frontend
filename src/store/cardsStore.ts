import { defineStore } from "pinia";
import { ref } from "vue";
import { BingoCard } from "../services/card.service";

export const useCardsStore = defineStore("cards", () => {
  const cardList = ref<BingoCard[]>(
    JSON.parse(localStorage.getItem("cards") as string) || []
  );

  const addCardToList = (card: BingoCard) => {
    cardList.value.push(card);
  };

  return { cardList, addCardToList };
});
