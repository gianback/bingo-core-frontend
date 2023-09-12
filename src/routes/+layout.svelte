<script>
  import Header from "@/lib/Header.svelte";
</script>

<main class="bg-[#313131] min-h-screen">
  <Header />
  <slot />
</main>

<style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
