<script lang="ts">
  import Canvas from "$lib/Canvas.svelte";
  import Aside from "@/lib/Aside.svelte";
  import CardBingo from "@/lib/CardBingo.svelte";

  let startGame = false;
  /* 
  
  
  */
</script>

<main>
  <div class="flex flex-col pt-12 px-8">
    <h1 class="text-6xl text-white uppercase font-bold italic">
      Virtual bingo!
    </h1>
    <!-- <button on:click={() => (startGame = !startGame)}> change </button> -->
    <Canvas {startGame} />
  </div>
  <Aside />
  <CardBingo />
</main>

<style>
</style>
