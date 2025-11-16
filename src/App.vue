<script setup lang="ts">
import { ref, watch, inject } from 'vue'
import { VueFinalModal } from 'vue-final-modal'
import { Random } from 'random'

import BingoArea from '@/components/BingoArea.vue'
import ResultModal from '@/components/ResultModal.vue'
import SettingModal from '@/components/SettingModal.vue'
import Card from '@/models/card.ts'
import { useSettingStore } from '@/stores/setting.ts'
import { fetchRandomCardList } from '@/utils/card.ts'
import { CardRepositoryInjectKey } from '@/plugins/dependencyProviderPlugin.ts'

const setting = useSettingStore()
const cardList = ref<Array<Card | undefined>>(Array.from({ length: setting.row * setting.column }))

watch(
  () => setting.row * setting.column,
  (value) => {
    if (cardList.value.length > value) {
      cardList.value = cardList.value.slice(0, value)
    } else if (cardList.value.length < value) {
      cardList.value = cardList.value.concat(Array.from({ length: value - cardList.value.length }))
    }
  },
)

const resetCardList = () => {
  cardList.value = Array.from({ length: cardList.value.length })
}

const randomizer = new Random()
const cardRepository = inject(CardRepositoryInjectKey)!
const autoSelectCardList = async () => {
  cardList.value = await fetchRandomCardList(
    cardRepository,
    randomizer,
    setting.autoSelect.typeList,
    setting.autoSelect.rarityList,
    cardList.value.length,
  )
}

const isVisibleResultModal = ref(false)
const isVisibleSettingModal = ref(false)
</script>

<template>
  <div id="app-main">
    <header>
      <ul class="button-list">
        <li>
          <el-button v-on:click="autoSelectCardList">ランダム選択</el-button>
        </li>
        <li>
          <el-button type="info" v-on:click="isVisibleSettingModal = true">設定</el-button>
        </li>
      </ul>
    </header>
    <main>
      <BingoArea v-bind:row="setting.row" v-bind:column="setting.column" v-model="cardList" />
    </main>
    <footer>
      <ul class="button-list">
        <li>
          <el-button type="primary" v-on:click="isVisibleResultModal = true">画像生成</el-button>
        </li>
        <li>
          <el-button type="danger" v-on:click="resetCardList">リセット</el-button>
        </li>
      </ul>
    </footer>
  </div>

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
    <SettingModal
      v-on:confirm="isVisibleSettingModal = false"
      v-on:cancel="isVisibleSettingModal = false"
    />
  </VueFinalModal>
</template>
