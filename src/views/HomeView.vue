<script setup lang="ts">
import { onMounted, ref } from "vue";
import axios from "axios";
import Echo from "laravel-echo";
import PusherJs from "pusher-js";
import Canvas from "../components/Canvas.vue";
import CardBingoList from "../components/CardBingoList.vue";
import Acordion from "../components/Acordion.vue";
import { useCardsStore } from "../store/cardsStore";

let startGame = ref<boolean>(false);
let isMobile = ref<boolean>(window.innerWidth < 768);
const { addCardsToCreate } = useCardsStore();
onMounted(() => {
  const echoOptions = {
    broadcaster: "pusher",
    key: "local",
    logToConsole: true,
    wsHost: window.location.hostname,
    // authEndpoint: 'http://127.0.0.1:8000/api/broadcasting/auth',
    wsPort: 6001,
    wssPort: 6001,
    cluster: "mt1",
    forceTLS: false,
    encrypted: true,
    disableStats: true,
    enabledTransports: ["ws", "wss"],
    authorizer: (channel: any, _options: any) => {
      return {
        authorize: (socketId: any, callback: any) => {
          const uri = "http://bingo-core-backend.test/api/broadcasting/auth";

          const data = {
            socket_id: socketId,
            channel_name: channel.name,
          };
          const headers = {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiY2QwYmRmNjc3YTM5ZDE0OWI1MWE2YmE1OGE0OWEyZmJhMzBiYTQwYzg3ZTI0Nzc4ZTNkOGIxZjM0MmYzNTM2OGE3Mzc0OTVhODFlNzhhYzYiLCJpYXQiOjE2OTQ4OTc2NTkuMzczNzkyLCJuYmYiOjE2OTQ4OTc2NTkuMzczNzk1LCJleHAiOjE3MjY1MjAwNTkuMzE5NjYzLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.KLvJICyTG0ykBHOIPwgP1WP-HwFI4E22MxLv8YpkDJ_4jIfM1OgESQGlnTGQaKix-ACXAI7hBu9rgTarz17Os40763tSjOY1yz25XLE1Rcd9p58ualxjcvsJqH2xmeMzWSgbUCxg1YMq1qE_TIJ2MCFtQBwZMj04sZLG8rATWcPR46fDu9rvBPTVL8H3tc9FetEZxKi2w5DeHbeXVB_VJu8Zgx6Q5B1zDS6BrH_Tjg242MN93xFH7mzFR7zGPEDF20CZfSKgTH-lCzld5Kw1LZV3GzLA57-8D2u1JzezFUfhQZtWqZxO7-Hy742fOFu6-f_9V-cHj_VEzOnXL81ShKW04rzlgS7OsTB10g7m_3xjAogtRHVKDE8UkpZRdG9oTQLr9O2t0ZvtjSP4bKNvBYsbt9gkkITMFzTTeTS0wflBAyDNq6pbhAhVnz72XZny1FrG5vuFwdSmwr9QuU0iu4rnFIuv0_7On-fWAlvBRElEQsh-boHudaIIzJNfJBOUJinN384xt979L2ahJEh_x9B8KR7Qxam3E2m1SxE0R4Gh6mpWnsG8NBeULAKcVRNvrgDyr1bAKva7U3F_pZ0oVFpbLkQMAXkh9J9TPEjjYkCe1HSzAt87THu2hZ5fKM9rMr4Vqf12a0Y2ACBuNPuqmPUHROuM_JRkswoW1tD8p9Q`,
            },
          };

          axios
            .post(uri, data, headers)
            .then((response) => {
              callback(false, response.data);
            })
            .catch((error) => {
              callback(true, error);
            });
        },
      };
    },
  };

  window.Pusher = PusherJs;
  window.Echo = new Echo(echoOptions);

  window.Echo.private("game.session.2")

    .listen("StartPlayEvent", (e: object) => {
      console.log({ e });

      startGame.value = true;

      alert("iniciando juego desde el evento StartPlayEvent");
    })
    .listen("ReportStatusToFrontEndEvent", (e: string) => {
      console.log(e);
    });

  desktopMediaQuery.addEventListener(
    "change",
    (e) => (isMobile.value = e.matches)
  );
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
  <main class="flex-1 bg-[#313131] px-4 md:px-8">
    <h1 class="text-4xl text-white uppercase font-bold italic text-center py-8">
      Virtual bingo hot! {{ startGame }}
    </h1>
    <div class="home-ctn">
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
        <div class="py-5 md:py-0 text-white">bolita</div>
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
