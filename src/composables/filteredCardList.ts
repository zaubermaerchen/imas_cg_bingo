import { ref, watch } from 'vue'
import Card from '@/models/card.ts'
import type CardRepositoryInterface from '@/repositories/cardRepositoryInterface.ts'

export function useFilteredCardList(
  cardRepository: CardRepositoryInterface,
  currentCard: Card | undefined,
) {
  const typeList = ref<number[]>(currentCard ? [currentCard.type] : [])
  const rarityList = ref<number[]>(currentCard ? [currentCard.rarity] : [])
  const name = ref<string | undefined>(currentCard?.name)
  const limit = ref(10)
  const offset = ref(0)
  const cardList = ref<Array<Card | undefined>>([])

  const fetchCardList = async () => {
    cardList.value = await cardRepository.search(
      typeList.value,
      rarityList.value,
      name.value,
      limit.value,
      offset.value,
    )
  }

  void fetchCardList()
  watch([typeList, rarityList, name], fetchCardList)

  return { typeList, rarityList, name, cardList }
}
