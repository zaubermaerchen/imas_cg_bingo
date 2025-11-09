import type RepositoryInterface from '@/repositories/cardRepositoryInterface.ts'
import Card from '@/models/card.ts'

interface ResultItem {
  idol_id: number
  name: string
  type: number
  rarity: number
  cost: number
  offense: number
  defense: number
  max_offense: number
  max_defense: number
  skill_id: number
  skill_name: string
  hash: string
}

interface ResponseData {
  results: ResultItem[]
  count: number
}

export default class CardRepository implements RepositoryInterface {
  constructor() {}

  async search(
    typeList: number[],
    rarityList: number[],
    name: string | undefined,
    limit: number,
    offset: number,
  ): Promise<[Card[], number]> {
    const searchParams = new URLSearchParams()
    typeList.forEach((type) => {
      searchParams.append('type', type.toString())
    })
    rarityList.forEach((rarity) => {
      searchParams.append('rarity', rarity.toString())
    })
    if (name !== undefined) {
      searchParams.append('name', name)
    }
    searchParams.append('limit', limit.toString())
    searchParams.append('offset', offset.toString())

    const response = await fetch(
      `${import.meta.env.VITE_API_SERVER_URL}/idol/search/?${searchParams.toString()}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
        mode: 'cors',
        credentials: 'omit',
      },
    )

    const data: ResponseData = await response.json()

    const cardList: Card[] = data.results.map(
      (item) => new Card(item.idol_id, item.name, item.type, item.rarity, item.hash),
    )
    const total = data.count

    return Promise.resolve([cardList, total])
  }
}
