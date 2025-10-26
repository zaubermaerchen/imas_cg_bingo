import Card from '@/models/card.ts'

export default interface CardDataSource {
  /**
   *
   * @param {number[]} typeList       属性
   * @param {number[]} rarityList     レアリティ
   * @param {string | undefined} name カード名(部分一致)
   */
  search(typeList: number[], rarityList: number[], name: string | undefined): Promise<Card[]>
}
