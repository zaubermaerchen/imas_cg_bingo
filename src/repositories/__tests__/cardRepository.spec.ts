import { describe, it, expect } from 'vitest'

import Repository from '@/repositories/cardRepository.ts'

describe('CardRepository', () => {
  const repository = new Repository()

  it('条件未指定の場合、全カードが対象になるか', async () => {
    const [cardList, total] = await repository.search([], [], undefined, 10, 0)
    expect(cardList.length).toBe(10)
    expect(cardList.map((card) => card.id)).toEqual([
      1000101, 1000201, 1000301, 1000401, 1000501, 1000601, 1000701, 1000801, 1000901, 1001001,
    ])

    expect(total).toBe(7115)
  })

  it('取得件数を変更した場合、総件数は変わらず検索結果だけが変わるか', async () => {
    const [cardList, total] = await repository.search([], [], undefined, 5, 0)
    expect(cardList.length).toBe(5)
    expect(cardList.map((card) => card.id)).toEqual([1000101, 1000201, 1000301, 1000401, 1000501])

    expect(total).toBe(7115)
  })

  it('取得開始位置を変更した場合、総件数は変わらず検索結果だけが変わるか', async () => {
    const [cardList, total] = await repository.search([], [], undefined, 10, 7105)
    expect(cardList.length).toBe(10)
    expect(cardList.map((card) => card.id)).toEqual([
      3571002, 3571202, 3571302, 3571602, 3571702, 3571802, 3572002, 3572102, 3572302, 3572402,
    ])

    expect(total).toBe(7115)
  })

  it('属性にキュートを指定した場合、その属性のカードだけ対象になるか', async () => {
    const [cardList, total] = await repository.search([0], [], undefined, 10, 0)
    expect(cardList.length).toBe(10)
    expect(cardList.map((card) => card.id)).toEqual([
      1000101, 1000201, 1000301, 1000401, 1000501, 1000601, 1000701, 1000801, 1000901, 1001001,
    ])

    expect(total).toBe(2350)
  })

  it('属性にクールを指定した場合、その属性のカードだけ対象になるか', async () => {
    const [cardList, total] = await repository.search([1], [], undefined, 10, 0)
    expect(cardList.length).toBe(10)
    expect(cardList.map((card) => card.id)).toEqual([
      2000101, 2000201, 2000301, 2000401, 2000501, 2000601, 2000701, 2000801, 2000901, 2001001,
    ])

    expect(total).toBe(2378)
  })

  it('属性にクールとパッションを指定した場合、その属性のカードだけ対象になるか', async () => {
    const [cardList, total] = await repository.search([1, 2], [], undefined, 10, 0)
    expect(cardList.length).toBe(10)
    expect(cardList.map((card) => card.id)).toEqual([
      2000101, 2000201, 2000301, 2000401, 2000501, 2000601, 2000701, 2000801, 2000901, 2001001,
    ])

    expect(total).toBe(4765)
  })

  it('レアリティを指定した場合、そのレアリティのカードだけ対象になるか', async () => {
    const [cardList, total] = await repository.search([], [2], undefined, 10, 0)
    expect(cardList.length).toBe(10)
    expect(cardList.map((card) => card.id)).toEqual([
      1200101, 1200201, 1200301, 1200401, 1200501, 1200601, 1200701, 1200801, 1200901, 1201001,
    ])

    expect(total).toBe(1267)
  })

  it('レアリティを複数指定した場合、そのレアリティのカードだけ対象になるか', async () => {
    const [cardList, total] = await repository.search([], [2, 3], undefined, 10, 0)
    expect(cardList.length).toBe(10)
    expect(cardList.map((card) => card.id)).toEqual([
      1200101, 1200201, 1200301, 1200401, 1200501, 1200601, 1200701, 1200801, 1200901, 1201001,
    ])

    expect(total).toBe(2710)
  })

  it('名前を指定した場合、その名前と部分一致するカードだけ対象になるか', async () => {
    const [cardList, total] = await repository.search([], [], 'ニュージェネレーション', 10, 0)
    expect(cardList.length).toBe(6)
    expect(cardList.map((card) => card.id)).toEqual([
      1401801, 1501802, 2400301, 2500302, 3404001, 3504002,
    ])

    expect(total).toBe(6)
  })

  it('全条件を指定した場合でも問題ないか', async () => {
    const [cardList, total] = await repository.search([1], [1, 3, 5], '橘ありす', 10, 0)
    expect(cardList.length).toBe(10)
    expect(cardList.map((card) => card.id)).toEqual([
      2102502, 2310402, 2316302, 2334002, 2505402, 2509202, 2509302, 2517602, 2521702, 2525202,
    ])

    expect(total).toBe(21)
  })
})
