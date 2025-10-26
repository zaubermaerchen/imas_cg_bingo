<script setup lang="ts">
import { inject } from 'vue'
import ImageBox from '@/components/ImageBox.vue'
import Card from '@/models/card.ts'
import { useFilteredCardList } from '@/composables/filteredCardList'
import { CardDataSourceInjectKey } from '@/plugins/dataSourcePlugin.ts'

interface Emits {
  (e: 'confirm'): void
}

const target = defineModel<Card | undefined>({ required: true })
const emits = defineEmits<Emits>()

const cardDataSouce = inject(CardDataSourceInjectKey)!
const { type, rarity, name, cardList } = useFilteredCardList(cardDataSouce, target.value)
const selectCard = (card: Card | undefined) => {
  target.value = card
  emits('confirm')
}
</script>

<template>
  <section class="selector-modal">
    <table>
      <tbody>
        <tr>
          <th>属性</th>
          <td>
            <!-- TODO チェックボックス -->
            <select v-model.number="type">
              <option value="-1">すべて</option>
              <option value="0">キュート</option>
              <option value="1">クール</option>
              <option value="2">パッション</option>
            </select>
          </td>
        </tr>
        <tr>
          <th>レアリティ</th>
          <td>
            <select v-model.number="rarity">
              <option value="-1">すべて</option>
              <option value="0">N</option>
              <option value="1">N+</option>
              <option value="2">R</option>
              <option value="3">R+</option>
              <option value="4">SR</option>
              <option value="5">SR+</option>
            </select>
          </td>
        </tr>
        <tr>
          <th>カード名</th>
          <td>
            <input type="text" v-model="name" />
          </td>
        </tr>
      </tbody>
    </table>

    <ul>
      <li v-for="(card, index) in cardList" v-bind:key="index">
        <ImageBox v-bind:card="card" v-on:click="selectCard(card)" />
      </li>
    </ul>
  </section>
</template>

<style>
section.selector-modal {
  padding: 2em;
  color: black;
  background-color: white;
}
section.selector-modal > ul {
  width: 500px;
  max-width: 500px;
  display: flex;
  flex-wrap: wrap;
  font-size: 0;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 0;
  min-height: 300px;
  align-content: baseline;
  font-size: 0;
}
section.selector-modal > ul > li {
  margin: 0;
  padding: 0;
}
</style>
