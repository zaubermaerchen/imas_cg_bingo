<script setup lang="ts">
import { computed, inject } from 'vue'
import ImageBox from '@/components/ImageBox.vue'
import Card from '@/models/card.ts'
import { useFilteredCardList } from '@/composables/filteredCardList'
import { CardRepositoryInjectKey } from '@/plugins/dependencyProviderPlugin.ts'

interface Emits {
  (e: 'confirm'): void
}

const target = defineModel<Card | undefined>({ required: true })
const emits = defineEmits<Emits>()

const limitPerPage = 10

const cardRepository = inject(CardRepositoryInjectKey)!
const { typeList, rarityList, name, cardList, total, offset } = useFilteredCardList(
  cardRepository,
  target.value,
  limitPerPage,
)
const page = computed({
  get: () => offset.value / limitPerPage + 1,
  set: (value: number) => {
    offset.value = (value - 1) * limitPerPage
  },
})

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
    <el-form label-position="right" label-width="100px">
      <el-form-item label="カード名">
        <el-input v-model="displayedName" name="name" placeholder="カード名" />
      </el-form-item>
      <el-form-item label="タイプ">
        <el-checkbox-group v-model="displayedTypeList">
          <el-checkbox value="0">キュート</el-checkbox>
          <el-checkbox value="1">クール</el-checkbox>
          <el-checkbox value="2">パッション</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="レアリティ">
        <el-checkbox-group v-model="displayedRarityList">
          <el-checkbox value="0">N</el-checkbox>
          <el-checkbox value="1">N+</el-checkbox>
          <el-checkbox value="2">R</el-checkbox>
          <el-checkbox value="3">R+</el-checkbox>
          <el-checkbox value="4">SR</el-checkbox>
          <el-checkbox value="5">SR+</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>

    <ul>
      <li v-for="(card, index) in cardList" v-bind:key="index">
        <ImageBox v-bind:card="card" v-on:click="selectCard(card)" />
      </li>
      <li><ImageBox v-on:click="selectCard(undefined)"></ImageBox></li>
    </ul>

    <el-pagination
      v-model:currentPage="page"
      background
      layout="prev, pager, next"
      v-bind:total="total"
      v-bind:page-size="limitPerPage"
    />
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

.el-pagination {
  display: flex !important;
  justify-content: center;
}
</style>
