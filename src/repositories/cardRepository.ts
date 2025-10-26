import type DataSouce from '@/repositories/cardDataSource'
import Card from '@/models/card.ts'

export default class CardRepository implements DataSouce {
  constructor() {}

  search(type: number, rarity: number, name: string) {
    let cardList = [
      new Card(1000101, '島村卯月', 0, 0, '0dabb79ff64691111a0abae2ffed01ce'),
      new Card(1001101, '小日向美穂', 0, 0, 'bef9093335fbcbe9e92a41d2d68a206d'),
      new Card(1001301, '五十嵐響子', 0, 0, 'fb3b173c49703071b4dbdd5ed424640c'),
      new Card(2000101, '渋谷凛', 1, 0, '8f88bb5ffa40b4935ef04257ba4ba0d1'),
      new Card(2000801, '神谷奈緒', 1, 0, '4c54b931268517a3746f98911166b113'),
      new Card(2200901, '北条加蓮', 1, 2, 'd3e95e1ca3c7b346535ad23e8619ec7e'),
      new Card(3000101, '本田未央', 2, 0, '3a15a87af190354ae89fca368b35b69e'),
      new Card(3000201, '高森藍子', 2, 0, '25ea7fdd66fc6bd8e7209a4c0d2ba00c'),
      new Card(3200801, '日野茜', 2, 2, '2ba9aa6bf49a8d75a1cf6ae3a131de74'),
    ]

    if (type !== -1) {
      cardList = cardList.filter((card) => card.type === type)
    }

    if (rarity !== -1) {
      cardList = cardList.filter((card) => card.rarity === rarity)
    }

    if (name) {
      cardList = cardList.filter((card) => card.name.includes(name))
    }

    return Promise.resolve(cardList)
  }
}
