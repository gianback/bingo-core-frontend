<script setup lang="ts">
import freeSpace from "../assets/free-space.svg";

const getRandomNumbers = () => {
  let numbers = [];
  for (let i = 0; i < 24; i++) {
    numbers.push(Math.round(Math.random() * 99));
  }
  return numbers;
};

const numbers = getRandomNumbers();
</script>

<template>
  <article class="max-w-[350px] bg-[#D26D59] py-3">
    <header>
      <h2
        class="text-white text-3xl uppercase font-bold italic text-center py-3"
      >
        BINGO
      </h2>
    </header>
    <div class="grid grid-cols-5 px-8">
      <div
        v-for="number in numbers"
        class="bg-white font-bold text-2xl border text-center py-4 border-black divide-solid"
      >
        {{ number }}
      </div>
      <div class="icon flex items-center">
        <img :src="freeSpace" class="w-16" alt="" />
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
