<script setup lang="ts">
import { useCardsStore } from "../store/cardsStore";
import CardBingo from "./CardBingo.vue";
const { cardList } = useCardsStore();
</script>
<template>
  <section class="mt-16">
    <template v-if="cardList.length > 0">
      <ul class="cardList-list">
        <li v-for="(card, index) in cardList" class="cardList-item">
          <CardBingo :key="index" :numbers="card" />
        </li>
      </ul>
    </template>
    <h2 v-else class="text-white text-center mt-8 text-4xl">No hay Tarjetas</h2>
  </section>
</template>
<style lang="postcss">
.cardList {
  &-list {
    @apply flex w-full;
    gap: 10px;
    scroll-snap-type: x mandatory;
    overflow-x: scroll;
    overflow-y: hidden;
  }
  &-item {
    scroll-snap-align: center;
    flex-shrink: 0;
  }
}
</style>
