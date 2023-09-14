<script lang="ts">
  export let isOpen: boolean = false;
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="currentColor"
  height="24"
  viewBox="0 -960 960 960"
  width="24"
  class={isOpen ? "rotate" : ""}
>
  <path
    d="M440-240 200-480l240-240 56 56-183 184 183 184-56 56Zm264 0L464-480l240-240 56 56-183 184 183 184-56 56Z"
  />
</svg>

<style>
  .rotate {
    transform: rotate(180deg);
    transition: transform 0.3s ease-in-out;
  }
</style>
