import Card from '@/models/card.ts'

export default interface CardRepositoryInterface {
  /**
   * カード検索
   *
   * @param {number[]}           typeList   属性
   * @param {number[]}           rarityList レアリティ
   * @param {string | undefined} name       カード名(部分一致)
   * @param {number}             limit      取得上限
   * @param {number}             offset     取得開始位置
   *
   * @returns {Promise<[Card[], number]>} カードリストと総件数
   */
  search(
    typeList: number[],
    rarityList: number[],
    name: string | undefined,
    limit: number,
    offset: number,
  ): Promise<[Card[], number]>
}
