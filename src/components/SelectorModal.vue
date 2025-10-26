<script setup lang="ts">
import { computed, inject } from 'vue'
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
const { typeList, rarityList, name, cardList } = useFilteredCardList(cardDataSouce, target.value)
const displayedTypeList = computed({
  get: () => typeList.value.map((v) => String(v)),
  set: (value: string[]) => {
    typeList.value = value.map((v) => Number(v))
  },
})

const displayedRarityList = computed({
  get: () => rarityList.value.map((v) => String(v)),
  set: (value: string[]) => {
    rarityList.value = value.map((v) => Number(v))
  },
})

const displayedName = computed({
  get: () => name.value ?? '',
  set: (value: string) => {
    name.value = value !== '' ? value : undefined
  },
})

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
            <label>
              <input type="checkbox" v-model="displayedTypeList" value="0" />
              キュート
            </label>
            <label>
              <input type="checkbox" v-model="displayedTypeList" value="1" />
              クール
            </label>
            <label>
              <input type="checkbox" v-model="displayedTypeList" value="2" />
              パッション
            </label>
          </td>
        </tr>
        <tr>
          <th>レアリティ</th>
          <td>
            <label>
              <input type="checkbox" v-model="displayedRarityList" value="0" />
              N
            </label>
            <label>
              <input type="checkbox" v-model="displayedRarityList" value="1" />
              N+
            </label>
            <label>
              <input type="checkbox" v-model="displayedRarityList" value="2" />
              R
            </label>
            <label>
              <input type="checkbox" v-model="displayedRarityList" value="3" />
              R+
            </label>
            <label>
              <input type="checkbox" v-model="displayedRarityList" value="4" />
              SR
            </label>
            <label>
              <input type="checkbox" v-model="displayedRarityList" value="5" />
              SR+
            </label>
          </td>
        </tr>
        <tr>
          <th>カード名</th>
          <td>
            <input type="text" v-model="displayedName" />
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
