import { describe, it, expect, vi } from 'vitest'
import { Random } from 'random'

import Card from '@/models/card.ts'
import FakeCardRepository from '@/repositories/fakeCardRepository.ts'
import { getCardImageSize, drawCardListToCanvas, fetchRandomCardList } from '@/utils/card.ts'
import redImageUrl from '@/assets/red.png'
import greeenImageUrl from '@/assets/green.png'

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

describe('drawCardListToCanvas', () => {
  it('canvasにカード画像リストが正常に描画できるか', async () => {
    const card1 = new Card(1000101, '島村卯月', 0, 0, '0dabb79ff64691111a0abae2ffed01ce')
    vi.spyOn(card1, 'imageUrl').mockReturnValue(redImageUrl)
    const card2 = new Card(1000102, '渋谷凛', 0, 0, '0dabb79ff64691111a0abae2ffed01ce')
    vi.spyOn(card2, 'imageUrl').mockReturnValue(greeenImageUrl)

    const canvas = document.createElement('canvas')
    const cardList: (Card | undefined)[] = [card1, undefined, card2]
    const row = 1
    const column = 3

    await drawCardListToCanvas(canvas, cardList, row, column, 'xs')
    expect(canvas.width).toBe(300)
    expect(canvas.height).toBe(100)

    const ctx = canvas.getContext('2d')
    expect(ctx).not.toBeNull()
    if (ctx === null) {
      return
    }

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data

    // 描画された画像データのRGB値を確認
    // (0,0) - red
    expect(imageData[0]).toBe(255) // R
    expect(imageData[1]).toBe(0) // G
    expect(imageData[2]).toBe(0) // B
    // (0,100) - black
    expect(imageData[400]).toBe(0) // R
    expect(imageData[401]).toBe(0) // G
    expect(imageData[402]).toBe(0) // B
    // (0,200) - green
    expect(imageData[800]).toBe(0) // R
    expect(imageData[801]).toBe(255) // G
    expect(imageData[802]).toBe(0) // B
  })

  it('rowとcolumnの値を変更しても正常に動作するか', async () => {
    const card1 = new Card(1000101, '島村卯月', 0, 0, '0dabb79ff64691111a0abae2ffed01ce')
    vi.spyOn(card1, 'imageUrl').mockReturnValue(redImageUrl)
    const card2 = new Card(1000102, '渋谷凛', 0, 0, '0dabb79ff64691111a0abae2ffed01ce')
    vi.spyOn(card2, 'imageUrl').mockReturnValue(greeenImageUrl)

    const canvas = document.createElement('canvas')
    const cardList: (Card | undefined)[] = [card1, undefined, card2]
    const row = 3
    const column = 1

    await drawCardListToCanvas(canvas, cardList, row, column, 'xs')
    expect(canvas.width).toBe(100)
    expect(canvas.height).toBe(300)

    const ctx = canvas.getContext('2d')
    expect(ctx).not.toBeNull()
    if (ctx === null) {
      return
    }

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data

    // 描画された画像データのRGB値を確認
    // (0,0) - red
    expect(imageData[0]).toBe(255) // R
    expect(imageData[1]).toBe(0) // G
    expect(imageData[2]).toBe(0) // B
    // (100,0) - black
    expect(imageData[40000]).toBe(0) // R
    expect(imageData[40001]).toBe(0) // G
    expect(imageData[40002]).toBe(0) // B
    // (200,0) - green
    expect(imageData[80000]).toBe(0) // R
    expect(imageData[80001]).toBe(255) // G
    expect(imageData[80002]).toBe(0) // B
  })
})

describe('fetchRandomCardList', () => {
  it('指定した枚数分のランダムなカードが取得できるか', async () => {
    const cardRepository = new FakeCardRepository()
    const randomizer = new Random('test-seed')

    const cardList = await fetchRandomCardList(cardRepository, randomizer, [], [], 3)
    expect(cardList.length).toBe(3)

    expect(cardList.map((card) => card.id)).toStrictEqual([2300902, 3100202, 1001101])
  })

  it('属性を指定した場合、その属性のカードからランダムなカードが取得できるか', async () => {
    const cardRepository = new FakeCardRepository()
    const randomizer = new Random('test-seed')

    const cardList = await fetchRandomCardList(cardRepository, randomizer, [0], [], 3)
    expect(cardList.length).toBe(3)

    expect(cardList.map((card) => card.id)).toStrictEqual([1101302, 1513402, 1000101])
  })

  it('レアリティを指定した場合、そのレアリティのカードからランダムなカードが取得できるか', async () => {
    const cardRepository = new FakeCardRepository()
    const randomizer = new Random('test-seed')

    const cardList = await fetchRandomCardList(cardRepository, randomizer, [], [1], 3)
    expect(cardList.length).toBe(3)

    expect(cardList.map((card) => card.id)).toStrictEqual([2100802, 3100202, 1100102])
  })

  it('取得上限を変更した場合、正常に動作するか', async () => {
    const cardRepository = new FakeCardRepository()
    const randomizer = new Random('test-seed')

    const cardList = await fetchRandomCardList(cardRepository, randomizer, [], [], 1)
    expect(cardList.length).toBe(1)

    expect(cardList.map((card) => card.id)).toStrictEqual([2300902])
  })
})
