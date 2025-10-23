import { describe, it, expect, vi } from 'vitest'
import { render } from 'vitest-browser-vue'

import ResultModal from '@/components/ResultModal.vue'
import Card from '@/models/card.ts'
import redImageUrl from '@/assets/red.png'
import greeenImageUrl from '@/assets/green.png'

describe('ResultModal', async () => {
  it('画像が生成できているか', async () => {
    const card1 = new Card(1000101, '島村卯月', 0, 0, '0dabb79ff64691111a0abae2ffed01ce')
    vi.spyOn(card1, 'imageUrl').mockReturnValue(redImageUrl)
    const card2 = new Card(1000102, '渋谷凛', 0, 0, '0dabb79ff64691111a0abae2ffed01ce')
    vi.spyOn(card2, 'imageUrl').mockReturnValue(greeenImageUrl)

    const cardList: (Card | undefined)[] = [
      card1,
      undefined,
      card2,
      undefined,
      card1,
      undefined,
      card2,
      undefined,
      card1,
    ]
    const screen = render(ResultModal, { props: { cardList, row: 3, column: 3, size: 'xs' } })

    // 画像が読み込まれるまで待機
    await vi.waitFor(() => expect(screen.getByAltText('generated image')).toBeVisible())

    const image = screen.baseElement.querySelector('img')
    expect(image).not.toBeNull()
    expect(image?.width).toBe(300)
    expect(image?.height).toBe(300)
    expect(image?.src.startsWith('blob:')).toBe(true)
  })
})
