import { defineStore } from "pinia";
import { ref } from "vue";
import { getRandomNumbers } from "../utils/getRandomNumbers";

export const useCardsStore = defineStore("cards", () => {
  const cardList = ref<number[][]>([]);
  const historyNumbers = ref<number[]>([]);

  const addCardsToCreate = (newNumber: number) => {
    for (let i = 0; i < newNumber; i++) {
      const newNumberList = getRandomNumbers();
      cardList.value.push(newNumberList);
    }
  };
  const addHistoryNumber = (newNumber: number) => {
    historyNumbers.value.push(newNumber);
  };
  return { cardList, addCardsToCreate, addHistoryNumber };
});
