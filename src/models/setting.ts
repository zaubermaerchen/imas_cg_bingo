import { type CardSize } from '@/models/card.ts'

export default class Setting {
  row: number
  column: number
  cardSize: CardSize

  constructor() {
    this.row = 3
    this.column = 3
    this.cardSize = 'm'
  }
}
