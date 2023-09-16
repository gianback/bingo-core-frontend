<script setup lang="ts">
import { ref } from "vue";
import IconArrowBottom from "../components/IconArrowBottom.vue";

defineProps<{
  title: string;
}>();

let isOpen = ref(false);
const handleOpenAcordion = () => {
  isOpen.value = !isOpen.value;
};
</script>
<template>
  <section>
    <h2>
      <button
        type="button"
        class="flex items-center justify-between w-full p-5 font-medium text-left border border-gray-400 rounded-t-xl text-gray-400 bg-gray-800"
        @click="handleOpenAcordion"
      >
        <span class="flex items-center"> {{ title }}</span>
        <IconArrowBottom :isOpen="isOpen" />
      </button>
    </h2>
    <article
      :class="`article overflow-hidden  ${
        isOpen ? 'max-h-[50rem]' : 'max-h-0'
      }`"
    >
      <slot />
    </article>
  </section>
</template>
