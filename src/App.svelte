<script lang="ts">
  import Ball from "./lib/Ball.svelte";
  import Canvas from "./lib/Canvas.svelte";

  const counter = Array(1).fill("");
  let startGame = false;
</script>

<main class="flex justify-center pt-16">
  <!-- <article
    id="article"
    class="bg-orange-200 w-[35rem] h-[35rem] flex content-end items-end"
  >
    {#each counter as _item, index}
      <Ball {startGame} index={index + 1} />
    {/each}
  </article> -->

  <!-- <button on:click={() => (startGame = !startGame)}> change </button> -->
  <Canvas {startGame} />
</main>

<style>
</style>
