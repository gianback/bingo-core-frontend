<script setup lang="ts">
import { useCardsStore } from "../store/cardsStore";
import CardBingo from "./CardBingo.vue";
const { cardList } = useCardsStore();
</script>
<template>
  <section class="p-4 mt-4">
    <template v-if="cardList.length > 0">
      <ul class="cardList-list">
        <li
          v-for="card in cardList"
          class="cardList-item"
          :key="card.bingo_card_id"
        >
          <CardBingo :numbers="card.data" />
        </li>
      </ul>
    </template>
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

    &::-webkit-scrollbar {
      height: 7px;
    }
    &::-webkit-scrollbar-track {
      background-color: transparent;
      z-index: 99;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: #b4b5bd;
    }
  }
  &-item {
    scroll-snap-align: center;
    flex-shrink: 0;
  }
}
</style>
