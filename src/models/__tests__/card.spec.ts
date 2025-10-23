import { describe, it, expect } from 'vitest'

import Card from '@/models/card.ts'

describe('Card', () => {
  it('コンストラクタに渡した引数がメンバーにセットされているか', () => {
    const card1 = new Card(1000101, '島村卯月', 0, 0, '0dabb79ff64691111a0abae2ffed01ce')
    expect(card1.id).toBe(1000101)
    expect(card1.name).toBe('島村卯月')
    expect(card1.type).toBe(0)
    expect(card1.rarity).toBe(0)
    expect(card1.hash).toBe('0dabb79ff64691111a0abae2ffed01ce')

    const card2 = new Card(2000101, '渋谷凛', 1, 0, '8f88bb5ffa40b4935ef04257ba4ba0d1')
    expect(card2.id).toBe(2000101)
    expect(card2.name).toBe('渋谷凛')
    expect(card2.type).toBe(1)
    expect(card2.rarity).toBe(0)
    expect(card2.hash).toBe('8f88bb5ffa40b4935ef04257ba4ba0d1')

    const card3 = new Card(3000101, '本田未央', 2, 0, '3a15a87af190354ae89fca368b35b69e')
    expect(card3.id).toBe(3000101)
    expect(card3.name).toBe('本田未央')
    expect(card3.type).toBe(2)
    expect(card3.rarity).toBe(0)
    expect(card3.hash).toBe('3a15a87af190354ae89fca368b35b69e')
  })

  it('画像URLが正常に生成されるか', () => {
    const card1 = new Card(1000101, '島村卯月', 0, 0, '0dabb79ff64691111a0abae2ffed01ce')
    expect(card1.imageUrl('s')).toBe(
      'https://example.com/card/s/0dabb79ff64691111a0abae2ffed01ce.jpg',
    )
    expect(card1.imageUrl('m')).toBe(
      'https://example.com/card/m/0dabb79ff64691111a0abae2ffed01ce.jpg',
    )
    expect(card1.imageUrl('m2')).toBe(
      'https://example.com/card/m2/0dabb79ff64691111a0abae2ffed01ce.jpg',
    )
    expect(card1.imageUrl('l')).toBe(
      'https://example.com/card/l/0dabb79ff64691111a0abae2ffed01ce.jpg',
    )
    expect(card1.imageUrl('l_noframe')).toBe(
      'https://example.com/card/l/0dabb79ff64691111a0abae2ffed01ce.jpg',
    )
    expect(card1.imageUrl('xs')).toBe(
      'https://example.com/card/xs/0dabb79ff64691111a0abae2ffed01ce.jpg',
    )
    expect(card1.imageUrl('ls')).toBe(
      'https://example.com/card/ls/0dabb79ff64691111a0abae2ffed01ce.jpg',
    )

    const card2 = new Card(
      1401801,
      '[ニュージェネレーション]島村卯月',
      1,
      4,
      '00f4266728c5a057c338b3033a9aa17c',
    )
    expect(card2.imageUrl('m')).toBe(
      'https://example.com/card/m/00f4266728c5a057c338b3033a9aa17c.jpg',
    )
    expect(card2.imageUrl('l_noframe')).toBe(
      'https://example.com/card/l_noframe/00f4266728c5a057c338b3033a9aa17c.jpg',
    )
  })
})
