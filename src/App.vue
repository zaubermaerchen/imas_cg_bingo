<script setup lang="ts">
import { ref, watch } from 'vue'
import { VueFinalModal } from 'vue-final-modal'

import BingoArea from '@/components/BingoArea.vue'
import ResultModal from '@/components/ResultModal.vue'
import SettingModal from '@/components/SettingModal.vue'
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

const isVisibleResultModal = ref(false)
const showResultModal = () => {
  isVisibleResultModal.value = true
}

const isVisibleSettingModal = ref(false)
const showSettingModal = () => {
  isVisibleSettingModal.value = true
}
</script>

<template>
  <main>
    <BingoArea v-bind:row="row" v-bind:column="column" v-model="cardList" />
    <el-button type="primary" v-on:click="showResultModal">画像生成</el-button>
    <el-button type="info" v-on:click="showSettingModal">設定</el-button>
  </main>

  <VueFinalModal
    class="modal"
    v-model="isVisibleResultModal"
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

  <VueFinalModal
    class="modal"
    v-model="isVisibleSettingModal"
    v-bind::click-to-close="true"
    v-bind:esc-to-close="true"
  >
    <SettingModal v-model:row="row" v-model:column="column" v-model:cardSize="cardSize" />
  </VueFinalModal>
</template>
