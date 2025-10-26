import { ref, watch } from 'vue'
import Card from '@/models/card.ts'
import type CardDataSource from '@/repositories/cardDataSource.ts'

export function useFilteredCardList(cardDataSouce: CardDataSource, currentCard: Card | undefined) {
  const type = ref<number>(currentCard?.type ?? -1)
  const rarity = ref<number>(currentCard?.rarity ?? -1)
  const name = ref<string>(currentCard?.name ?? '')
  const cardList = ref<Array<Card | undefined>>([])

  cardDataSouce.search(type.value, rarity.value, name.value).then((defaultCardList) => {
    cardList.value = defaultCardList
  })

  watch([type, rarity, name], async () => {
    cardList.value = await cardDataSouce.search(type.value, rarity.value, name.value)
  })

  return { type, rarity, name, cardList }
}
