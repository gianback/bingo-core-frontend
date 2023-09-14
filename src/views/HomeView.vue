<script setup lang="ts">
import {onMounted, ref} from 'vue';

import Aside from "../components/Aside.vue";
import Canvas from "../components/Canvas.vue";
import CardBingoList from "../components/CardBingoList.vue";

let startGame = ref<boolean>(false);


onMounted(() => {
    window.Echo
      .private('game.session.1')
      .listen('ReportStatusToFrontEndEvent', (e:string) => {
        console.log(e);

      })
      .listen('StartPlayEvent', (e:string) => {
        console.log(e);

      })
})

</script>

<template>
  <main class="min-h-screen bg-[#313131]">
    <div class="flex flex-col pt-12 px-8">
      <h1 class="text-6xl text-white uppercase font-bold italic">
        Virtual bingo hot!
      </h1>
      <!-- <button on:click={() => (startGame = !startGame)}> change </button> -->
      <Canvas :startGame="startGame" />
    </div>
    <Aside />
    <CardBingoList />
  </main>
</template>
