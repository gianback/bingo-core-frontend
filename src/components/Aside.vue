<script setup lang="ts">
import { ref } from "vue";

import { useCardsStore } from "../store/cardsStore";
import IconArrowLeftVue from "./IconArrowLeft.vue";

const isOpen = ref<boolean>(false);
const { addCardsToCreate } = useCardsStore();

const handleIsOpen = () => {
  isOpen.value = !isOpen.value;
};

const handleSubmit = (e: Event) => {
  e.preventDefault();
  const form = e.currentTarget as HTMLFormElement;
  const formData = new FormData(form);

  const cardNumbers = formData.get("card-number") as string;

  addCardsToCreate(+cardNumbers);
};
</script>

<template>
  <aside
    :class="`fixed top-36 transition-right duration-150 ease-linear w-[400px] rounded-md  p-7 bg-[#010101]/70 ${
      isOpen ? 'right-0' : '-right-[400px]'
    }`"
  >
    <button class="text-white absolute top-4 -left-8" @click="handleIsOpen">
      <IconArrowLeftVue :isOpen="isOpen" />
    </button>

    <header class="grid grid-cols-2 gap-2 mb-3">
      <button
        class="inline-block p-3 rounded-t-lg bg-gray-800 text-gray-300 hover:text-white"
      >
        Juego Actual
      </button>
      <button
        class="inline-block p-3 rounded-t-lg bg-gray-800 text-gray-300 hover:text-white"
      >
        Puntuaciones
      </button>
    </header>
    <form @submit="handleSubmit">
      <div class="flex gap-4">
        <label for="card-number" class="text-white flex-shrink-0">
          Numero de tarjetas
        </label>
        <input
          type="number"
          class="rounded-sm w-full p-1"
          id="card-number"
          :value="1"
          :min="1"
          :max="20"
          name="card-number"
        />
      </div>
      <button
        type="submit"
        class="mt-2 py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        Agregar
      </button>
    </form>
    <div>
      <h2 class="text-white text-2xl">Historial:</h2>
    </div>
    <div></div>
  </aside>
</template>
