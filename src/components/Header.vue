<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed } from "vue";

const { path } = useRoute();

const headerClass = computed(() => {
  return path === "/" ? "bg-gray-900" : "bg-[#313131]";
});
</script>

<template>
  <header :class="[headerClass, 'text-white text-center pt-4']">
    <ul class="flex gap-4 items-center justify-center [&>li bg-red-500]">
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="/play-game">Play</router-link>
      </li>
      <!-- <router-link to="/about">Go to About</router-link> -->
    </ul>
  </header>
</template>
