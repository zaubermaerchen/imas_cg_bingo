import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import ImageBox from '@/components/ImageBox.vue'
import Card from '@/models/card.ts'

describe('ImageBox', () => {
  it('renders properly', () => {
    const card = new Card(1000101, '島村卯月', 0, 0, '0dabb79ff64691111a0abae2ffed01ce')
    const wrapper = mount(ImageBox, { props: { card } })
    const image = wrapper.find('img').element
    expect(image.src).toBe('https://example.com/card/xs/0dabb79ff64691111a0abae2ffed01ce.jpg')
    expect(image.alt).toBe('島村卯月')
  })
})
