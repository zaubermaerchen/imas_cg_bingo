import { computed, type Ref } from 'vue'
import Card from '@/models/card.ts'

export function useTargetCard(
  cardList: Ref<Array<Card | undefined>>,
  targetCardIndex: Ref<number | null>,
) {
  const targetCard = computed<Card | undefined>({
    get() {
      const index = targetCardIndex.value
      if (index === null) {
        return undefined
      }
      return cardList.value[index] ?? undefined
    },
    set(card: Card | undefined) {
      const index = targetCardIndex.value
      if (index === null) {
        return
      }
      cardList.value[index] = card
    },
  })

  return targetCard
}
