<script setup lang="ts">
import Card from '@/models/card.ts'
import blankImageUrl from '@/assets/blank.jpg'
import { getCardImageSize } from '@/utils/card'

interface Props {
  card?: Card
}

const props = defineProps<Props>()
const imageSize = getCardImageSize('xs')
</script>

<template>
  <img
    v-bind:src="props.card?.imageUrl('xs') ?? blankImageUrl"
    v-bind:alt="props.card?.name ?? 'blank'"
    v-bind:width="imageSize.width"
    v-bind:height="imageSize.height"
  />
</template>
