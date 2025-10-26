import { inject, ref, watch } from 'vue'
import Card from '@/models/card.ts'
import { CardDataSourceInjectKey } from '@/plugins/dataSourcePlugin.ts'

export function useFilteredCardList(currentCard: Card | undefined) {
  const cardRepository = inject(CardDataSourceInjectKey)!

  const type = ref<number>(currentCard?.type ?? -1)
  const rarity = ref<number>(currentCard?.rarity ?? -1)
  const name = ref<string>(currentCard?.name ?? '')
  const cardList = ref<Array<Card | undefined>>([])

  cardRepository.search(type.value, rarity.value, name.value).then((defaultCardList) => {
    cardList.value = defaultCardList
  })

  watch([type, rarity, name], async () => {
    cardList.value = await cardRepository.search(type.value, rarity.value, name.value)
  })

  return { type, rarity, name, cardList }
}
