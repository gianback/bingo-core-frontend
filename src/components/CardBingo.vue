<script setup lang="ts">
import freeSpace from "../assets/free-space.svg";

const { numbers } = defineProps<{
  numbers: number[][];
}>();

const shadowCards = Array(5).fill(Array(5).fill(0));
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
        :key="index1"
        class="bg-white font-bold text-2xl text-center border-black divide-solid border-t-[1px] last:border-r-[1px]"
      >
        <template v-for="(n, index2) in number" :key="index2">
          <div
            v-if="n === null"
            class="icon flex items-center h-[49px] p-2 w-full border-black divide-solid border-l-[1px] border-b-[1px]"
          >
            <img :src="freeSpace" class="w-full h-full" alt="" />
          </div>
          <div
            :class="`${
              shadowCards[index1][index2] === 1 ? 'bg-red-500' : ''
            } p-2 border-black divide-solid border-l-[1px] border-b-[1px]`"
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
