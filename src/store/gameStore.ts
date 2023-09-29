import { defineStore } from "pinia";
import { reactive } from "vue";

export const useGameStore = defineStore("game", () => {
  const pastNumbers = reactive<number[]>([]);

  const setPastNumbers = (newNumber: number) => {
    pastNumbers.push(newNumber);
  };

  return { pastNumbers, setPastNumbers };
});
