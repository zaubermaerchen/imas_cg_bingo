import type RepositoryInterface from '@/repositories/cardRepositoryInterface.ts'
import Card from '@/models/card.ts'

export default class FakeCardRepository implements RepositoryInterface {
  constructor() {}

  search(
    typeList: number[],
    rarityList: number[],
    name: string | undefined,
    limit: number,
    offset: number,
  ): Promise<[Card[], number]> {
    let cardList = [
      new Card(1000101, '島村卯月', 0, 0, '0dabb79ff64691111a0abae2ffed01ce'),
      new Card(1001101, '小日向美穂', 0, 0, 'bef9093335fbcbe9e92a41d2d68a206d'),
      new Card(1001301, '五十嵐響子', 0, 0, 'fb3b173c49703071b4dbdd5ed424640c'),
      new Card(1100102, '島村卯月+', 0, 1, '798ed3093c682f20234934cef65c2106'),
      new Card(1101102, '小日向美穂+', 0, 1, 'd25ce47acff65352ce0a24e20ff15178'),
      new Card(1101302, '五十嵐響子+', 0, 1, '9e15861e6115bffdcce4d7115522857b'),
      new Card(1413401, '[ワンダフルマジック]島村卯月', 0, 4, '00a10e6b8e178ce3976b1b0456af74ca'),
      new Card(1513402, '[ワンダフルマジック]島村卯月+', 0, 5, '865bdc197f5ee49d902694d6ebfc9022'),
      new Card(2000101, '渋谷凛', 1, 0, '8f88bb5ffa40b4935ef04257ba4ba0d1'),
      new Card(2000801, '神谷奈緒', 1, 0, '4c54b931268517a3746f98911166b113'),
      new Card(2100102, '渋谷凛+', 1, 1, 'e275bfe5941fd3959de60c5d5c5cacef'),
      new Card(2100802, '神谷奈緒+', 1, 1, '06a7cb5dff7350e37d97e6b9d6207148'),
      new Card(2200901, '北条加蓮', 1, 2, 'd3e95e1ca3c7b346535ad23e8619ec7e'),
      new Card(2300902, '北条加蓮+', 1, 3, '341cefa6c1f43b09054cabc7f0b0c93b'),
      new Card(3000101, '本田未央', 2, 0, '3a15a87af190354ae89fca368b35b69e'),
      new Card(3000201, '高森藍子', 2, 0, '25ea7fdd66fc6bd8e7209a4c0d2ba00c'),
      new Card(3100102, '本田未央+', 2, 1, 'ce6baca22d2efbb08703302ef088640d'),
      new Card(3100202, '高森藍子+', 2, 1, '57bfd18f73cf672d05643716f74bbc48'),
      new Card(3200801, '日野茜', 2, 2, '2ba9aa6bf49a8d75a1cf6ae3a131de74'),
      new Card(3300802, '日野茜+', 2, 3, '3d0085be5f6add9c2d1eb2b484a02fbf'),
    ]

    if (typeList.length > 0) {
      cardList = cardList.filter((card) => typeList.includes(card.type))
    }

    if (rarityList.length > 0) {
      cardList = cardList.filter((card) => rarityList.includes(card.rarity))
    }

    if (name !== undefined) {
      cardList = cardList.filter((card) => card.name.includes(name))
    }

    const total = cardList.length
    cardList = cardList.slice(offset, offset + limit)

    return Promise.resolve([cardList, total])
  }
}
