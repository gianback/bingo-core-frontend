<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref, watch } from "vue";

const route = useRoute();
const bgHeader = ref<string>(
  route.path === "/" ? "bg-gray-900" : "bg-[#313131]"
);

watch(
  () => route.path,
  (newPath) => {
    bgHeader.value = newPath === "/" ? "bg-gray-900" : "bg-[#313131]";
  }
);
</script>

<template>
  <header :class="[bgHeader, 'text-white text-center pt-4']">
    <ul class="flex gap-4 items-center justify-center [&>li bg-red-500]">
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="/play-game">Play</router-link>
      </li>
    </ul>
  </header>
</template>
