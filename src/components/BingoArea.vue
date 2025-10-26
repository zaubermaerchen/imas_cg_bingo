<script setup lang="ts">
import { ref, computed } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import { VueFinalModal } from 'vue-final-modal'
import ImageBox from '@/components/ImageBox.vue'
import SelectorModal from '@/components/SelectorModal.vue'
import Card from '@/models/card.ts'

interface Props {
  width: number
}

const cardList = defineModel<Array<Card | undefined>>({ required: true })
const props = defineProps<Props>()

const visibleSelectorModal = ref(false)
const targetCardIndex = ref<number | null>(null)
const targetCard = computed<Card | undefined>({
  get() {
    const index = targetCardIndex.value
    if (index === null) {
      return undefined
    }
    return cardList.value[index] ?? undefined
  },
  set(card: Card | undefined) {
    const index = targetCardIndex.value
    if (index === null) {
      return
    }
    cardList.value[index] = card
  },
})
const showSelectorModal = (cardIndex: number) => {
  targetCardIndex.value = cardIndex
  visibleSelectorModal.value = true
}
const hideSelectorModal = () => {
  visibleSelectorModal.value = false
}
</script>

<template>
  <VueDraggable
    v-model="cardList"
    v-bind:style="{ width: props.width + 'px' }"
    tag="ul"
    class="bingo"
  >
    <li v-for="(card, index) in cardList" v-bind:key="index">
      <ImageBox v-bind:card="card" v-on:click="showSelectorModal(index)" />
    </li>
  </VueDraggable>

  <VueFinalModal
    class="modal"
    v-model="visibleSelectorModal"
    v-bind::click-to-close="true"
    v-bind:esc-to-close="true"
  >
    <SelectorModal v-model="targetCard" v-on:confirm="hideSelectorModal" />
  </VueFinalModal>
</template>

<style scoped>
ul.bingo {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  font-size: 0;
}
</style>
