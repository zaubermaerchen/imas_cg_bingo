<script setup lang="ts">
import { ref, watch } from 'vue'
import { VueFinalModal } from 'vue-final-modal'

import BingoArea from '@/components/BingoArea.vue'
import ResultModal from '@/components/ResultModal.vue'
import SettingModal from '@/components/SettingModal.vue'
import Card from '@/models/card.ts'
import Setting from '@/models/setting.ts'

const setting = ref(new Setting())
const cardList = ref<Array<Card | undefined>>(
  Array.from({ length: setting.value.row * setting.value.column }),
)

watch(
  () => setting.value.row * setting.value.column,
  (value) => {
    if (cardList.value.length > value) {
      cardList.value = cardList.value.slice(0, value)
    } else if (cardList.value.length < value) {
      cardList.value = cardList.value.concat(Array.from({ length: value - cardList.value.length }))
    }
  },
)

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
    <BingoArea v-bind:row="setting.row" v-bind:column="setting.column" v-model="cardList" />
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
      v-bind:row="setting.row"
      v-bind:column="setting.column"
      v-bind:size="setting.cardSize"
    />
  </VueFinalModal>

  <VueFinalModal
    class="modal"
    v-model="isVisibleSettingModal"
    v-bind::click-to-close="true"
    v-bind:esc-to-close="true"
  >
    <SettingModal v-model="setting" />
  </VueFinalModal>
</template>
