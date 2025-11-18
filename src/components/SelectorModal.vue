<script setup lang="ts">
import { ref, computed, inject } from 'vue'
import ImageBox from '@/components/ImageBox.vue'
import Card from '@/models/card.ts'
import { useFilteredCardList } from '@/composables/filteredCardList'
import { CardRepositoryInjectKey } from '@/plugins/dependencyProviderPlugin.ts'

interface Emits {
  (e: 'confirm'): void
  (e: 'cancel'): void
}

const target = defineModel<Card | undefined>({ required: true })
const selected = ref<Card | undefined>(target.value)
const emits = defineEmits<Emits>()

const limitPerPage = 20

const cardRepository = inject(CardRepositoryInjectKey)!
const { typeList, rarityList, name, cardList, total, offset } = useFilteredCardList(
  cardRepository,
  target.value,
  limitPerPage,
)
const load = () => {
  if (cardList.value.length < total.value) {
    offset.value += limitPerPage
  }
}

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
    name.value = value.trim().length > 0 ? value : undefined
  },
})

const selectCard = (card: Card | undefined) => {
  selected.value = card
}

const confirm = () => {
  target.value = selected.value
  emits('confirm')
}
const cancel = () => {
  emits('cancel')
}
</script>

<template>
  <el-container id="selector-modal">
    <el-header>
      <h2>カード選択</h2>
    </el-header>
    <el-main>
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

      <el-scrollbar height="300px" @end-reached="load">
        <ul class="card-list">
          <li v-for="(card, index) in cardList" v-bind:key="index">
            <button
              type="button"
              v-bind:disabled="card.id === selected?.id"
              v-on:click="selectCard(card)"
            >
              <ImageBox v-bind:card="card" draggable="false" />
            </button>
          </li>
        </ul>
      </el-scrollbar>
    </el-main>
    <el-footer>
      <ul class="button-list">
        <li>
          <el-button v-on:click="confirm">OK</el-button>
        </li>
        <li>
          <el-button v-on:click="cancel">キャンセル</el-button>
        </li>
      </ul>
    </el-footer>
  </el-container>
</template>
