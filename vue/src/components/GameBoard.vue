<template>
  <div
    id="board"
    :style="boardConfig">
    <GameTile
      v-for="tile in tiles"
      :tile="tile"
      :key="tile.key"
      @flip="handleFlipTile">
    </GameTile>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { Board } from '../../../common/model';
import GameTile from './GameTile.vue';

const size = ref(12)
const bombs = ref(12)
const board = ref(new Board(size.value, bombs.value))

const boardConfig = computed(() => ({
  gridTemplateColumns: `repeat(${size.value}, 1fr)`,
  gridTemplateRows: `repeat(${size.value}, 1fr)`
}))

const tiles = computed(() => Object.values(board.value.tiles))

function handleFlipTile(x: number, y: number) {
  board.value.flip(x, y)
}
</script>

<style scoped>

</style>
