<script setup lang="ts">
import { onMounted, ref } from "vue";

import Canvas from "../components/Canvas.vue";
import CardBingoList from "../components/CardBingoList.vue";
import Acordion from "../components/Acordion.vue";
import { useCardsStore } from "../store/cardsStore";

let startGame = ref<boolean>(false);
let isMobile = ref<boolean>(window.innerWidth < 768);
const { addCardsToCreate } = useCardsStore();
onMounted(() => {
  window.Echo.private("game.session.2")

    .listen("StartPlayEvent", (e: object) => {
      console.log({ e });

      startGame.value = true;

      alert("iniciando juego desde el evento StartPlayEvent");
    })
    .listen("ReportStatusToFrontEndEvent", (e: string) => {
      console.log(e);
    });

  desktopMediaQuery.addEventListener("change", (e) => {
    if (e.matches) {
      isMobile.value = false;
    } else {
      isMobile.value = true;
    }
  });
});

const desktopMediaQuery = window.matchMedia("(min-width: 720px)");

const handleSubmit = (e: Event) => {
  e.preventDefault();
  const form = e.currentTarget as HTMLFormElement;
  const formData = new FormData(form);

  const cardNumbers = formData.get("card-number") as string;

  addCardsToCreate(+cardNumbers);
};
</script>

<template>
  <main class="flex-1 bg-[#313131] px-8">
    <div class="home-ctn">
      <h1 class="text-4xl text-white uppercase font-bold italic">
        Virtual bingo hot! {{ startGame }}
      </h1>
      <!-- <button on:click={() => (startGame = !startGame)}> change </button> -->
      <div class="order-3 md:order-none">
        <Acordion title="Leadersboard" v-if="isMobile">
          <div class="grid grid-cols-2">
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
          </div>
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
        </Acordion>
        <div v-else>
          <div class="grid grid-cols-2">
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
          </div>
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
        </div>
      </div>
      <div class="canvas-grid">
        <Canvas :startGame="startGame" />
        <div>bolita</div>
      </div>

      <Acordion title="History Balls" v-if="isMobile">
        <div class="p-5 border border-gray-200 dark:border-gray-700">
          <p>lista de bolitas</p>
        </div>
      </Acordion>
      <div v-else class="p-5 border border-gray-200 dark:border-gray-700">
        <p>lista de bolitas</p>
      </div>
    </div>
    <!-- <Aside /> -->
    <CardBingoList />
  </main>
</template>
<style scoped>
.home-ctn {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
}
@media (max-width: 768px) {
  .home-ctn {
    display: flex;
    flex-direction: column;
  }
}
.canvas-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}
.current-ball {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: red;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  position: relative;
  animation-name: rotateBall;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  box-shadow: rgb(0, 0, 0, 0.5) 0px 0px 10px;
}

@keyframes rotateBall {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
