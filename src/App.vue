<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { VueFinalModal } from 'vue-final-modal'
import { VueDraggable } from 'vue-draggable-plus'
import ImageBox from '@/components/ImageBox.vue'
import SelectorModal from '@/components/SelectorModal.vue'
import ResultModal from '@/components/ResultModal.vue'
import Card, { type CardSize } from '@/models/card.ts'

const row = ref(3)
const column = ref(3)
const cardSize = ref<CardSize>('m')
const cardList = ref<Array<Card | undefined>>(Array.from({ length: row.value * column.value }))

watch([row, column], () => {
  const count = row.value * column.value
  if (cardList.value.length > count) {
    cardList.value = cardList.value.slice(0, count)
  } else if (cardList.value.length < count) {
    cardList.value = cardList.value.concat(Array.from({ length: count - cardList.value.length }))
  }
})

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

const visibleResultModal = ref(false)
const showResultModal = () => {
  visibleResultModal.value = true
}
</script>

<template>
  <main>
    <table>
      <tbody>
        <tr>
          <th>ビンゴ枠数</th>
          <td>
            <select v-model.number="row">
              <option v-for="n in 10" v-bind:key="n" v-bind:value="n">{{ n }}行</option>
            </select>
            x
            <select v-model.number="column">
              <option v-for="n in 10" v-bind:key="n" v-bind:value="n">{{ n }}列</option>
            </select>
          </td>
        </tr>
        <tr>
          <th>カードサイズ</th>
          <td>
            <select v-model="cardSize">
              <option value="s">Sサイズ</option>
              <option value="m">Mサイズ</option>
              <option value="m2">M2サイズ</option>
              <option value="l">Lサイズ</option>
              <option value="l_noframe">Lサイズ(SR枠無し)</option>
              <option value="xs">正方形</option>
              <option value="ls">短冊</option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>

    <VueDraggable
      v-model="cardList"
      v-bind:style="{ width: column * 100 + 'px' }"
      tag="ul"
      class="bingo"
    >
      <li v-for="(card, index) in cardList" v-bind:key="index">
        <ImageBox v-bind:card="card" v-on:click="showSelectorModal(index)" />
      </li>
    </VueDraggable>
    <button v-on:click="showResultModal">画像生成</button>
  </main>

  <VueFinalModal
    class="modal"
    v-model="visibleSelectorModal"
    v-bind::click-to-close="true"
    v-bind:esc-to-close="true"
  >
    <SelectorModal v-model="targetCard" v-on:confirm="hideSelectorModal" />
  </VueFinalModal>

  <VueFinalModal
    class="modal"
    v-model="visibleResultModal"
    v-bind::click-to-close="true"
    v-bind:esc-to-close="true"
  >
    <ResultModal
      v-bind:cardList="cardList"
      v-bind:row="row"
      v-bind:column="column"
      v-bind:size="cardSize"
    />
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
