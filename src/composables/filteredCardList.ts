import { ref, watch } from 'vue'
import Card from '@/models/card.ts'
import type CardRepositoryInterface from '@/repositories/cardRepositoryInterface.ts'

export function useFilteredCardList(
  cardRepository: CardRepositoryInterface,
  currentCard: Card | undefined,
  limit: number,
) {
  const typeList = ref<number[]>(currentCard ? [currentCard.type] : [])
  const rarityList = ref<number[]>(currentCard ? [currentCard.rarity] : [])
  const name = ref<string | undefined>(currentCard?.name)
  const cardList = ref<Array<Card | undefined>>([])
  const total = ref(0)
  const offset = ref(0)

  const fetchCardList = async () => {
    const result = await cardRepository.search(
      typeList.value,
      rarityList.value,
      name.value,
      limit,
      offset.value,
    )
    cardList.value = result[0]
    total.value = result[1]
  }

  void fetchCardList()
  watch([typeList, rarityList, name], async () => {
    offset.value = 0
    await fetchCardList()
  })
  watch([offset], fetchCardList)

  return { typeList, rarityList, name, cardList, total, offset }
}
