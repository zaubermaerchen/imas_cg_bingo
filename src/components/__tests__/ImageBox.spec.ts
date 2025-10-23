import { describe, it, expect } from 'vitest'

import ImageBox from '@/components/ImageBox.vue'
import Card from '@/models/card.ts'
import { render } from 'vitest-browser-vue'

describe('ImageBox', () => {
  it('カードの内容が反映されているか', () => {
    const card = new Card(1000101, '島村卯月', 0, 0, '0dabb79ff64691111a0abae2ffed01ce')
    const screen = render(ImageBox, { props: { card } })
    const image = screen.baseElement.querySelector('img')
    expect(image?.src).toBe('https://example.com/card/xs/0dabb79ff64691111a0abae2ffed01ce.jpg')
    expect(image?.alt).toBe('島村卯月')
  })
})
