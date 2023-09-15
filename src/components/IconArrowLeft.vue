<script setup lang="ts">
import { defineProps } from "vue";

defineProps<{ isOpen: boolean }>();
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    height="24"
    viewBox="0 -960 960 960"
    width="24"
    :class="`${isOpen ? 'rotateSvg' : ''}`"
  >
    <path
      d="M440-240 200-480l240-240 56 56-183 184 183 184-56 56Zm264 0L464-480l240-240 56 56-183 184 183 184-56 56Z"
    />
  </svg>
</template>
<style scoped>
svg {
  transition: transform 0.35s ease-in;
}
.rotateSvg {
  transform: rotate(180deg);
}
</style>
