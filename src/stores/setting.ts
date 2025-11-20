import { defineStore } from 'pinia'
import { type CardSize } from '@/models/card.ts'

interface AutoSelectSetting {
  typeList: number[]
  rarityList: number[]
}

export interface Setting {
  row: number
  column: number
  cardSize: CardSize
  autoSelect: AutoSelectSetting
}

export const useSettingStore = defineStore<string, Setting>('setting', {
  state: () => ({
    row: 5,
    column: 5,
    cardSize: 'm',
    autoSelect: {
      typeList: [],
      rarityList: [],
    },
  }),
})
