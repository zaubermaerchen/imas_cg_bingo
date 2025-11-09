import { describe, it, expect } from 'vitest'
import { ref } from 'vue'

import { useTargetCard } from '@/composables/targetCard.ts'
import Card from '@/models/card.ts'

describe('useTargetCard', () => {
  it('targetCardIndexに値を設定すると、targetCardが更新されるか', async () => {
    const cardList = ref<Array<Card | undefined>>([
      new Card(1000101, '島村卯月', 0, 0, '0dabb79ff64691111a0abae2ffed01ce'),
      new Card(1001101, '小日向美穂', 0, 0, 'bef9093335fbcbe9e92a41d2d68a206d'),
      new Card(1001301, '五十嵐響子', 0, 0, 'fb3b173c49703071b4dbdd5ed424640c'),
      new Card(1100102, '島村卯月+', 0, 1, '798ed3093c682f20234934cef65c2106'),
      new Card(1101102, '小日向美穂+', 0, 1, 'd25ce47acff65352ce0a24e20ff15178'),
      new Card(1101302, '五十嵐響子+', 0, 1, '9e15861e6115bffdcce4d7115522857b'),
    ])
    const { targetCardIndex, targetCard } = useTargetCard(cardList)

    expect(targetCardIndex.value).toBeUndefined()
    expect(targetCard.value).toBeUndefined()

    targetCardIndex.value = 3
    expect(targetCard.value?.id).toBe(1100102)

    targetCardIndex.value = undefined
    expect(targetCard.value).toBeUndefined()
  })
})
