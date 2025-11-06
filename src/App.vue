<script setup lang="ts">
import { ref, watch } from 'vue'
import { VueFinalModal } from 'vue-final-modal'
import BingoArea from '@/components/BingoArea.vue'
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

const visibleResultModal = ref(false)
const showResultModal = () => {
  visibleResultModal.value = true
}
</script>

<template>
  <main>
    <el-form label-position="right" label-width="100px" style="width: 300px">
      <el-form-item label="ビンゴ枠数">
        <el-col v-bind:span="11">
          <el-select v-model.number="row" name="row">
            <el-option v-for="n in 10" v-bind:key="n" v-bind:value="n" v-bind:label="`${n}行`" />
          </el-select>
        </el-col>
        <el-col v-bind:span="2" style="text-align: center"> x </el-col>
        <el-col v-bind:span="11">
          <el-select v-model.number="column" name="column">
            <el-option v-for="n in 10" v-bind:key="n" v-bind:value="n" v-bind:label="`${n}列`" />
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="カードサイズ">
        <el-select v-model="cardSize" name="card_size">
          <el-option value="s" label="Sサイズ" />
          <el-option value="m" label="Mサイズ" />
          <el-option value="m2" label="M2サイズ" />
          <el-option value="l" label="Lサイズ" />
          <el-option value="l_noframe" label="Lサイズ(SR枠無し)" />
          <el-option value="xs" label="正方形" />
          <el-option value="ls" label="短冊" />
        </el-select>
      </el-form-item>
    </el-form>

    <BingoArea v-bind:row="row" v-bind:column="column" v-model="cardList" />
    <el-button type="primary" v-on:click="showResultModal">画像生成</el-button>
  </main>

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
