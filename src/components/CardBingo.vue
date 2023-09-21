<script setup lang="ts">
import freeSpace from "../assets/free-space.svg";

const { numbers } = defineProps<{
  numbers: number[][];
}>();

const shadowCards = Array(5).fill(Array(5).fill(0));
console.log({ shadowCards });

// let [first, second, third, fourth, fifth] = numbers;
// const firstHalf = third.slice(0, 2);
// const secondHalf = third.slice(2, 4);
// third = [...firstHalf, 5000, ...secondHalf];
// const newCard = [first, second, third, fourth, fifth];
</script>

<template>
  <article class="max-w-[300px] w-full bg-[#D26D59] py-3">
    <header>
      <h2
        class="text-white text-3xl uppercase font-bold italic text-center py-3"
      >
        BINGO
      </h2>
    </header>
    <div class="grid grid-cols-5 px-8">
      <div
        v-for="(number, index1) in numbers"
        class="bg-white font-bold text-2xl border text-center py-3 border-black divide-solid"
      >
        <template v-for="(n, index2) in number" class="text-center">
          <div v-if="n === null" class="icon flex items-center">
            <img :src="freeSpace" alt="" />
          </div>
          <div
            :class="`${shadowCards[index1][index2] === 1 ? 'bg-red-500' : ''}`"
            v-else
          >
            {{ n }}
          </div>
        </template>
      </div>
    </div>
  </article>
</template>

<style>
.icon {
  grid-column: 3/4;
  grid-row: 3/4;
}
</style>
