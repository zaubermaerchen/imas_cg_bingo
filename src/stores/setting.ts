import { defineStore } from 'pinia'
import { type CardSize } from '@/models/card.ts'

export interface Setting {
  row: number
  column: number
  cardSize: CardSize
}

export const useSettingStore = defineStore<string, Setting>('setting', {
  state: () => ({
    row: 3,
    column: 3,
    cardSize: 'm',
  }),
})
