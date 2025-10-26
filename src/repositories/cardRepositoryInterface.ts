import Card from '@/models/card.ts'

export default interface CardRepositoryInterface {
  /**
   *
   * @param type   属性(-1の場合、全属性対象)
   * @param rarity レアリティ(-1の場合、全レアリティ対象)
   * @param name   カード名(部分一致)
   */
  search(type: number, rarity: number, name: string): Promise<Card[]>
}
