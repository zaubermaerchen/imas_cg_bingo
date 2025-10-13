<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'
import Card, { type CardSize } from '@/models/card.ts'
import { drawImageToCanvas, canvasToImage } from '@/utils/canvas.ts'
import { getCardImageSize } from '@/utils/card'

interface Props {
  cardList: (Card | undefined)[]
  row: number
  column: number
  size: CardSize
}

const props = defineProps<Props>()

const canvas = ref<HTMLCanvasElement | null>(null)
const imagePath = ref<string | null>(null)

const drawCanvas = async (
  canvas: HTMLCanvasElement,
  cardList: (Card | undefined)[],
  row: number,
  column: number,
  size: CardSize,
) => {
  const ctx = canvas.getContext('2d')
  if (ctx === null) {
    return
  }

  const cardSize = getCardImageSize(size)

  canvas.width = column * cardSize.width
  canvas.height = row * cardSize.height

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  ctx.fillStyle = 'rgb(0, 0, 0)'
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

  const promiseList = cardList.map((card, index) => {
    const x = cardSize.width * (index % column)
    const y = cardSize.height * Math.floor(index / column)
    return card ? drawImageToCanvas(ctx, x, y, card.imageUrl(size)) : Promise.resolve()
  })
  await Promise.all(promiseList)
}

watch(
  canvas,
  async () => {
    if (canvas.value === null) {
      return
    }

    await drawCanvas(canvas.value, props.cardList, props.row, props.column, props.size)

    imagePath.value = await canvasToImage(canvas.value)
  },
  {
    once: true,
  },
)
onBeforeUnmount(() => {
  if (imagePath.value !== null) {
    URL.revokeObjectURL(imagePath.value)
  }
})
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
