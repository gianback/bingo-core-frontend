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
        class="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
        @click="handleOpenAcordion"
      >
        <span class="flex items-center"> {{ title }}</span>
        <IconArrowBottom />
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
