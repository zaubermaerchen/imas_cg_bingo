<script setup lang="ts">
import Card from '@/models/card.ts'
import blankImageUrl from '@/assets/blank.jpg'

interface Props {
  card?: Card
}

const props = defineProps<Props>()

const { card } = props
</script>

<template>
  <img
    v-bind:src="card?.imageUrl('xs') ?? blankImageUrl"
    v-bind:alt="card?.name ?? 'blank'"
    width="100"
    height="100"
  />
</template>
