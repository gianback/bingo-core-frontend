<script setup lang="ts">
import { onMounted, ref } from "vue";

import Aside from "../components/Aside.vue";
import Canvas from "../components/Canvas.vue";
import CardBingoList from "../components/CardBingoList.vue";

let startGame = ref<boolean>(false);

onMounted(() => {
  window.Echo.private("game.session.2")

    .listen("StartPlayEvent", (e: object) => {

      console.log({ e })

      startGame.value = true;

      alert("iniciando juego desde el evento StartPlayEvent");

    })
    .listen("ReportStatusToFrontEndEvent", (e: string) => {
      console.log(e);
    })

});
</script>

<template>
  <main class="min-h-screen bg-[#313131] pb-8 px-8">
    <div class="flex flex-col">
      <h1 class="text-4xl text-white uppercase font-bold italic">
        Virtual bingo hot! {{ startGame }}
      </h1>
      <!-- <button on:click={() => (startGame = !startGame)}> change </button> -->
      <div class="grid grid-cols-2">
        <Canvas :startGame="startGame" />
        <div class="flex items-center justify-center">
          <span class="current-ball">x</span>
        </div>
      </div>
    </div>
    <Aside />
    <CardBingoList />
  </main>
</template>
<style scoped>
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
