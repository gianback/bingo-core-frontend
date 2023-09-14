import { defineStore } from "pinia";
import { ref } from "vue";

export const useCardsStore = defineStore("cards", () => {
  const cardList = ref<number[][]>([]);
  const addCard = (card: number[]) => {
    cardList.value.push(card);
  };

  return { cardList, addCard };
});
