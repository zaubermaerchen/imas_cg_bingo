<script setup lang="ts">
import { ref, computed } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import { VueFinalModal } from 'vue-final-modal'
import ImageBox from '@/components/ImageBox.vue'
import SelectorModal from '@/components/SelectorModal.vue'
import { useTargetCard } from '@/composables/targetCard'
import Card from '@/models/card.ts'
import { getCardImageSize } from '@/utils/card.ts'

interface Props {
  row: number
  column: number
}

const cardList = defineModel<Array<Card | undefined>>({ required: true })
const props = defineProps<Props>()

const style = computed(() => {
  return {
    width: props.column * getCardImageSize('xs').width + 'px',
  }
})

const visibleSelectorModal = ref(false)
const { targetCardIndex, targetCard } = useTargetCard(cardList)
const showSelectorModal = (cardIndex: number) => {
  targetCardIndex.value = cardIndex
  visibleSelectorModal.value = true
}
const hideSelectorModal = () => {
  visibleSelectorModal.value = false
}
</script>

<template>
  <VueDraggable v-model="cardList" v-bind:style="style" tag="ul" class="bingo">
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
    <SelectorModal
      v-model="targetCard"
      v-on:confirm="hideSelectorModal"
      v-on:cancel="hideSelectorModal"
    />
  </VueFinalModal>
</template>

<style scoped>
ul.bingo {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  font-size: 0;
}
</style>
