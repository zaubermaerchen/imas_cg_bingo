<script setup lang="ts">
import { ref, watch } from 'vue'
import Card, { type CardSize } from '@/models/card.ts'
import { drawImageToCanvas, canvasToImage } from '@/utils/canvas.ts'

interface Props {
  cardList: (Card | undefined)[]
  row: number
  column: number
}

const props = defineProps<Props>()

const canvas = ref<HTMLCanvasElement | null>(null)
const imagePath = ref<string | null>(null)

const cardWidth = 640
const cardHeight = 800

const drawCanvas = async (
  canvas: HTMLCanvasElement | null,
  cardList: (Card | undefined)[],
  row: number,
  column: number,
  size: CardSize,
) => {
  if (canvas === null) {
    return
  }

  const ctx = canvas.getContext('2d')
  if (ctx === null) {
    return
  }

  canvas.width = column * cardWidth
  canvas.height = row * cardHeight

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  ctx.fillStyle = 'rgb(0, 0, 0)'
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

  const promises: Promise<unknown>[] = []
  for (let index = 0; index < cardList.length; index++) {
    const card = cardList[index] ?? undefined
    if (card == undefined) {
      continue
    }
    const path = card.imageUrl(size)
    const x = cardWidth * (index % column)
    const y = cardHeight * Math.floor(index / column)
    promises.push(drawImageToCanvas(ctx, x, y, path))
  }
  await Promise.all(promises)

  imagePath.value = await canvasToImage(canvas)
}

watch(
  canvas,
  async () => await drawCanvas(canvas.value, props.cardList, props.row, props.column, 'l'),
  {
    once: true,
  },
)
</script>

<template>
  <div class="result">
    <canvas ref="canvas"></canvas>
    <img v-if="imagePath" v-bind:src="imagePath" />
  </div>
</template>

<style scoped>
.result {
  position: relative;
  display: inline-block;
}
.result > * {
  max-width: 95vw;
  max-height: 95vh;
  object-fit: contain;
}
.result > img {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
