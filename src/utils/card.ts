import Card, { type CardSize } from '@/models/card.ts'
import { loadImage } from '@/utils/canvas.ts'

export const getCardImageSize = (size: CardSize) => {
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

export const drawCardListToCanvas = async (
  canvas: HTMLCanvasElement,
  cardList: (Card | undefined)[],
  row: number,
  column: number,
  size: CardSize,
) => {
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
