import { describe, it, expect } from 'vitest'

import { getCardImageSize } from '@/utils/card.ts'

describe('getCardImageSize', () => {
  it('カードの種類に応じた画像サイズが正常に取得できるか', () => {
    expect(getCardImageSize('s')).toStrictEqual({ width: 130, height: 163 })
    expect(getCardImageSize('m')).toStrictEqual({ width: 220, height: 275 })
    expect(getCardImageSize('m2')).toStrictEqual({ width: 375, height: 469 })
    expect(getCardImageSize('l')).toStrictEqual({ width: 640, height: 800 })
    expect(getCardImageSize('l_noframe')).toStrictEqual({ width: 640, height: 800 })
    expect(getCardImageSize('ls')).toStrictEqual({ width: 120, height: 375 })
    expect(getCardImageSize('xs')).toStrictEqual({ width: 100, height: 100 })
  })
})
