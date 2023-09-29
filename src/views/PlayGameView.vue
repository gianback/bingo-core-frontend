<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Toaster, toast } from "vue-sonner";
import axios from "axios";
import Echo from "laravel-echo";
import PusherJs from "pusher-js";
import Canvas from "../components/Canvas.vue";
import CardBingoList from "../components/CardBingoList.vue";
import Acordion from "../components/Acordion.vue";
import { getCookie } from "../utils/cookies";
import { useRoute } from "vue-router";
import { getCards } from "../services/card.service";
import { useCardsStore } from "../store/cardsStore";
import { useGameStore } from "../store/gameStore";

const { pastNumbers, setPastNumbers } = useGameStore();

let startGame = ref<boolean>(false);

let currentBall = ref<number>(0);
let isMobile = ref<boolean>(window.innerWidth < 768);

const route = useRoute();
onMounted(() => {
  const echoOptions = {
    broadcaster: "pusher",
    key: "local",
    logToConsole: true,
    // wsHost: window.location.hostname,
    wsHost: import.meta.env.VITE_WS_HOSTNAME,
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
          const token = getCookie("token") as string;
          const uri = `${import.meta.env.VITE_URL_BACKEND}/broadcasting/auth`;

          const data = {
            socket_id: socketId,
            channel_name: channel.name,
          };
          const headers = {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
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
  const gameId = route.params.id;

  window.Pusher = PusherJs;
  window.Echo = new Echo(echoOptions);

  window.Echo.private(`game.session.${gameId}`)

    .listen("StartPlayEvent", (e: object) => {
      console.log({ e });

      // alert("iniciando juego desde el evento StartPlayEvent");
    })
    .listen("ReportStatusToFrontEndEvent", (e: any) => {
      const status = e["new-status"] as string;
      let newNumberBall: number;
      // console.log({ status });
      // console.log("ReportStatusToFrontEndEvent");

      switch (status) {
        case "getting_next_ball":
          startGame.value = true;
          // alert("iniciando juego desde el evento ReportStatusToFrontEndEvent");

          console.log("getting_next_ball");

          break;
        case "picked-ball":
          // alert("nueva bola obtenida");

          newNumberBall = +e.data.number as number;
          currentBall.value = newNumberBall;
          setPastNumbers(newNumberBall);
          // alert(`nueva bola obtenida: ${newNumberBall}`);

          startGame.value = false;
          break;
        case "evaluating_bingo_cards":
          // alert("evaluando numero en bingo cards");
          console.log(e);
          break;

        default:
          // alert("juego terminado");
          break;
      }

      console.log(e);
    });

  desktopMediaQuery.addEventListener(
    "change",
    (e) => (isMobile.value = !e.matches),
  );
});
const { addCardToList, cardList } = useCardsStore();

const desktopMediaQuery = window.matchMedia("(min-width: 720px)");

const handleSubmit = async (e: Event) => {
  e.preventDefault();
  const form = e.currentTarget as HTMLFormElement;
  const formData = new FormData(form);

  const cardNumbers = formData.get("card-number") as string;
  const cards = await getCards(+cardNumbers, route.params.id as string);
  cards["bingo-cards"].forEach((card) => {
    addCardToList(card);
  });
};

const onStartGame = () => {
  if (cardList.length === 0) {
    toast.error("Necesitas Adquirir tarjetas para poder jugar");
  }
};
</script>

<template>
  <Toaster richColors />
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
          <button
            @click="onStartGame"
            class="mt-2 py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Iniciar Juego
          </button>
          <div>
            <h2 class="text-white text-2xl">Historial:</h2>
          </div>
        </Acordion>
        <div v-else>
          <div class="grid grid-cols-2 gap-3 mb-3">
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
            <div class="flex justify-end">
              <button
                type="submit"
                class="mt-2 py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Agregar Tarjetas
              </button>
            </div>
          </form>
          <button
            @click="onStartGame"
            class="mt-2 py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Iniciar Juego
          </button>
        </div>
      </div>
      <div class="canvas-grid">
        <Canvas :startGame="startGame" />
        <div class="py-5 md:py-0 text-white">
          <div
            v-if="!!currentBall"
            :key="currentBall"
            class="current-ball text-4xl font-medium"
          >
            {{ currentBall }}
          </div>
        </div>
      </div>
      <Acordion title="History Balls" v-if="isMobile">
        <div class="p-5 border border-gray-200 dark:border-gray-700">
          <p>lista de bolitas</p>
        </div>
      </Acordion>
      <div v-else class="p-5 border border-gray-200 dark:border-gray-700">
        <div class="grid grid-cols-5 gap-3">
          <div
            v-for="(number, index) in pastNumbers"
            :key="index"
            class="rounded-full bg-red-300 text-black flex items-center justify-center w-10 h-10 text-lg"
          >
            {{ number }}
          </div>
        </div>
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
  animation-timing-function: linear;
  box-shadow: rgb(0, 0, 0, 0.5) 0px 0px 10px;
}

@keyframes rotateBall {
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
}
</style>
