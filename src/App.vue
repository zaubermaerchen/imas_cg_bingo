<script setup lang="ts">
import { ref } from 'vue'
import { VueFinalModal } from 'vue-final-modal'
import { VueDraggable } from 'vue-draggable-plus'
import ImageBox from '@/components/ImageBox.vue'
import ResultModal from '@/components/ResultModal.vue'
import Card, { type CardSize } from '@/models/card.ts'

const row = ref(3)
const column = ref(3)
const cardSize = ref<CardSize>('m')
const cardList = ref<Array<Card | undefined>>([
  new Card(1000101, '島村卯月', 0, 0, '0dabb79ff64691111a0abae2ffed01ce'),
  new Card(1001101, '小日向美穂', 0, 0, 'bef9093335fbcbe9e92a41d2d68a206d'),
  new Card(1001301, '五十嵐響子', 0, 0, 'fb3b173c49703071b4dbdd5ed424640c'),
  new Card(2000101, '渋谷凛', 1, 0, '8f88bb5ffa40b4935ef04257ba4ba0d1'),
  new Card(2000801, '神谷奈緒', 1, 0, '4c54b931268517a3746f98911166b113'),
  new Card(2200901, '北条加蓮', 1, 2, 'd3e95e1ca3c7b346535ad23e8619ec7e'),
  new Card(3000101, '本田未央', 2, 0, '3a15a87af190354ae89fca368b35b69e'),
  new Card(3000201, '高森藍子', 2, 0, '25ea7fdd66fc6bd8e7209a4c0d2ba00c'),
  new Card(3200801, '日野茜', 2, 2, '2ba9aa6bf49a8d75a1cf6ae3a131de74'),
])

const showResultModal = ref(false)

const changeFrameSize = () => {
  const count = row.value * column.value
  if (cardList.value.length > count) {
    cardList.value = cardList.value.slice(0, count)
  } else if (cardList.value.length < count) {
    cardList.value = cardList.value.concat(Array.from({ length: count - cardList.value.length }))
  }
}
</script>

<template>
  <main>
    <table>
      <tbody>
        <tr>
          <th>ビンゴ枠数</th>
          <td>
            <select v-model.number="row" v-on:change="changeFrameSize()">
              <option v-for="n in 10" v-bind:key="n" v-bind:value="n">{{ n }}行</option>
            </select>
            x
            <select v-model.number="column" v-on:change="changeFrameSize()">
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
        <ImageBox v-bind:card="card" v-on:click="console.log(card?.name ?? 'unknown')" />
      </li>
    </VueDraggable>
    <button v-on:click="showResultModal = true">画像生成</button>
  </main>

  <VueFinalModal
    class="modal"
    v-model="showResultModal"
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
