<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Card, { type CardSize } from '@/models/card.ts'
import { drawCardListToCanvas } from '@/utils/card'
import { canvasToImage } from '@/utils/canvas.ts'

interface Props {
  cardList: (Card | undefined)[]
  row: number
  column: number
  size: CardSize
}

const props = defineProps<Props>()

const canvas = ref<HTMLCanvasElement | null>(null)
const imagePath = ref<string | null>(null)

onMounted(async () => {
  if (canvas.value !== null) {
    await drawCardListToCanvas(canvas.value, props.cardList, props.row, props.column, props.size)

    imagePath.value = await canvasToImage(canvas.value)
  }
})

onBeforeUnmount(() => {
  if (imagePath.value !== null) {
    URL.revokeObjectURL(imagePath.value)
  }
})
</script>

<template>
  <section id="result-modal">
    <canvas ref="canvas"></canvas>
    <img v-if="imagePath" v-bind:src="imagePath" alt="generated image" />
  </section>
</template>
