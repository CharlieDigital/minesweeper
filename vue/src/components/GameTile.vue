<template>
  <div
    class="tile"
    :class="[
      `tile__${props.tile.label}`,
      `tile__${props.tile.flipped ? 'flipped' : 'masked'}`
    ]"
    @click="emits('flip', tile.x, tile.y)"
  >
    <span>{{ tile.label }}</span>
  </div>
</template>

<script setup lang="ts">
import { Tile } from '../../../common/model';

const props = defineProps<{
  tile: Tile
}>()

const emits = defineEmits<{
  flip: [x: number, y: number]
}>()
</script>

<style scoped>

</style>
