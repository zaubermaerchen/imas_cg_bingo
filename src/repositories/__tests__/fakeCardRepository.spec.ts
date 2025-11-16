import { describe, it, expect } from 'vitest'

import Repository from '@/repositories/fakeCardRepository.ts'

describe('FakeCardRepository', () => {
  const repository = new Repository()

  it('条件未指定の場合、全カードが対象になるか', async () => {
    const [cardList, total] = await repository.search([], [], undefined, 10, 0)
    expect(cardList.length).toBe(10)
    expect(cardList.map((card) => card.id)).toEqual([
      1000101, 1001101, 1001301, 1100102, 1101102, 1101302, 1413401, 1513402, 2000101, 2000801,
    ])

    expect(total).toBe(20)
  })

  it('取得件数を変更した場合、総件数は変わらず検索結果だけが変わるか', async () => {
    const [cardList, total] = await repository.search([], [], undefined, 5, 0)
    expect(cardList.length).toBe(5)
    expect(cardList.map((card) => card.id)).toEqual([1000101, 1001101, 1001301, 1100102, 1101102])

    expect(total).toBe(20)
  })

  it('取得開始位置を変更した場合、総件数は変わらず検索結果だけが変わるか', async () => {
    const [cardList, total] = await repository.search([], [], undefined, 10, 1)
    expect(cardList.length).toBe(10)
    expect(cardList.map((card) => card.id)).toEqual([
      1001101, 1001301, 1100102, 1101102, 1101302, 1413401, 1513402, 2000101, 2000801, 2100102,
    ])

    expect(total).toBe(20)
  })

  it('属性にキュートを指定した場合、その属性のカードだけ対象になるか', async () => {
    const [cardList, total] = await repository.search([0], [], undefined, 10, 0)
    expect(cardList.length).toBe(8)
    expect(cardList.map((card) => card.id)).toEqual([
      1000101, 1001101, 1001301, 1100102, 1101102, 1101302, 1413401, 1513402,
    ])

    expect(total).toBe(8)
  })

  it('属性にクールを指定した場合、その属性のカードだけ対象になるか', async () => {
    const [cardList, total] = await repository.search([1], [], undefined, 10, 0)
    expect(cardList.length).toBe(6)
    expect(cardList.map((card) => card.id)).toEqual([
      2000101, 2000801, 2100102, 2100802, 2200901, 2300902,
    ])

    expect(total).toBe(6)
  })

  it('属性にクールとパッションを指定した場合、その属性のカードだけ対象になるか', async () => {
    const [cardList, total] = await repository.search([1, 2], [], undefined, 10, 0)
    expect(cardList.length).toBe(10)
    expect(cardList.map((card) => card.id)).toEqual([
      2000101, 2000801, 2100102, 2100802, 2200901, 2300902, 3000101, 3000201, 3100102, 3100202,
    ])

    expect(total).toBe(12)
  })

  it('レアリティを指定した場合、そのレアリティのカードだけ対象になるか', async () => {
    const [cardList, total] = await repository.search([], [2], undefined, 10, 0)
    expect(cardList.length).toBe(2)
    expect(cardList.map((card) => card.id)).toEqual([2200901, 3200801])

    expect(total).toBe(2)
  })

  it('複数レアリティを指定した場合、そのレアリティのカードだけ対象になるか', async () => {
    const [cardList, total] = await repository.search([], [4, 5], undefined, 10, 0)
    expect(cardList.length).toBe(2)
    expect(cardList.map((card) => card.id)).toEqual([1413401, 1513402])

    expect(total).toBe(2)
  })

  it('名前を指定した場合、その名前と部分一致するカードだけ対象になるか', async () => {
    const [cardList, total] = await repository.search([], [], '卯月', 10, 0)
    expect(cardList.length).toBe(4)
    expect(cardList.map((card) => card.id)).toEqual([1000101, 1100102, 1413401, 1513402])

    expect(total).toBe(4)
  })

  it('全条件を指定した場合でも問題ないか', async () => {
    const [cardList, total] = await repository.search([0, 2], [0, 1, 2, 3], '+', 10, 0)
    expect(cardList.length).toBe(6)
    expect(cardList.map((card) => card.id)).toEqual([
      1100102, 1101102, 1101302, 3100102, 3100202, 3300802,
    ])

    expect(total).toBe(6)
  })
})
