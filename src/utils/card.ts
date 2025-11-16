import { Random } from 'random'

import Card, { type CardSize } from '@/models/card.ts'
import { loadImage } from '@/utils/canvas.ts'
import type CardRepositoryInterface from '@/repositories/cardRepositoryInterface.ts'

/**
 * カード画像サイズ取得
 *
 * @param {CardSize} size カードサイズ
 *
 * @returns {width: number; height: number} カード画像の幅と高さ
 */
export const getCardImageSize = (size: CardSize): { width: number; height: number } => {
  switch (size) {
    case 's':
      return { width: 130, height: 163 }
    case 'm':
      return { width: 220, height: 275 }
    case 'm2':
      return { width: 375, height: 469 }
    case 'l':
    case 'l_noframe':
      return { width: 640, height: 800 }
    case 'ls':
      return { width: 120, height: 375 }
    case 'xs':
      return { width: 100, height: 100 }
  }
}

/**
 * カード画像サイズ取得
 *
 * @param {HTMLCanvasElement}    canvas   描画先のcanvas要素
 * @param {(Card | undefined)[]} cardList カードリスト
 * @param {number}               row      行数
 * @param {number}               column   列数
 * @param {CardSize}             size     カードサイズ
 *
 * @returns {Promise<void>} 描画完了を示すPromise
 */
export const drawCardListToCanvas = async (
  canvas: HTMLCanvasElement,
  cardList: (Card | undefined)[],
  row: number,
  column: number,
  size: CardSize,
): Promise<void> => {
  const ctx = canvas.getContext('2d')
  if (ctx === null) {
    return
  }

  const cardSize = getCardImageSize(size)

  canvas.width = column * cardSize.width
  canvas.height = row * cardSize.height

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  ctx.fillStyle = 'rgb(0, 0, 0)'
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

  const promiseList = cardList.map((card, index) => {
    if (card === undefined) {
      return Promise.resolve()
    }
    const x = cardSize.width * (index % column)
    const y = cardSize.height * Math.floor(index / column)

    return loadImage(card.imageUrl(size)).then((image) =>
      ctx.drawImage(image, x, y, image.width, image.height),
    )
  })
  await Promise.all(promiseList)
}

/**
 * ランダムにカードを取得する
 *
 * @param {CardRepositoryInterface} cardRepository カードリポジトリ
 * @param {Random}                  randomizer     ランダムジェネレーター
 * @param {number[]}                typeList       属性
 * @param {number[]}                rarityList     レアリティ
 * @param {number}                  limit          取得上限
 *
 * @returns {Promise<Card[]>} ランダムに選ばれたカードリスト
 */
export const fetchRandomCardList = async (
  cardRepository: CardRepositoryInterface,
  randomizer: Random,
  typeList: number[],
  rarityList: number[],
  limit: number,
): Promise<Card[]> => {
  const [_, count] = await cardRepository.search(typeList, rarityList, undefined, 1, 0)

  const f = async (offset: number) => {
    const result = await cardRepository.search(typeList, rarityList, undefined, 1, offset)
    return result[0][0]!
  }

  const promiseList: Promise<Card>[] = []
  for (let i = 0; i < limit; i++) {
    const offset = randomizer.int(0, count - 1)
    promiseList.push(f(offset))
  }

  return await Promise.all(promiseList)
}
